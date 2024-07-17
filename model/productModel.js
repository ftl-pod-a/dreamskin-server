const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// const getAllProducts = async (filter = {}, orderBy = {}) => {
//   return prisma.product.findMany({
//     where: filter,
//     orderBy: orderBy,
//   });
// };

const getAllProducts = async (filter = {}, orderBy = {}) => {
  try {
    const products = await prisma.product.findMany({
      where: filter,
      orderBy: orderBy,
      include: {
        comments: true, // Include comments related to each product
      },
    });
    return products;
  } catch (error) {
    throw new Error(`Failed to fetch products: ${error.message}`);
  }
};

//NEW CODE MIGHT NOT WORK JUST TESTING 

// const getAllProducts = async (category, ingredients, orderBy = {}) => {
//   try {
//     const products = await prisma.product.findMany({
//       where: {
//         category,
//         ingredients: {
//           every: {
//             name: {
//               in: ingredients,
//             },
//           },
//         },
//       },
//       orderBy: orderBy,
//       include: {
//         comments: true, // Include comments related to each product
//         // category: true, // Include category information for each product
//       },
//     });
//     return products;
//   } catch (error) {
//     throw new Error(`Failed to fetch products: ${error.message}`);
//   }
// };

///////////////////////

const getProductById = async (id) => {
  return prisma.product.findUnique({ where: { id: parseInt(id) } });
};

const createProduct = async (productData) => {
  return prisma.product.create({ data: productData });
};

const updateProduct = async (id, productData) => {
  return prisma.product.update({
    where: { id: parseInt(id) },
    data: productData,
  });
};

const deleteProduct = async (id) => {
  return prisma.product.delete({ where: { id: parseInt(id) } });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};