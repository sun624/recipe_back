const express = require("express");
const cors = require("cors");
const { getRecipe, getRandomFood, getId, getPhoto } = require("./Utilities");
if (!process.env.PORT) {
  require("./Secrets");
}
const MongoClient = require("mongodb").MongoClient;

const app = express();
app.use(cors());
app.use(express.json()); //data from json
app.use(express.urlencoded({ extended: true })); //data from form
app.use(express.static("public"));

const path = require("path");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/auth.html"));
});

const PORT = process.env.PORT || 3000;
const connectionString = `${process.env.MONGODB_KEY}`;

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
    const recipeColletion = client.db("recipes").collection("recipes-favs");

    //GET / best practice is to use query parameters
    app.get("/", (req, res) => {
      console.log("Inside Get");
      const { email } = req.body;
      recipeColletion
        .find({ email: email })
        .toArray()
        .then((result) => {
          res.send(result);
        });
    });

    //POST /
    app.post("/", async (req, res) => {
      console.log(req.body);
      const { email, uid, recipe } = req.body;

      if (!email || !recipe) {
        return res.status(400).json({ error: "email and recipe are required" });
      }

      const newRecipe = {
        email,
        uid: getUID(),
        recipe,
      };
      recipeColletion.insertOne(newRecipe);

      res.send("sccuess");
    });

    //app.PUT update current recipes
    app.put("/recipes", async (req, res) => {
      const { isApiRecipe, uid, title, ingredients, steps } = req.body;

      if (isApiRecipe) {
        apiRecipesCollection
          .findOneAndUpdate(
            { uid: uid },
            {
              $set: {
                uid: uid,
                title: title,
                image: await getPhoto(title, ingredients),
                ingredients: ingredients,
                steps: steps,
              },
            },
            { returnNewDocument: true }
          )
          .then((result) => {
            res.send(result);
          });
      } else {
        userRecipeCollection
          .findOneAndUpdate(
            { uid: uid },
            {
              $set: {
                uid: uid,
                title: title,
                ingredients: ingredients,
                image: await getPhoto(title, ingredients),
                steps: steps,
              },
            },
            { returnNewDocument: true }
          )
          .then((result) => {
            res.send(result);
          });
      }
    });

    app.delete("/recipes", (req, res) => {
      const { uid } = req.body;
      recipesCollection.deleteOne({ uid: uid }).then((result) => {
        res.send(result.recipes);
      });
    });
  }
);

// get homepage with no sign in

//get homepage with sign in
app.get("/index/profile", (req, res) => {
  console.log("Inside Get");
  //return user specific recipe from database
  const { id } = req.body;
  recipesCollection
    .find({ uid: id })
    .toArray()
    .then((result) => {
      res.send(result.recipes);
    });
});
