const express = require('express');
const app = express();
const compression = require('compression');
const cookieSession = require("cookie-session");
const bcrypt = require("./bcrypt.js");
const db = require("./db");
const csurf = require("csurf");


app.use(compression());

app.use(require('body-parser').json());

app.use(express.static(__dirname + "/public"));

app.use(
    cookieSession({
        secret: `I'm always angry.`,
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);


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
                console.log("hash!!!!!!",hash);
                return db.registerUser(
                    req.body.first,
                    req.body.last,
                    req.body.email,
                    hash
                );
            })
            .then((data) => {
                console.log("data",data.rows);
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
                            console.log("password checked!");
                            if (doesMatch) {
                                console.log("doesMatch", doesMatch);
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

app.get('*', function(req, res) {
    if (!req.session.userId) {
        res.redirect('/welcome');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});


app.listen(8080, function() {
    console.log("I'm listening.");
});
