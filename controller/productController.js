const productModel = require("../model/productModel");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//TESTING IT WORKS ON POSTMAN
const getAllProducts = async (req, res) => {
  const { sort, category, name, page = 1, pageSize = 10 } = req.query;

  let filter = {};
  let orderBy = {};

  // Filter by category
  if (category) {
    filter.category = category;
  }

  // Filter by name (with partial match)
  if (name) {
    filter.name = {
      contains: name,
      mode: 'insensitive', // Case-insensitive search
    };
  }

  // Sorting
  if (sort) {
    orderBy = { likes: sort === 'likes' ? 'desc' : 'asc' };
  }

  try {
    // Pagination settings
    const skip = (parseInt(page) - 1) * parseInt(pageSize);
    const take = parseInt(pageSize);

    // Fetch products with filters, sorting, and pagination
    const products = await prisma.product.findMany({
      where: filter,
      orderBy: orderBy,
      skip: skip,
      take: take,
      include: {
        comments: true, // Include comments related to each product
      },
    });

    // Count total number of products for pagination
    const totalCount = await prisma.product.count({
      where: filter,
    });

    // Response with pagination info
    res.status(200).json({
      products,
      pagination: {
        totalCount,
        totalPages: Math.ceil(totalCount / pageSize),
        currentPage: parseInt(page),
        pageSize: parseInt(pageSize),
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};





//THIS WORKS BUT WANTING TO ADD SEARCH BY NAME AND PAGINATION
// const getAllProducts = async (req, res) => {
//   const { sort, category } = req.query;
//   let filter = {};
//   let orderBy = {};

//   if (category) {
//     filter.category = category;
//   }

//   if (sort) {
//     // Adjust orderBy to sort by likes
//     orderBy = { likes: sort === 'likes' ? 'desc' : 'asc' };
//   }
//   try {
//     const products = await prisma.product.findMany({
//       where: filter,
//       orderBy: orderBy,
//       include: {
//         // comments: true, // Include comments related to each product
//       },
//     });
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

//   try {
//     const products = await productModel.getAllProducts(filter, orderBy);
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };


// const getAllProducts = async (req, res) => {
//   const { sort, category } = req.query;
//   let filter = {};
//   let orderBy = {};

//   if (category){
//     filter.category = category;
//   }

//   if (sort) {
//     orderBy = { price: sort == "price" ? "asc" : "asc"};
//   }

//   try {
//     const products = await productModel.getAllProducts(filter, orderBy);
//     res.status(200).json(products);
//   } catch (error){
//     res.status(400).json( {error: error.message} )
//   }
// }



//PAGINATION FOR PRODUCT (HAS TO BE TESTED WITH FRONTEND)
// const getAllProducts = async (req, res) => {
//   const { sort, category, skip = 0, take = 10 } = req.query;
//   let filter = {};
//   let orderBy = {};

//   if (category) {
//     filter.category = category;
//   }

//   if (sort) {
//     orderBy = { price: sort === "price" ? "asc" : "desc" };
//   }

//   try {
//     const { products, totalCount } = await productModel.getAllProducts(filter, orderBy, +skip, +take);
//     res.status(200).json({ products, totalCount });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

const searchProducts = async (req, res) => {
    try {
      // let json = require('../data/products.json');
      // json = json.products;
      // const t = ["Hyaluronic Acid"]
      const products = await productModel.getAllProducts();
      //console.log(json.filter((ingred) => ingred.ingredients.includes("Hyaluronic Acid")));

      const ingredientsToCheck = req.body.ingredients;
      //console.log("ingredients", ingredientsToCheck);

        const filteredJson = products.filter((ingred) =>
        ingredientsToCheck.some((ingredient) => ingred.ingredients.includes(ingredient))
        );

        const cleansers = filteredJson.filter(product => product.category === 'cleanser');
        const moisturizers = filteredJson.filter(product => product.category === 'moisturizer');
        const sunscreen = filteredJson.filter(product => product.category === 'sunscreen');
        console.log("Sunscreen", sunscreen[0])
        console.log("Moist", moisturizers[0], moisturizers[1])
        console.log("cleansers", cleansers[0], cleansers[1])

        const newProducts = {
          0: cleansers[0], // morning cleanser
          1: cleansers[1], // night cleanser
          2: moisturizers[0], // morning moisturizer
          3: moisturizers[1], // night moisturizer
          4: sunscreen[0] // sunscreen
      }

      res.status(200).json(newProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  };


///////////////////////

const getProductById = async (req, res) => {
  try {
    const product = await productModel.getProductById(req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: "product not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const newProduct = await productModel.createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await productModel.updateProduct(req.params.id, req.body);
    if (updatedProduct) {
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ error: "product not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    console.log("params are", req.params.id);
    const deletedProduct = await productModel.deleteProduct(req.params.id);
    console.log("deleted", deletedProduct);
    if (deletedProduct) {
      res.status(200).json(deletedProduct);
    } else {
      res.status(404).json({ error: "product not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// const likeProduct = async (req, res) => {
//   const { userId } = req.body;
//   const { id: productId } = req.params;

//   try {
//     // Check if the product exists
//     const product = await prisma.product.findUnique({
//       where: { id: parseInt(productId) },
//     });

//     if (!product) {
//       return res.status(404).json({ error: 'Product not found' });
//     }

//     // Check if the user exists and fetch their likedProducts
//     const user = await prisma.user.findUnique({
//       where: { user_id: parseInt(userId) },
//       include: {
//         likedProducts: true,
//       },
//     });

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // Check if the user has already liked the product
//     const alreadyLiked = user.likedProducts.some(p => p.id === parseInt(productId));

//     if (alreadyLiked) {
//       return res.status(400).json({ error: 'User has already liked this product' });
//     }

//     // Connect the user to the product (like the product)
//     await prisma.user.update({
//       where: { user_id: parseInt(userId) },
//       data: {
//         likedProducts: {
//           connect: { id: parseInt(productId) },
//         },
//       },
//     });

//     // Increment the product likes count
//     const updatedProduct = await prisma.product.update({
//       where: { id: parseInt(productId) },
//       data: {
//         likes: {
//           increment: 1,
//         },
//       },
//     });

//     res.status(200).json({ likes: updatedProduct.likes });
//   } catch (error) {
//     console.error('Error in likeProduct:', error.message);
//     res.status(500).json({ error: 'Failed to like product' });
//   }
// };


const likeProduct = async (req, res) => {
  const { userId } = req.body;
  const { id: productId } = req.params;

  try {
    // Call the model function to handle toggling the like
    const updatedLikesCount = await productModel.likeProduct(userId, productId);

    res.status(200).json({ likes: updatedLikesCount });
  } catch (error) {
    console.error('Error in likeProduct:', error.message);
    res.status(500).json({ error: 'Failed to toggle like on product' });
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