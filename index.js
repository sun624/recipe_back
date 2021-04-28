const express = require("express");
const cors = require("cors");
const { getRecipe, getRandomFood } = require("./Utilities");
if (!process.env.PORT) {
  require("./Secrets");
}
const MongoClient = require("mongodb").MongoClient;

const app = express();
app.use(cors());
app.use(express.json()); //data from json
app.use(express.urlencoded({ extended: true })); //data from form
/*
  User data structure in MongoDB
  {
    uid: "123456",
    fname: "John",
    lname: "Doe",
    email: "jdoe@example.com"
    Recipes:[   
        {apiRecipes:[ {
                id:"1234"
                title:"example",
                image:"url",
                ingredients:"blah"
                instruction:"blah"
            },{
                ...
            }],
        },
        {ownRecipes:[{
                id:"001",
                ...
            },{
                ...
            }]
        }
        ]
  }
*/

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
    const apiRecipesCollection = db.collection("api-recipes");
    /*
      {
        userid:"123456789",
        apirid:"001",
        title:"abc",
        image:"url",
        steps:"abcdef"
      }
    */
    const userRecipeCollection = db.collection("user-recipes");
    /*
      {
        userid:"123456789",
        ownrid:"001"
        title:"abc",
        image:"url",
        steps:"abcdef"
      }
    */
    const usersCollection = db.collection("users");
    /*
      {
        userid:"123456789",
        fname:"John",
        lname:"Doe",
        email:"john@example.com"
      }
    */

    //app.get random 4 recipes(/* ... */);
    app.get("/index.html", async (req, res) => {
      console.log("INside GET");
      //send back default recipes from API
      const recipe = [];
      for (let i = 0; i < 4; i++) {
        recipe[i] = await getRecipe(getRandomFood());
      }

      res.send(recipe);
    });

    //app.post(/* ... */);
    app.post("/recipes", (req, res) => {
      const { uid, fname, lname, email, title, ingredients, steps } = req.body;

      if (recipesCollections.find({ uid: uid }).toArray()) {
      }

      recipesCollection.insertOne(req.body).then((result) => {
        recipesCollection
          .find()
          .toArray()
          .then((result) => res.send(result));
        console.log(result);
      });
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
