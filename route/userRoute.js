// const express = require("express");
// const router = express.Router();
// const userController = require("../controller/userController");
// // const verifyToken = require("../middleware/auth");

// // // Protected routes
// // router.get("/profile", verifyToken, userController.getUserProfile);
// // router.put("/profile", verifyToken, userController.updateUserProfile);
// // router.delete("/profile", verifyToken, userController.deleteUserProfile);

// // // Unprotected routes (e.g., for creating new users)
// // router.post("/register", verifyToken, userController.createUser);

// // module.exports = router;


const express = require("express");
const { register, login, updateUser, deleteUser } = require("../controller/userController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/:user_id", updateUser); // Update user endpoint
router.delete("/:user_id", deleteUser); // Delete user endpoint

module.exports = router;




