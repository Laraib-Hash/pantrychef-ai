import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export default async function handler(req, res) {

  // Only allow POST requests
  if (req.method !== "POST") {

    return res.status(405).json({
      error: "Method not allowed",
    });

  }


  try {

    const { ingredients } = req.body;


    // Validate ingredients

    if (
      !ingredients ||
      !Array.isArray(ingredients) ||
      ingredients.length === 0
    ) {

      return res.status(400).json({
        error: "No ingredients provided",
      });

    }


    const ingredientList =
      ingredients.join(", ");


    // AI Instructions

    const prompt = `
You are PantryChef AI, a helpful cooking assistant.

The user has these ingredients in their pantry:

${ingredientList}

Your task is to recommend exactly 3 recipes that the user can make using their available ingredients.

Prioritize recipes that use the ingredients the user already has.

For each recipe provide:

1. Recipe name
2. Estimated cooking time
3. Difficulty level
4. Ingredients from the pantry that are used
5. Ingredients that are missing
6. Step-by-step cooking instructions

Return ONLY valid JSON.

The response must follow exactly this structure:

[
  {
    "name": "Recipe Name",
    "time": "20 minutes",
    "difficulty": "Easy",
    "ingredientsUsed": [
      "Eggs",
      "Bread"
    ],
    "missingIngredients": [
      "Butter"
    ],
    "instructions": [
      "Step 1",
      "Step 2",
      "Step 3"
    ]
  }
]

Do not include markdown.
Do not include code fences.
Do not include any explanation outside the JSON.
`;


    // Call Groq

    const completion =
      await groq.chat.completions.create({

        messages: [
          {
            role: "system",
            content:
              "You are PantryChef AI, an expert recipe recommendation assistant.",
          },

          {
            role: "user",
            content: prompt,
          },
        ],

        model: "llama-3.3-70b-versatile",

        temperature: 0.7,

      });


    const text =
      completion.choices[0]
        .message
        .content;


    // Clean response

    const cleanedText =
      text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();


    const recipes =
      JSON.parse(cleanedText);


    return res.status(200).json(recipes);


  } catch (error) {

    console.error(
      "Groq API Error:",
      error
    );


    return res.status(500).json({

      error:
        "Failed to generate recipes",

      details:
        error.message,

    });

  }

}