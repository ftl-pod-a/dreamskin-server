const productModel = require("../model/productModel");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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

const searchProducts = async (req, res) => {
    try {
      const products = await productModel.getAllProducts();

      const ingredientsToCheck = req.body.ingredients;

        const filteredJson = products.filter((ingred) =>
        ingredientsToCheck.some((ingredient) => ingred.ingredients.includes(ingredient))
        );

        const cleansers = filteredJson.filter(product => product.category === 'cleanser');
        const moisturizers = filteredJson.filter(product => product.category === 'moisturizer');
        const sunscreen = filteredJson.filter(product => product.category === 'sunscreen');
        

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
    
    const deletedProduct = await productModel.deleteProduct(req.params.id);
    
    if (deletedProduct) {
      res.status(200).json(deletedProduct);
    } else {
      res.status(404).json({ error: "product not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

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