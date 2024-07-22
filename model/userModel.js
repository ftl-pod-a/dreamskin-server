// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();

// //not really needed but here just in case 
// // const getAllUsers = async () => {
// //     return prisma.user.findMany();
// //   };

// const getUserById = async (userId) => {
//   return prisma.user.findUnique({ where: { user_id: userId } });
// };

// const createUser = async (userData) => {
//   return prisma.user.create({ data: userData });
// };

// const updateUser = async (userId, userData) => {
//   return prisma.user.update({
//     where: { user_id: userId },
//     data: userData,
//   });
// };

// const deleteUser = async (userId) => {
//   return prisma.user.delete({ where: { user_id: userId } });
// };

// module.exports = {
// //   getAllUsers,
//   getUserById,
//   createUser,
//   updateUser,
//   deleteUser,
// };

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Function to Register user - (create - prisma)
// const createUser = async (username, password) => {
//   return await prisma.user.create({
//     data: { username, password },
//   });
// };

// // Function to Login user - (findUnique - prisma)
// // find the user by id/username
// const findUserByUsername = async (username) => {
//   return await prisma.user.findUnique({
//     where: { username },
//   });
// };

// const findUserById = async (id) => {
//   return await prisma.user.findUnique({
//     where: { user_id },
//   });
// };

// module.exports = {
//   createUser,
//   findUserByUsername,
//   findUserById,
// };

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
  
  module.exports = {
    createUser,
    findUserByUsername,
    findUserById,
  };
  