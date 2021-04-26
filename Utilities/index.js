

const axios = require("axios");

function randIndex(length){
    return Math.floor(Math.random()*length);
}

function getRandomFood(){

    const foodArray = ["burger","pasta","taco","salads","vegeterian","pizza","wing","sandwich","fries","hotdog"]

    return foodArray[randIndex(foodArray.length)];

}

async function getRecipe(food){
    const foodAPI =`http://www.recipepuppy.com/api/?q=${food}&p=1`;
   
    const res = await axios(foodAPI);
    const foodCollection = res.data.results;

    return foodCollection[randIndex(foodCollection.length)];



}

module.exports = {
  getRecipe,
  getRandomFood
};