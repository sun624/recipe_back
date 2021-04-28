const axios = require("axios");



if (!process.env.PORT) {
  require("../Secrets");
}

function getId() {
  let uid = "";
  for (let i = 0; i < 6; i++) {
    const rand = Math.floor(Math.random() * 10);
    uid += rand;
  }

  return uid;
}

async function getPhoto(food,ingredients) {
  const foodAPI = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.SPOONACULER_API_KEY}&query=${food}&ingredients=${ingredients}&addRecipeInformation=true&instructionsRequired=true`;
  const res = await axios.get(foodAPI);
  const photo = res.data.results;

  return photo[0].image;
}

function randIndex(length) {
  return Math.floor(Math.random() * length);
}

function getRandomFood() {
  const foodArray = [
    "burger",
    "pasta",
    "taco",
    "salads",
    "vegeterian",
    "pizza",
    "sushi",
    "sandwich",
    "fries",
    "hotdog",
  ];

  return foodArray[randIndex(foodArray.length)];
}

async function getRecipe(food) {
 
  const foodAPI = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.SPOONACULER_API_KEY}&query=${food}&addRecipeInformation=true&instructionsRequired=true`;
  const res = await axios.get(foodAPI);
  const foodCollection = res.data.results;

  return foodCollection[randIndex(foodCollection.length)];
}

module.exports = {
  getRecipe,
  getRandomFood,
  getId,
  getPhoto
};
