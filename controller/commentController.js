const commentModel = require("../model/commentModel");

// Create a new comment
const createComment = async (req, res) => {
    const { user_id } = req.user; // Assuming userId is set in the req.user by the auth middleware
    const { product_id, text } = req.body;
  
    try {
      const comment = await commentModel.createComment({ user_id, product_id, text });
      res.status(201).json(comment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Get all comments for a product
const getProductComments = async (req, res) => {
    const productId = parseInt(req.params.productId); // Ensure productId is parsed to Int
  
    try {
      const comments = await commentModel.getProductComments(productId);
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Delete a comment by ID
  const deleteComment = async (req, res) => {
    const commentId = parseInt(req.params.commentId); // Ensure commentId is parsed to Int
  
    try {
      const deletedComment = await commentModel.deleteComment(commentId);
      if (!deletedComment) {
        return res.status(404).json({ error: "Comment not found" });
      }
      res.status(200).json(deletedComment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports = {
  createComment,
  getProductComments,
  deleteComment,
};