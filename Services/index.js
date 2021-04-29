const axios = require("axios");

if (!process.env.PORT) {
  require("../Secrets");
}

async function getRecipe(id) {
  const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  console.log(URL);
  try {
    console.log("before axios");
    const res = await axios.get(URL);
    console.log("after axios");
    const recipes = res.data.meals;
    return recipes;
  } catch (error) {

  }
}
module.exports = {
  getRecipe,
};
