export async function generateRecipes(ingredients) {

  try {

    const response = await fetch(
      "/api/recipes",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          ingredients,
        }),

      }
    );


    const data =
      await response.json();


    if (!response.ok) {

      throw new Error(
        data.error ||
        "Failed to generate recipes"
      );

    }


    return data;


  } catch (error) {

    console.error(
      "Recipe generation error:",
      error
    );

    throw error;

  }

}