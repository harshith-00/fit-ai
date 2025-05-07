async function handler({ query }) {
  if (!query?.trim() || query.trim().length < 3) {
    return {
      error: "Please enter at least 3 characters to search",
      common: [],
      branded: [],
    };
  }

  try {
    const response = await fetch(
      "https://trackapi.nutritionix.com/v2/search/instant",
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

    const uniqueCommonFoods = data.common
      ? Array.from(
          data.common.reduce((map, food) => {
            if (food.tag_id && !map.has(food.tag_id)) {
              map.set(food.tag_id, food);
            }
            return map;
          }, new Map())
        ).map(([_, food]) => food)
      : [];

    const brandedWithCalories = data.branded
      ? data.branded.map((food) => ({
          ...food,
          calories: Math.round(food.nf_calories || 0),
        }))
      : [];

    return {
      common: uniqueCommonFoods,
      branded: brandedWithCalories,
      timestamp: Date.now(),
    };
  } catch (error) {
    return {
      error: "Failed to fetch food data",
      details: error.message,
      common: [],
      branded: [],
    };
  }
}