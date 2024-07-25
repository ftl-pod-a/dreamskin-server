const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new comment
// const createComment = async ({ userId, productId, text }) => {
//     try {
//       const comment = await prisma.comment.create({
//         data: {
//           text,
//           userId,
//           productId,
//         },
//         include: { user: true }, // Optional: Include related user details
//       });
//       return comment; // Return the created comment object
//     } catch (error) {
//       throw new Error(`Failed to create comment: ${error.message}`);
//     }
//   };
  
//   module.exports = {
//     createComment,
//   };

// // Get all comments for a product
// const getProductComments = async (productId) => {
//     try {
//       const comments = await prisma.comment.findMany({
//         where: { product_id: parseInt(productId) }, // Correct field name
//         include: { user: true }, // Include user details in the response
//       });
//       return comments;
//     } catch (error) {
//       throw new Error(`Failed to fetch comments for product: ${error.message}`);
//     }
//   };

// // Delete a comment by ID
// const deleteComment = async (commentId) => {
//     try {
//       const deletedComment = await prisma.comment.delete({
//         where: {
//           id: parseInt(commentId),
//         },
//       });
//       return deletedComment; // Return the deleted comment object
//     } catch (error) {
//       throw new Error(`Failed to delete comment: ${error.message}`);
//     }
//   };

// module.exports = {
//   createComment,
//   getProductComments,
//   deleteComment,
// };


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

// Get all comments for a product THIS WORKS JUST TRYING
// const getProductComments = async (productId) => {
//   try {
//     const comments = await prisma.comment.findMany({
//       where: { product_id: productId },
//       include: { user: true }, // Include user details in the response
//     });
//     return comments;
//   } catch (error) {
//     throw new Error(`Failed to fetch comments for product: ${error.message}`);
//   }
// };

const getProductComments = async (productId) => {
  try {
    const comments = await prisma.comment.findMany({
      where: { product_id: productId },
      include: {
        user: {
          select: {
            username: true // Include only the username field from the User model
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
//////-----------------------------
// const updateComment = async ({ commentId, text }) => {
//   try {
//     const updatedComment = await prisma.comment.update({
//       where: { id: commentId },
//       data: { text },
//       include: { user: true, product: true }, // Include related user and product details
//     });
//     return updatedComment;
//   } catch (error) {
//     throw new Error(`Failed to update comment: ${error.message}`);
//   }
// };

module.exports = {
  createComment,
  getProductComments,
  deleteComment,
  //////
  // updateComment
};