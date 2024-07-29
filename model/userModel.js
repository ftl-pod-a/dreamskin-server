const { PrismaClient } = require("@prisma/client");
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
  });
};

const updateUserById = async (user_id, data) => {
  try {
    console.log("Updating user by user_id:", user_id);
    const updatedUser = await prisma.user.update({
      where: { user_id },
      data,
    });
    console.log("Updated user:", updatedUser);
    return updatedUser;
  } catch (error) {
    console.error("Error updating user by user_id:", error);
    throw error;
  }
};

// Function to delete a user by user_id
const deleteUserById = async (user_id) => {
  try {
    console.log("Deleting user by user_id:", user_id);
    const deletedUser = await prisma.user.delete({
      where: { user_id },
    });
    console.log("Deleted user:", deletedUser);
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
