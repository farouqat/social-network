const spicedPg = require('spiced-pg');
let db;

if (process.env.DATABASE_URL) {
    db=spicedPg(process.env.DATABASE_URL);
} else {
    const {dbUser, dbPassword} = require('./secrets');
    db = spicedPg(`postgres:${dbUser}:${dbPassword}@localhost:5432/social`);
}


module.exports.registerUser = (first, last, email, hash)=>{
    return db.query(
        `INSERT INTO users (first, last, email, password) VALUES ($1, $2, $3, $4) RETURNING *`,
        [first, last, email, hash]
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
