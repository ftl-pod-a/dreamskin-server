const express = require("express");
const router = express.Router();
const commentController = require("../controller/commentController");
const verifyToken = require("../middleware/webhookHandler");

router.post("/", commentController.createComment);

// GET /comments/product/:productId - Get all comments for a product
router.get("/product/:productId", commentController.getProductComments);

// DELETE /comments/:commentId - Delete a comment
router.delete("/:commentId", commentController.deleteComment);

// router.put("/:commentId", commentController.updateComment);
module.exports = router;