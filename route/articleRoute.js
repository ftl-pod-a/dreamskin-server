const express = require("express");
const router = express.Router();
const articleController = require("../controller/articleController");

//get all articles 

router.get("/", articleController.getAllArticles);


//get all articles by id

router.get('/:id', articleController.getArticleById);

//add a new article
router.post("/", articleController.createArticle);


module.exports = router;