const axios = require("axios");
let json = require('../data/products.json');
let products = json.products;

const addProduct = async (product) => {
    try {
        const response = await axios.post("https://dreamskin-server-tzka.onrender.com/products", product);
        

    } catch (error) {
        console.error("Error adding product");
        
    }
}

products.forEach((product) => {
    delete product.id
    
    addProduct(product);
})
