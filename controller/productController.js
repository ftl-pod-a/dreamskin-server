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

    //   const { response, conversationId } = req.body;
      //console.log(req.body)
    //   console.log(conversationId)
    //   if (!response || !Array.isArray(response)) {
    //     return res.status(400).json({ error: 'Invalid or missing response in request body' });
    //   }
      // Trim and lowercase each ingredient for consistency
    //   const ingredients = response.map(ingredient => ingredient.trim().toLowerCase());
      // Save the chat message and response to database (optional, if needed)
      // await saveChatMessage(conversationId, "Prompt for product search", JSON.stringify(response));
      // Query products based on ingredients
    //   const products = await productModel.getProductsByIngredients(ingredients);
    //   console.log('Products:', products); // Log the products to see what you're fetching
      // Example filtering: Get 2 cleansers, 2 moisturizers, 1 balm, 1 sunscreen
    //   const cleansers = products.filter(product => product.category === 'Cleanser').slice(0, 2);
    //   const moisturizers = products.filter(product => product.category === 'Moisturizer').slice(0, 2);
    //   const balm = products.find(product => product.category === 'Balm');
    //   const sunscreen = products.find(product => product.category === 'Sunscreen');
      // Example result format
    //   const result = {
    //     cleansers,
    //     moisturizers,
    //     balm,
    //     sunscreen,
    //   };
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

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts
  };