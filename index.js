const express = require("express");
const cors = require("cors");
const { getRecipe, getRandomFood } = require("./Utilities");
const MongoClient = require("mongodb").MongoClient;

const app = express();
app.use(cors()); //data from json
app.use(express.json()); //data from form
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;
const connectionString =
  "mongodb+srv://RecipeAdmin:YPMR_42621@recipe.y3yjb.mongodb.net/RECIPE-FINDER?retryWrites=true&w=majority";

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}.`);
});

MongoClient.connect(
  connectionString,
  { useUnifiedTopology: true },
  (err, client) => {
    if (err) return console.error(err);
    console.log("Connected to Database");
    const db = client.db("recipe-finder");
    const recipesCollection = db.collection("recipes");
    //app.use(/* ... */);
    //app.get(/* ... */);

    app.post("/recipes", (req, res) => {
      recipesCollection.insertOne(req.body).then((result) => {
        recipesCollection
          .find()
          .toArray()
          .then((result) => res.send(result));
        console.log(result);
      });
    });
  }
);

app.get("/index.html", async (req, res) => {
  console.log("INside GET");
  //send back default recipes from API
  const recipe = await getRecipe(getRandomFood());
  res.send(recipe);
});
