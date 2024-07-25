const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


const getAllRoutines = async (filter = {}, orderBy = {}) => {
    try {
      const routines = await prisma.routine.findMany({
        where: filter,
        orderBy: orderBy,
        include: {
          products: true,
        },
      });
      return routines;
    } catch (error) {
      throw new Error(`Failed to fetch routines: ${error.message}`);
    }
};

const getRoutineById = async (user_id) => {
    return prisma.routine.findUnique({ 
        where: { user_id: parseInt(user_id) },
        include: {
            products: true
        } 
    });
};

const createRoutine = async (routineData) => {
    try {
        return await prisma.routine.create({
            data: {
                user_id: routineData.user_id,
                products: {
                    connect: routineData.products.map(product => ({
                        id: product.id
                    }))
                }
            },
            include: {
                products: true
            }
        });
    } catch (error) {
        throw new Error(`Failed to create routine: ${error.message}`);
    }
};

module.exports = {
    createRoutine,
    getAllRoutines,
    getRoutineById
  };
  