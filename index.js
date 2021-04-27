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
// get homepage with no sign in
app.get("/index.html", async (req, res) => {
  console.log("INside GET");
  //send back default recipes from API
  const recipe = await getRecipe(getRandomFood());
  res.send(recipe);
});

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
