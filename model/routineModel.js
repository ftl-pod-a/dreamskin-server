const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


const createRoutine = async (routineData) => {
    return prisma.routine.create({
      data: routineData
    });
};

module.exports = {
    createRoutine,
  };
  