const express = require("express");

const router = express.Router();

const {
  getUsers,
  register,
  login,
  profile,
} = require("../controllers/authController");

const { authenticateToken } = require("../middlewares/authMiddleware");

router.post("/register", register);

router.post("/login", login);

router.get("/profile", authenticateToken, profile);

router.get("/users", getUsers);

module.exports = router;
