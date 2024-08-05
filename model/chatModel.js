const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getChatHistory = async (conversationId) => {
  return await prisma.chat.findMany({
    where: { conversationId },
    orderBy: { createdAt: "asc" },
  });
};

const saveChatMessage = async (conversationId, prompt, response) => {
    try {
      await prisma.chat.create({
        data: {
          conversationId,
          prompt,
          response,
        },
      });
  
      
  
      return response; 
    } catch (error) {
      console.error("Error saving chat message:", error);
      throw new Error("Failed to save chat message");
    }
};

module.exports = {
  getChatHistory,
  saveChatMessage,
};

