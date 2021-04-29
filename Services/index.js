const axios = require("axios");

if (!process.env.PORT) {
  require("../Secrets");
}

async function getRecipe(id) {
  const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  try {
    const res = await axios.get(URL);
    const recipes = res.data.meals[0];
    return recipes;
  } catch (error) {

  }
}
module.exports = {
  getRecipe,
};
