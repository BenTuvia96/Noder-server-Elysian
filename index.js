require("dotenv").config();
const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();
const port = process.env.PORT || 3000;
//test
// 1) Configure CORS
app.use(cors());

// 2) Parse JSON bodies
app.use(express.json());

// 3) Set up OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 4) Define a route to generate random text
app.post("/getRandomMessage", async (req, res) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an assistant for this registration system and provide fun and creative welcome messages.",
        },
        {
          role: "user",
          content:
            "Give me a short funny welcome message for a user that just logged in.",
        },
      ],
      max_tokens: 50,
    });

    const randomText = response.choices[0].message.content.trim();

    // Return to client
    res.json({ message: randomText });
  } catch (error) {
    console.error("Error generating text:", error);
    res.status(500).json({ error: "Failed to generate text." });
  }
});

// 5) Start the server
app.listen(port, () => {
  console.log(`Node server listening on port ${port}`);
});
