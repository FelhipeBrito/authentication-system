const rateLimit =
    require('express-rate-limit');

const authLimiter =
    rateLimit({

        windowMs:
            15 * 60 * 1000,

        max: 5,

        standardHeaders: true,

        legacyHeaders: false,

        message: {

            success: false,

            message:
                'Muitas tentativas. Tente novamente em 15 minutos.'

        }

    });

module.exports = {

    authLimiter

};