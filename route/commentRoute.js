const express = require("express");
const router = express.Router();
const commentController = require("../controller/commentController");
const verifyToken = require("../middleware/auth");

// POST /comments - Create a new comment (authenticated route)
router.post("/", verifyToken, commentController.createComment);

// GET /comments/product/:productId - Get all comments for a product
router.get("/product/:productId", commentController.getProductComments);

// DELETE /comments/:commentId - Delete a comment
router.delete("/:commentId", verifyToken, commentController.deleteComment);

module.exports = router;