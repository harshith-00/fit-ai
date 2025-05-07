async function handler({ nix_item_id }) {
  if (!nix_item_id?.trim()) {
    return {
      error: "Please provide a valid item ID",
      food: null,
    };
  }

  try {
    const response = await fetch(
      `https://trackapi.nutritionix.com/v2/search/item?nix_item_id=${encodeURIComponent(
        nix_item_id
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-app-id": process.env.NUTRITIONIX_APP_ID,
          "x-app-key": process.env.NUTRITIONIX_API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (data.foods && data.foods[0]) {
      const food = data.foods[0];
      return {
        food: {
          food_name: food.food_name,
          brand_name: food.brand_name,
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
          nix_item_id: food.nix_item_id,
        },
      };
    }

    return {
      error: "No food found with this item ID",
      food: null,
    };
  } catch (error) {
    console.error("Brand nutrition search error:", error);
    return {
      error: "Failed to fetch nutrition data",
      details: error.message,
      food: null,
    };
  }
}