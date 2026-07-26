import { useState } from "react";
import { getIngredients } from "../services/googleSheet";
import { generateRecipes } from "../services/groq";

export default function AIRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGenerate() {
    setLoading(true);
    setError("");

    try {
      // Get ingredients from Google Sheets
      const pantry = await getIngredients();

      // Extract ingredient names
      const ingredientNames = pantry
        .map((item) => item.Ingredient)
        .filter(Boolean);

      if (ingredientNames.length === 0) {
        setError(
          "Your pantry is empty. Please add some ingredients first."
        );
        return;
      }

      // Generate recipes using Groq AI
      const result = await generateRecipes(ingredientNames);

      setRecipes(result);
    } catch (error) {
      console.error("Error generating recipes:", error);

      setError(
        error.message ||
          "Something went wrong while generating recipes. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto p-8">

        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-green-700">
            AI Recipe Generator
          </h1>

          <p className="text-gray-600 mt-3">
            Let AI turn your pantry ingredients into delicious meals.
          </p>
        </div>

        {/* Generate Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
          >
            {loading ? "Generating Recipes..." : "Generate Recipes"}
          </button>
        </div>

        {/* Loading Message */}
        {loading && (
          <div className="text-center mb-6">
            <p className="text-gray-600">
              👨‍🍳 Our AI chef is preparing your recipes...
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="max-w-xl mx-auto mb-8 bg-red-100 border border-red-300 text-red-700 p-4 rounded-xl text-center">
            {error}
          </div>
        )}

        {/* Recipe Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {recipes.map((recipe, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition"
            >

              {/* Recipe Name */}
              <h2 className="text-2xl font-bold text-green-700">
                {recipe.name}
              </h2>

              {/* Time & Difficulty */}
              <div className="flex gap-4 mt-3 text-gray-600">
                <p>⏱ {recipe.time}</p>
                <p>⭐ {recipe.difficulty}</p>
              </div>

              {/* Ingredients Used */}
              <div className="mt-5">
                <h3 className="font-bold text-gray-800">
                  🥕 Ingredients Used
                </h3>

                <ul className="list-disc ml-5 mt-2 text-gray-600">
                  {recipe.ingredientsUsed?.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Missing Ingredients */}
              <div className="mt-5">
                <h3 className="font-bold text-gray-800">
                  🛒 Missing Ingredients
                </h3>

                {recipe.missingIngredients?.length > 0 ? (
                  <ul className="list-disc ml-5 mt-2 text-red-500">
                    {recipe.missingIngredients.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-green-600 mt-2">
                    ✓ You have everything you need!
                  </p>
                )}
              </div>

              {/* Instructions */}
              <div className="mt-5">
                <h3 className="font-bold text-gray-800">
                  👨‍🍳 Instructions
                </h3>

                <ol className="list-decimal ml-5 mt-2 text-gray-600">
                  {recipe.instructions?.map((step, i) => (
                    <li key={i} className="mb-2">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Waste Reduction Tip */}
              <div className="mt-5 bg-green-50 border border-green-200 p-4 rounded-xl">
                <h3 className="font-bold text-green-700">
                  ♻️ Waste Reduction Tip
                </h3>

                <p className="text-green-800 mt-2">
                  {recipe.wasteTip}
                </p>
              </div>

            </div>
          ))}

        </div>

        {/* Empty State */}
        {!loading && recipes.length === 0 && !error && (
          <div className="text-center mt-12">
            <div className="text-6xl mb-4">
              👨‍🍳
            </div>

            <h2 className="text-2xl font-bold text-gray-700">
              Ready to cook?
            </h2>

            <p className="text-gray-500 mt-2">
              Click "Generate Recipes" and let our AI chef create delicious
              meals from your pantry.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}