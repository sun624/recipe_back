const axios = require("axios");

// if(!process.env.PORT) {
//   require("../Secrets");
// }


async function getRecipefromMealDB(id) {
  intId = parseInt(id);
  const URL = `www.themealdb.com/api/json/v1/1/lookup.php?i=${intId}`;
  const res = await axios.get(URL);
  const recipes = res.data.meals;

  return recipes[0];
}
module.exports = {
  getRecipe: getRecipefromMealDB,
};
