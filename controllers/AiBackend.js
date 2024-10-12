import { GoogleGenerativeAI } from "@google/generative-ai";

const gemini_api_key = process.env.GOOGLE_GEMINI_API_KEY;
const googleAI = new GoogleGenerativeAI(gemini_api_key);
const geminiModel = googleAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generate = async (question) => {
  try {
    const result = await geminiModel.generateContent(question);
    const response = await result.response.text(); // Ensure we await the text response.
    return response;
  } catch (error) {
    console.error("Error generating content from AI:", error.message);
    throw new Error("Failed to generate AI content"); // Rethrow a generic error for the caller.
  }
};

export async function AskfromAi(req, res) {
  try {
    // Validate the request body
    const { question } = req.body;
    if (!question || typeof question !== 'string') {
      return res.status(400).json({ msg: "Invalid or missing 'question' in request body", status: false });
    }

    // Call the generate function
    const result = await generate(question);
    if (!result) {
      throw new Error("No content generated from the AI");
    }

    // Send the successful response back
    return res.status(200).json({ result });

  } catch (error) {
    console.error("AskfromAi error:", error.message);
    
    // Send an appropriate error response to the client
    return res.status(500).json({ msg: "An error occurred while processing your request", status: false });
  }
}
