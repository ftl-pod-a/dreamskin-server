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

const searchProducts = async (req, res) => {
  try {
      console.log('Request Body:', req.body); // Check the entire request body to see if `response` is included
      let { response, conversationId } = req.body;
  
      if (!response) {
        return res.status(400).json({ error: 'Response field is missing in the request body' });
      }

    // Trim and lowercase each ingredient for consistency
    const ingredients = response.map(ingredient => ingredient.trim().toLowerCase());

    // Save the chat message and response to database
    await saveChatMessage(conversationId, "Prompt for product search", JSON.stringify(response));

    // Query products based on ingredients
    const products = await productModel.getProductsByIngredients(ingredients);

    console.log('Products:', products);


    // Example filtering: Get 2 cleansers, 2 moisturizers, 1 balm, 1 sunscreen
    const cleansers = products.filter(product => product.category === 'Cleanser').slice(0, 2);
    const moisturizers = products.filter(product => product.category === 'Moisturizer').slice(0, 2);
    const balm = products.find(product => product.category === 'Balm');
    const sunscreen = products.find(product => product.category === 'Sunscreen');

    // Example result format
    const result = {
      cleansers,
      moisturizers,
      balm,
      sunscreen,
    };

    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

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
  searchProducts
};