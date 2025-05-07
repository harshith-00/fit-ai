async function handler({ query }) {
  if (!query?.trim()) {
    return {
      error: "Please provide a food query",
      foods: [],
    };
  }

  try {
    const response = await fetch(
      "https://trackapi.nutritionix.com/v2/natural/nutrients",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-app-id": process.env.NUTRITIONIX_APP_ID,
          "x-app-key": process.env.NUTRITIONIX_API_KEY,
        },
        body: JSON.stringify({
          query: query,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    const foods = data.foods.map((food) => ({
      food_name: food.food_name,
      serving_qty: food.serving_qty,
      serving_unit: food.serving_unit,
      serving_weight_grams: food.serving_weight_grams,
      calories: Math.round(food.nf_calories),
      protein: Math.round(food.nf_protein),
      total_fat: Math.round(food.nf_total_fat),
      total_carbohydrate: Math.round(food.nf_total_carbohydrate),
      fiber: Math.round(food.nf_dietary_fiber),
      sugars: Math.round(food.nf_sugars),
      sodium: Math.round(food.nf_sodium),
      photo: food.photo,
    }));

    return {
      foods,
    };
  } catch (error) {
    console.error("Nutrition search error:", error);
    return {
      error: "Failed to fetch nutrition data",
      details: error.message,
      foods: [],
    };
  }
}