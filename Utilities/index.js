const foodAPI = "http://www.recipepuppy.com/api/";
const foodAPI_query = "?i=onions,garlic&q=omelet&p=1";

function getRandomFood(){

    const foodArray = ["burger","pasta","taco","salads","vegeterian","pizza","wing","sandwich","fries","hotdog"]

    const randIdx = Math.floor(Math.random()*recipeArray.length);

    return foodArray[randIdx];

}

function getRecipe(food){
    
}

module.exports ={
    getRandomRecipe:randRecipe
}