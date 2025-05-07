async function handler({ image, analysisType = "foodType" }) {
  const API_KEY = process.env.LOGMEAL_API_KEY;

  if (!image) {
    return { error: "No image provided" };
  }

  try {
    const formData = new FormData();
    const base64Response = await fetch(image);
    const blob = await base64Response.blob();
    const imageFile = new File([blob], "image.jpg", { type: "image/jpeg" });
    formData.append("image", imageFile);

    const endpoints = {
      foodType: "https://api.logmeal.com/v2/image/recognition/type",
      foodGroup: "https://api.logmeal.com/v2/image/segmentation/complete",
      dishes: "https://api.logmeal.com/v2/image/segmentation/complete",
      ingredients: "https://api.logmeal.com/v2/recipe/ingredients",
      nutrition: "https://api.logmeal.com/v2/recipe/nutritionalInfo",
    };

    // First, get image segmentation for ingredients and nutrition
    let imageId;
    if (analysisType === "ingredients" || analysisType === "nutrition") {
      const segResponse = await fetch(endpoints.foodGroup, {
        method: "POST",
        headers: { Authorization: `Bearer ${API_KEY}` },
        body: formData,
      });

      if (!segResponse.ok) {
        throw new Error(`Segmentation failed: ${segResponse.statusText}`);
      }

      const segResult = await segResponse.json();
      imageId = segResult.imageId;

      const secondResponse = await fetch(endpoints[analysisType], {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageId }),
      });

      if (!secondResponse.ok) {
        throw new Error(
          `${analysisType} analysis failed: ${secondResponse.statusText}`
        );
      }

      return secondResponse.json();
    }

    // For other analysis types
    const endpoint = endpoints[analysisType] || endpoints.foodType;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { Authorization: `Bearer ${API_KEY}` },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Analysis failed: ${response.statusText}`);
    }

    const result = await response.json();

    switch (analysisType) {
      case "foodGroup":
        return { foodFamily: result.foodFamily };
      case "dishes":
        return { dishes: result.segmentation_results };
      default:
        return result;
    }
  } catch (error) {
    return { error: error.message };
  }
}