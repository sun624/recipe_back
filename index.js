const express = require("express");
const cors = require("cors");
const { getRecipe} = require("./Services");
const MongoClient = require("mongodb").MongoClient;
const app = express();

if (!process.env.PORT) {
  require("./Secrets");
}

const connectionString = process.env.MONGODB_KEY;
MongoClient.connect(
  connectionString,
  {
    useUnifiedTopology: true,
  },
  (err, client) => {
    console.log("connect to Database");

    app.use(cors());
    app.use(express.json()); //data from json
    app.use(express.urlencoded({ extended: true })); //data from form

    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`Server is listening on ${PORT}.`);
    });

    const recipeColletion = client.db("recipes").collection("recipes-favs");

    //GET /
    app.get("/", (req, res) => {
      console.log("Inside Get");
      const { email } = req.query;

      //find specific user recipes
      recipeColletion
        .find({ email: email })
        .toArray()
        .then((result) => {
          res.send(result);
        });
    });

    //POST /
    app.post("/", async (req, res) => {
      const { email, mealId } = req.body;

      const newRecipe = {
        email: email,
        mealId: mealId,
        recipe: await getRecipe(mealId),
      };

      //if it is new recipe for this user, add into database
  
        recipeColletion.insertOne(newRecipe);

        res.send({ status: "Added Successfully" });
      
    });

    //PUT / :UPDATE operation
    app.put("/", async (req, res) => {
      const { email, mealId, recipe } = req.body;

      if (email || mealId || recipe) {
        recipeColletion
          .findOneAndUpdate(
            { mealId: mealId, email: email },
            {
              $set: {
                email: email,
                mealId: mealId,
                recipe: recipe,
              },
            },
            { returnOriginal: false }
          )
          .then(() =>
            recipeColletion
              .find({ email: email })
              .toArray()
              .then((result) => {
                res.send(result);
              })
          );
      }
    });

    //DELETE
    app.delete("/", (req, res) => {
      const { email, mealId } = req.body;

      recipeColletion.deleteOne({ email: email, mealId: mealId }).then(() =>
        recipeColletion
          .find({ email: email })
          .toArray()
          .then((result) => res.send(result))
      );
    });
  }
);
