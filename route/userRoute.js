const express = require("express");
const { register, login, getUserById, updateUser, deleteUser } = require("../controller/userController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/:user_id", getUserById);
router.put("/:user_id", updateUser); // Update user endpoint
router.delete("/:user_id", deleteUser); // Delete user endpoint

module.exports = router;