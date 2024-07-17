const productModel = require("../model/productModel");

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


//NEW CODE MIGHT NOT WORK JUST TESTING 

// const getAllProducts = async (req, res) => {
//     const { sort, category } = req.query;
//     const { response } = req.body; // Assuming 'response' contains the array of ingredients
  
//     let filter = {};
//     let orderBy = {};
  
//     if (category) {
//       filter.category = category;
//     }
  
//     if (sort) {
//       orderBy = { price: sort === "price" ? "asc" : "asc" }; // Corrected sorting logic
//     }
  
//     try {
//       // Fetch products based on category
//       let products = await productModel.getAllProducts(filter, orderBy);
  
//       // Filter products further by ingredients if 'response' array exists
//       if (response && Array.isArray(response) && response.length > 0) {
//         const ingredientNames = response.map(ingredient => ingredient.name); // Adjust according to your data structure
  
//         // Query products with matching ingredients
//         products = products.filter(product =>
//           product.ingredients.every(ingredient =>
//             ingredientNames.includes(ingredient.name)
//           )
//         );
//       }
  
//       res.status(200).json(products);
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   };




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

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
  };