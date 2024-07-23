const express = require("express");
const router = express.Router();
const commentController = require("../controller/commentController");
const verifyToken = require("../middleware/webhookHandler");

// POST /comments - Create a new comment (authenticated route)
// router.post("/", commentController.createComment);

// // GET /comments/product/:productId - Get all comments for a product
// router.get("/product/:productId",  commentController.getProductComments);

// // DELETE /comments/:commentId - Delete a comment
// router.delete("/:commentId", verifyToken, commentController.deleteComment);

router.post("/", commentController.createComment);

// GET /comments/product/:productId - Get all comments for a product
router.get("/product/:productId", commentController.getProductComments);

// DELETE /comments/:commentId - Delete a comment
router.delete("/:commentId", commentController.deleteComment);

module.exports = router;