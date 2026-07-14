const {
    body
} = require('express-validator');

const registerValidator = [

    body('username')
        .trim()
        .isLength({
            min: 3,
            max: 30
        })
        .withMessage(
            'Usuário deve possuir entre 3 e 30 caracteres'
        )
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage(
            'Usuário possui caracteres inválidos'
        ),

    body('password')
        .isLength({
            min: 6,
            max: 100
        })
        .withMessage(
            'Senha deve possuir no mínimo 6 caracteres'
        )

];

const loginValidator = [

    body('username')
        .trim()
        .notEmpty()
        .withMessage(
            'Usuário obrigatório'
        ),

    body('password')
        .notEmpty()
        .withMessage(
            'Senha obrigatória'
        )

];

module.exports = {

    registerValidator,

    loginValidator

};