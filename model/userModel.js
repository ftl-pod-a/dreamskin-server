const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getUserById = async (userId) => {
  return prisma.user.findUnique({ where: { user_id: userId } });
};

const createUser = async (userData) => {
  return prisma.user.create({ data: userData });
};

const updateUser = async (userId, userData) => {
  return prisma.user.update({
    where: { user_id: userId },
    data: userData,
  });
};

const deleteUser = async (userId) => {
  return prisma.user.delete({ where: { user_id: userId } });
};

module.exports = {
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};