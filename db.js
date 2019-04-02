const spicedPg = require('spiced-pg');
let db;

if (process.env.DATABASE_URL) {
    db=spicedPg(process.env.DATABASE_URL);
} else {
    const {dbUser, dbPassword} = require('./secrets');
    db = spicedPg(`postgres:${dbUser}:${dbPassword}@localhost:5432/social`);
}


module.exports.registerUser = (first, last, email, hash, profilepic_url)=>{
    return db.query(
        `INSERT INTO users (first, last, email, password, profilepic_url) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [first, last, email, hash, profilepic_url]
    );
};

module.exports.getUserByEmail = (email) => {
    return db.query(`SELECT *
        FROM users
        WHERE email = $1`, [email]
    );
};
module.exports.getUserInfo = (userId) => {
    return db.query(`SELECT *
        FROM users
        WHERE id = $1`, [userId]
    );
};
module.exports.addImage = (pic_url, userId) => {
    return db.query(
        `UPDATE users
        SET
        profilepic_url = $1
        WHERE id = $2
        RETURNING *`, [pic_url, userId]
    );
};
module.exports.addBio = (text, userId) => {
    return db.query(
        `UPDATE users
        SET
        bio = $1
        WHERE id = $2
        RETURNING *`, [text, userId]
    );
};
module.exports.getUserById = (id) => {
    return db.query(`SELECT *
        FROM users
        WHERE id = $1`, [id]
    );
};
module.exports.getInitialFriendship = (loggedInId, otherUserId) => {
    return db.query(`SELECT *
        FROM friendships
        WHERE (recipient_id = $1 AND sender_id = $2)
        OR (recipient_id = $2 AND sender_id = $1)`, [loggedInId, otherUserId]
    );
};
module.exports.makeFriendRequest = (loggedInId, otherUserId)=>{
    return db.query(
        `INSERT INTO friendships (sender_id, recipient_id) VALUES ($1, $2) RETURNING *`,
        [loggedInId, otherUserId]
    );
};
module.exports.deleteFriendRequest = (loggedInId, otherUserId)=>{
    return db.query(
        `DELETE FROM friendships
        WHERE (recipient_id = $1 AND sender_id = $2)
        OR (recipient_id = $2 AND sender_id = $1)`, [loggedInId, otherUserId]
    );
};
module.exports.acceptFriendRequest = (loggedInId, otherUserId)=>{
    return db.query(
        `UPDATE friendships
        SET  accepted = true
        WHERE (recipient_id = $1 AND sender_id = $2)
        OR (recipient_id = $2 AND sender_id = $1) RETURNING *;
        `, [loggedInId, otherUserId]
    );
};
module.exports.receiveFriendsWannabes = (loggedInId)=> {
    return db.query(`
    SELECT users.id, first, last, profilepic_url, accepted
    FROM friendships
    JOIN users
    ON (accepted = false AND recipient_id = $1 AND sender_id = users.id)
    OR (accepted = true AND recipient_id = $1 AND sender_id = users.id)
    OR (accepted = true AND sender_id = $1 AND recipient_id = users.id)`,[loggedInId]
    );
};

module.exports.getUsersByIds =  function (arrayOfIds) {
    return db.query(`SELECT id, first, last, profilepic_url FROM users WHERE id = ANY($1)`,[arrayOfIds]
    );
};

module.exports.addMessage = function (message, sender_id) {
    return db.query(`INSERT INTO messages (messages, sender_id) VALUES ($1, $2) RETURNING *`,[message, sender_id]
    );
};

module.exports.getMessages = () => {
    return db.query(
        `SELECT messages.id, messages.messages, messages.created_at, users.first, users.last, users.profilepic_url
        FROM messages
        JOIN users
        ON users.id = sender_id
        ORDER BY messages.id DESC
        LIMIT 10`
    );
};
