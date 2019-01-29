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






// module.exports.getUserInfoByEmail = function(email){
//     return db.query(`SELECT password, first, last, users.id, signatures.id AS sigid
//         FROM users
//         LEFT JOIN signatures
//         ON users.id = signatures.user_id
//         WHERE email = $1`, [email]
//     );
// };
