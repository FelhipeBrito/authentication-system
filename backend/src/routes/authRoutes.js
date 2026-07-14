const express = require("express");

const router = express.Router();

const {

    registerValidator,

    loginValidator

} = require(
    '../validators/authValidator'
);

const {

    validateRequest

} = require(
    '../middlewares/validationMiddleware'
);

const {

    authLimiter

} = require(
    '../middlewares/rateLimitMiddleware'
);

const {
  getUsers,
  register,
  login,
  profile,
} = require("../controllers/authController");

const { authenticateToken } = require("../middlewares/authMiddleware");

router.post(

    '/register',

    authLimiter,

    registerValidator,

    validateRequest,

    register

);

router.post(

    '/login',

    authLimiter,

    loginValidator,

    validateRequest,

    login

);

router.get("/profile", authenticateToken, profile);

router.get("/users", getUsers);

module.exports = router;
