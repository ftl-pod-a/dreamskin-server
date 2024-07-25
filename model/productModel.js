const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



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

///////////////////////

//PAGINATION FOR PRODUCT (HAS TO BE TESTED WITH FRONTEND)
// const getAllProducts = async (filter = {}, orderBy = {}, skip = 0, take = 10) => {
//   try {
//     const products = await prisma.product.findMany({
//       where: filter,
//       orderBy: orderBy,
//       include: {
//         comments: true, // Include comments related to each product
//       },
//       skip: skip,
//       take: take,
//     });

//     const totalCount = await prisma.product.count({
//       where: filter,
//     });

//     return {
//       products,
//       totalCount,
//     };
//   } catch (error) {
//     throw new Error(`Failed to fetch products: ${error.message}`);
//   }
// };

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

// const likeProduct = async (userId, productId) => {
//   try {
//     const existingLike = await prisma.userProductLike.findUnique({
//       where: {
//         userId_productId: {
//           userId: parseInt(userId),
//           productId: parseInt(productId),
//         },
//       },
//     });

//     if (existingLike) {
//       throw new Error('User has already liked this product');
//     }

//     await prisma.userProductLike.create({
//       data: {
//         userId: parseInt(userId),
//         productId: parseInt(productId),
//       },
//     });

//     const updatedProduct = await prisma.product.update({
//       where: { id: parseInt(productId) },
//       data: {
//         likes: {
//           increment: 1,
//         },
//       },
//     });

//     return updatedProduct.likes;
//   } catch (error) {
//     throw new Error(`Failed to like product: ${error.message}`);
//   }
// };

const likeProduct = async (userId, productId) => {
  try {
    // Convert IDs to integers
    const userIdParsed = parseInt(userId, 10);
    const productIdParsed = parseInt(productId, 10);

    // Validate IDs
    if (isNaN(userIdParsed) || isNaN(productIdParsed)) {
      throw new Error('Invalid user ID or product ID.');
    }

    // Check if the user has already liked the product
    const user = await prisma.user.findUnique({
      where: { user_id: userIdParsed },
      include: { likedProducts: true },
    });

    if (!user) {
      throw new Error('User not found.');
    }

    const hasLiked = user.likedProducts.some(product => product.id === productIdParsed);

    let updatedProduct;

    if (hasLiked) {
      // User has already liked the product, so remove the like
      await prisma.user.update({
        where: { user_id: userIdParsed },
        data: {
          likedProducts: {
            disconnect: { id: productIdParsed },
          },
        },
      });

      // Decrement the product likes count
      updatedProduct = await prisma.product.update({
        where: { id: productIdParsed },
        data: {
          likes: {
            decrement: 1,
          },
        },
      });
    } else {
      // User has not liked the product, so add the like
      await prisma.user.update({
        where: { user_id: userIdParsed },
        data: {
          likedProducts: {
            connect: { id: productIdParsed },
          },
        },
      });

      // Increment the product likes count
      updatedProduct = await prisma.product.update({
        where: { id: productIdParsed },
        data: {
          likes: {
            increment: 1,
          },
        },
      });
    }

    return updatedProduct.likes;
  } catch (error) {
    console.error(`Failed to toggle like on product: ${error.message}`);
    throw new Error(`Failed to toggle like on product: ${error.message}`);
  }
};






module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  likeProduct
  
};