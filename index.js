const express = require('express');
const app = express();
const compression = require('compression');
const bcrypt = require("./bcrypt.js");
const db = require("./db");
const csurf = require("csurf");
const s3 = require('./s3.js');
const config = require('./config.json');
const multer = require('multer');
const uidSafe = require('uid-safe');
const path = require('path');
const server = require('http').Server(app);
const cookieSession = require("cookie-session");
//change orgines if you wanna put you project online
const io = require('socket.io')(server, { origins: 'localhost:8080' });


var diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/uploads');
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});


var uploader = multer({
    storage: diskStorage,
    limits: {
        filesize: 2097152
    }
});


app.use(compression());

app.use(require('body-parser').json());

app.use(express.static(__dirname + "/public"));

const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});



app.use(csurf());

app.use(function(req, res, next){
    res.cookie('mytoken', req.csrfToken());
    next();
});



if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.get('/welcome', function(req, res) {
    if (req.session.userId) {
        res.redirect('/');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});

app.post('/register', (req, res) => {
    if (
        !req.body.first ||
        !req.body.last ||
        !req.body.email ||
        !req.body.pass
    ) {
        res.sendFile(__dirname + '/index.html');
    } else {
        bcrypt
            .hashPassword(req.body.pass)
            .then(function(hash) {

                return db.registerUser(
                    req.body.first,
                    req.body.last,
                    req.body.email,
                    hash,
                    req.body.profilepic_url
                );
            })
            .then((data) => {
                req.session = {
                    userId: data.rows[0].id,
                    first: data.rows[0].first,
                    last: data.rows[0].last
                };
            })
            .then(()=>{
                res.json({
                    success: true
                });
            })

            .catch(function(err) {
                console.log("ERROR", err);
                res.json({
                    success: false
                });
            });
    }
});

app.post('/login', (req, res) => {
    if (
        !req.body.email ||
        !req.body.pass
    ) {
        res.sendFile(__dirname + '/index.html');
    } else {
        return db.getUserByEmail(req.body.email)
            .then((results) => {
                const data = results.rows[0];
                if (data){
                    return  bcrypt
                        .checkPassword(req.body.pass, data.password)
                        .then((doesMatch) => {
                            if (doesMatch) {
                                req.session = {
                                    userId: data.id,
                                    first: data.first,
                                    last: data.last
                                };
                                res.json({ success: true });
                            } else {
                                console.log("wrong password");
                                res.json({ success: false });
                            }
                        });
                } else {
                    console.log("no such user");
                    res.json({
                        success: false
                    });
                }
            })
            .catch(function(err) {
                console.log("ERROR", err);
                res.json({
                    success: false
                });
            });
    }
});

app.post('/upload', uploader.single('file'), s3.upload, (req, res) => {
    if (req.file) {
        return db.addImage(
            config.s3Url + req.file.filename , req.session.userId
        ).then(({rows}) => {
            res.json(rows[0]);
        }).catch(err => console.log(err));
    } else {
        res.json({
            success: false
        });
    }
});
app.post("/bio", (req, res) => {
    return db.addBio(req.body.bio, req.session.userId).then((results) => {
        res.json({results
        });
    });
});

app.get('/user/:id.json', (req, res) => {
    if (req.session.userId == req.params.id) {
        return res.json({
            redirectTo: '/'
        });
    }
    return db.getUserById(req.params.id).then(({rows}) => {
        res.json(rows);
    });

});
app.get('/get-initial-status/:id', (req, res) => {
    db.getInitialFriendship(req.session.userId, req.params.id).then((results) => {
        res.json(results);
    });
});
app.post('/make-friend-request/:id', (req, res) => {
    db.makeFriendRequest(req.session.userId, req.params.id).then((results) => {
        res.json(results);
    });
});
app.post('/delete-friend-request/:id', (req, res) => {
    db.deleteFriendRequest(req.session.userId, req.params.id).then((results) => {
        res.json(results);
    });
});
app.post('/accept-friend-request/:id', (req, res) => {
    db.acceptFriendRequest(req.session.userId, req.params.id).then((results) => {
        res.json(results);
    }).catch(err => {
        console.log(err);
    });

});

app.get('/user', (req, res) => {
    return db.getUserInfo(req.session.userId).then((results) => {
        res.json(results);
    });
});

app.get('/friends-and-wannabes', (req, res) => {
    return db.receiveFriendsWannabes(req.session.userId).then((results) => {
        res.json(results);
    });
});

app.get('/logout', (req, res) => {
    req.session = null;
    res.redirect('/');
});

app.get('*', function(req, res) {
    if (!req.session.userId) {
        res.redirect('/welcome');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});


server.listen('8080' , function() {
    console.log("I'm listening.");
});


let onlineUsers = {};

io.on('connection', function(socket){
    if (!socket.request.session || !socket.request.session.userId) {
        return socket.disconnect(true);
    }
    onlineUsers[socket.id] = socket.request.session.userId;

    var userIds = Object.values(onlineUsers);

    db.getUsersByIds(userIds).then((results) => {
        console.log("results", results.rows);
        socket.emit('onlineUsers',
            results.rows.filter(i => {
                return i.id !== socket.request.session.userId;
            })
        );
    });

    db.getUserInfo(socket.request.session.userId).then(results => {
        socket.broadcast.emit('userJoined', results.rows[0]);
    });

    socket.on('disconnect', () => {
        let deletedId = onlineUsers[socket.id];
        io.sockets.emit('userLeft', {
            id: deletedId
        });
        delete onlineUsers[socket.id];
    });

    db.getMessages()
        .then(data => {
            // console.log("Whats in get Messages?:", data.rows);
            socket.emit("allMessages", {
                messages: data.rows.reverse()
            });

        })
        .catch(err => {
            console.log(err.message);
        });


    socket.emit('chatMessages', onlineUsers );
    socket.on('userSentMessage', message => {
        db.addMessage(message.message, socket.request.session.userId)
            .then(data => {
                socket.emit('newMessage', data.rows[0].messages);
            })
            .catch(err => console.log(err.message));

        db.getUserById(socket.request.session.userId).then(userdata => {
            message.first = userdata.rows[0].first;
            message.last = userdata.rows[0].last;
            message.profilepic_url = userdata.rows[0].profilepic_url;
        });
    });
    socket.on("singleMessage", function(message) {
        db.insertMessage(message.message, socket.request.session.userId)
            .then(data => {
                data.rows[0].first = message.first;
                data.rows[0].last = message.last;
                data.rows[0].url = message.pic;
                // console.log("Added ALL to DataROws: ", data.rows[0]);
                io.emit("chatMessage", {
                    message: data.rows[0]
                });
            })
            .catch(err => {
                console.log(err.message);
            });
    });
});
