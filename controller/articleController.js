const articleModel = require("../model/articleModel")

//getAllArticles 

const getAllArticles = async (req, res) => {
    const { articleCategory } = req.query;

    let filter = {};

    if (articleCategory){
        filter.articleCategory = articleCategory;
    }
    
    try{
        const articles = await articleModel.getAllArticles(filter);
        res.status(200).json(articles);
  
    } catch(error){
        res.status(400).json({ error: error.message });
    };

};

//get an article by id 
const getArticleById = async (req, res) => {
    try {
        const { id } = req.params;
        const article = await articleModel.getArticleById(id);
        if (article) {
          res.status(200).json(article);
        } else {
          res.status(404).json({ error: 'Article not found' });
        }
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
};

//function create a new article
const createArticle = async (req, res) => {
    try {
      const newArticle = await articleModel.createArticle(req.body);
      res.status(201).json(newArticle);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};



module.exports = {
    getAllArticles,
    getArticleById,
    createArticle,
  };