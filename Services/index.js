const axios = require("axios");

if (!process.env.PORT) {
  require("../Secrets");
}

async function getRecipe(id) {
  const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  console.log(URL);
  try {
    const res = await axios.get(URL);
    const recipes = res.data.meals;
    return recipes[0];
  } catch (error) {

  }
}
module.exports = {
  getRecipe,
};
