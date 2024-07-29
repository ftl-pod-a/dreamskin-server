const express = require("express");
const { register, login, updateUser, deleteUser } = require("../controller/userController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/:user_id", updateUser); // Update user endpoint
router.delete("/:user_id", deleteUser); // Delete user endpoint

module.exports = router;