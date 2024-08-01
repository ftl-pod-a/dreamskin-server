const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createComment = async ({ userId, productId, text, username }) => {
  try {
    const comment = await prisma.comment.create({
      data: {
        text,
        user_id: userId,
        product_id: productId,
        username: username
       
      },
      include: { user: true, product: true }, // Include related user and product details
    });
    return comment; // Return the created comment object
  } catch (error) {
    throw new Error(`Failed to create comment: ${error.message}`);
  }
};

const getProductComments = async (productId) => {
  try {
    const comments = await prisma.comment.findMany({
      where: { product_id: productId },
      include: {
        user: {
          select: {
            username: true, // Include only the username field from the User model
            user_id: true,
          }
        }
      }
    });
    return comments;
  } catch (error) {
    throw new Error(`Failed to fetch comments for product: ${error.message}`);
  }
};

// Delete a comment by ID
const deleteComment = async (commentId) => {
  try {
    const deletedComment = await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
    return deletedComment; // Return the deleted comment object
  } catch (error) {
    throw new Error(`Failed to delete comment: ${error.message}`);
  }
};

module.exports = {
  createComment,
  getProductComments,
  deleteComment,
};