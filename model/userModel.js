const { PrismaClient } = require("@prisma/client");
const { likeProduct } = require("./productModel");
const prisma = new PrismaClient();

const createUser = async (username, password, skinType, goals, concerns) => {
  return await prisma.user.create({
    data: { username, password, skinType, goals, concerns },
  });
};

// Function to find user by username
const findUserByUsername = async (username) => {
  return await prisma.user.findUnique({
    where: { username },
  });
};

// Function to find user by user_id
const findUserById = async (user_id) => {
  return await prisma.user.findUnique({
    where: { user_id },
    include: {likedProducts: true}
  });
};

const updateUserById = async (user_id, data) => {
  try {
    
    const updatedUser = await prisma.user.update({
      where: { user_id },
      data,
    });
    
    return updatedUser;
  } catch (error) {
    console.error("Error updating user by user_id:", error);
    throw error;
  }
};

// Function to delete a user by user_id
const deleteUserById = async (user_id) => {
  try {
    
    const deletedUser = await prisma.user.delete({
      where: { user_id },
    });
    
    return deletedUser;
  } catch (error) {
    console.error("Error deleting user by user_id:", error);
    throw error;
  }
};

module.exports = {
  createUser,
  findUserByUsername,
  findUserById,
  updateUserById,
  deleteUserById,
};
