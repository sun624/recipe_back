

const axios = require("axios");

function randIndex(length){
    return Math.floor(Math.random()*length);
}

function getRandomFood(){

    const foodArray = ["burger","pasta","taco","salads","vegeterian","pizza","wing","sandwich","fries","hotdog"]

    return foodArray[randIndex(foodArray.length)];

}

async function getRecipe(food){
    const foodAPI = `https://api.spoonacular.com/recipes/complexSearch?apiKey=08f2140fd13b45d3a5e5d4ceade3c217&query=${food}&addRecipeInformation=true&instructionsRequired=true`;
   
    const res = await axios(foodAPI);
    const foodCollection = res.data.results;

    return foodCollection[randIndex(foodCollection.length)];



}

module.exports = {
  getRecipe,
  getRandomFood
};