const axios = require("axios");
let json = require('../data/products.json');
let products = json.products;

const addProduct = async (product) => {
    try {
        const response = await axios.post("http://localhost:3000/products", product);
        console.log("Response", response.data);

    } catch (error) {
        console.error("Error adding product");
        console.log(error);
    }
}

products.forEach((product) => {
    delete product.id
    console.log(product);
    addProduct(product);
})
console.log("Products added");