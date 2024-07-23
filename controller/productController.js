const productModel = require("../model/productModel");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllProducts = async (req, res) => {
  const { sort, category } = req.query;
  let filter = {};
  let orderBy = {};

  if (category){
    filter.category = category;
  }

  if (sort) {
    orderBy = { price: sort == "price" ? "asc" : "asc"};
  }

  try {
    const products = await productModel.getAllProducts(filter, orderBy);
    res.status(200).json(products);
  } catch (error){
    res.status(400).json( {error: error.message} )
  }
}

const searchProducts = async (req, res) => {
    try {
      let json = require('../data/products.json');
      json = json.products;
      const t = ["Hyaluronic Acid"]
      //console.log(json.filter((ingred) => ingred.ingredients.includes("Hyaluronic Acid")));

      const ingredientsToCheck = req.body.ingredients;
      //console.log("ingredients", ingredientsToCheck);

        const filteredJson = json.filter((ingred) =>
        ingredientsToCheck.some((ingredient) => ingred.ingredients.includes(ingredient))
        );

        const cleansers = filteredJson.filter(product => product.category === 'cleanser');
        const moisturizers = filteredJson.filter(product => product.category === 'moisturizer');
        const balm = filteredJson.filter(product => product.category === 'balm');
        const sunscreen = filteredJson.filter(product => product.category === 'sunscreen');
        console.log("Sunscreen", sunscreen[0])
        console.log("Balm", balm[0])
        console.log("Moist", moisturizers[0], moisturizers[1])
        console.log("cleansers", cleansers[0], cleansers[1])

        const newProducts = {
            sunscreen: sunscreen[0],
            balm: balm[0],
            moisturizers: [moisturizers[0], moisturizers[1]],
            cleansers: [cleansers[0], cleansers[1]]
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

const likeProduct = async (req, res) => {
  const { userId } = req.body;
  const { id: productId } = req.params;

  try {
    // Check if the product exists
    const product = await prisma.product.findUnique({
      where: { id: parseInt(productId) },
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Check if the user exists and fetch their likedProducts
    const user = await prisma.user.findUnique({
      where: { user_id: parseInt(userId) },
      include: {
        likedProducts: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the user has already liked the product
    const alreadyLiked = user.likedProducts.some(p => p.id === parseInt(productId));

    if (alreadyLiked) {
      return res.status(400).json({ error: 'User has already liked this product' });
    }

    // Connect the user to the product (like the product)
    await prisma.user.update({
      where: { user_id: parseInt(userId) },
      data: {
        likedProducts: {
          connect: { id: parseInt(productId) },
        },
      },
    });

    // Increment the product likes count
    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(productId) },
      data: {
        likes: {
          increment: 1,
        },
      },
    });

    res.status(200).json({ likes: updatedProduct.likes });
  } catch (error) {
    console.error('Error in likeProduct:', error.message);
    res.status(500).json({ error: 'Failed to like product' });
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