const bcrypt = require('bcrypt');
const pool = require('../database/connection');
const jwt = require('jsonwebtoken');

async function registerUser(username,password) {
    
    const userAlreadyExists = await pool.query(
        `
        SELECT id
        FROM users
        WHERE username = $1
        `,
        [username]
    );

    if(userAlreadyExists.rows.length > 0){
        throw new Error('USER_ALREADY_EXISTS');
    }

    const passwordHash = await bcrypt.hash(
        password,
        10
    );

    const result = await pool.query(
        `
        INSERT INTO users(
            username,
            password_hash
        )
        VALUES(
            $1,
            $2
        )
        RETURNING 
            id,
            username,
            created_at
        `,
        [
            username,
            passwordHash
        ]

    );
    return result.rows[0];

}

async function loginUser(username, password) {

    const result = await pool.query(
        `
        SELECT
            id,
            username,
            password_hash
        FROM users
        WHERE username = $1
        `,
        [username]
    );

    if (result.rows.length === 0) {
        throw new Error('INVALID_CREDENTIALS');
    }

    const user = result.rows[0];

    const passwordMatch =
        await bcrypt.compare(
            password,
            user.password_hash
        );

    if (!passwordMatch) {
        throw new Error('INVALID_CREDENTIALS');
    }

    const token = jwt.sign(
        {
            userId: user.id,
            username: user.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1h'
        }
    );

    return {
        token,
        user: {
            id: user.id,
            username: user.username
        }
    };
}

module.exports = {
    registerUser,
    loginUser
};