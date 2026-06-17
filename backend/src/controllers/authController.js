const pool = require('../database/connection');

const {
    registerUser,
    loginUser
} = require('../services/authService');

async function getUsers(req, res) {

    try {

        const result = await pool.query(`
            SELECT
                id,
                username,
                created_at
            FROM users
            ORDER BY id
        `);

        return res.status(200).json({
            success: true,
            users: result.rows
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: 'Erro interno'
        });
    }
}

async function register(req,res) {
    console.log(req.body);
    try{

        const {
            username,
            password
        } = req.body;

        if(!username || !password){
            return res.status(400).json({
                success:false,
                message:"Campos obrigatórios"
            });
        }

        const user = await registerUser(
            username,
            password
        );

        return res.status(201).json({
            success:true,
            user
        });
    }catch(error){
        if(
            error.message ===
            'USER_ALREADY_EXISTS'
        ){
            return res.status(400).json({
                success:false,
                message: "Usuário já existe"
            })
        }

        console.error(error);

        return res.status(500).json({
            success:false,
            message:"Erro interno"
        });
    }
}
async function login(req, res) {

    try {

        const {
            username,
            password
        } = req.body || {};

        if (!username || !password) {

            return res.status(400).json({
                success: false,
                message: 'Campos obrigatórios'
            });
        }

        const result =
            await loginUser(
                username,
                password
            );

        return res.status(200).json({
            success: true,
            token: result.token,
            user: result.user
        });

    } catch (error) {

        if (
            error.message ===
            'INVALID_CREDENTIALS'
        ) {

            return res.status(401).json({
                success: false,
                message: 'Usuário ou senha inválidos'
            });
        }

        console.error(error);

        return res.status(500).json({
            success: false,
            message: 'Erro interno'
        });
    }
}

async function profile(
    req,
    res
) {

    return res.status(200).json({
        success: true,
        user: req.user
    });

}

module.exports = {
    getUsers,
    register,
    login,
    profile
};