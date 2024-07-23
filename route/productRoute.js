const express = require("express");
const router = express.Router();
// const { likeProduct } = require('../controller/productController');
const productController = require("../controller/productController");
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();



router.get("/", productController.getAllProducts);

router.get("/:id", productController.getProductById);

router.post("/", productController.createProduct);

router.put("/:id", productController.updateProduct);

router.delete("/:id", productController.deleteProduct);

router.post('/products/search', productController.searchProducts);

router.post('/:id/like', productController.likeProduct);
  
  
  module.exports = router;
