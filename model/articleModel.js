const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//Function gets all the products 
//Filtering and sorting 
const getAllArticles = async(filter = {}, orderBy = {}) => {
    return prisma.article.findMany({
        where: filter,
        orderBy: orderBy,
    });
};

//Function gets all the products by Id 

const getArticleById = async (id) => {
    return prisma.article.findUnique({ 
        where: { 
            id: parseInt(id) 
        }
    });
};

const createArticle = async(articleData) => {
    return prisma.article.create({
        data: articleData
    });
};

module.exports = {
    getAllArticles,
    getArticleById,
    createArticle,
  };