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
const { register, login } = require("../controller/userController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;