const { GoogleGenerativeAI } = require("@google/generative-ai");
//import model
const { getChatHistory, saveChatMessage } = require("../model/chatModel");

// get the GeminiAPI key from env file
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// chat handler function to handle chat prompts and response
const chatHandler = async (req, res) => {
  const { prompt, conversationId } = req.body;

  if (!prompt) {
    return res.status(400).send("Prompt is empty - it is required");
  }

  try {
    let messages = [
      { role: "system", content: "You are a skincare assistant that lists skincare ingredients in an array" },
    ];
    if (conversationId) {
      const previousMessages = await getChatHistory(conversationId);

      previousMessages.forEach((msg) => {
        messages.push({ role: "user", content: msg.prompt });
        messages.push({ role: "assistant", content: msg.response });
      });
    }

    messages.push({ role: "user", content: prompt });

    // get the model - WORKING WITH GEMINI API --------------------
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    //get the result from the model using the generateContent and passing in the prompt
    const result = await model.generateContent(prompt);
    const chatResponse = await result.response.text();

    //new conversation id and saave the chat message to DB
    const newConversationId = conversationId || Date.now().toString();
    await saveChatMessage(newConversationId, prompt, chatResponse);

    // -------------------------------------------------------

    res.json({
      prompt: prompt,
      response: chatResponse,
      conversationId: newConversationId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
};

module.exports = {
  chatHandler,
};