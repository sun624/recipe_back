const express = require("express");
const cors = require("cors");
const { getRecipe, getRandomFood } = require("./Utilities");

const app = express();
const MongoClient = require("mongodb").MongoClient;

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

app.use(cors());

//data from json
app.use(express.json());
//data from form
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}.`);
});

app.post("/", (req, res) => {
  res.json("success");
});

const connectionString =
  "mongodb+srv://RecipeAdmin:YPMR_42621@recipe.y3yjb.mongodb.net/RECIPE-FINDER?retryWrites=true&w=majority";

MongoClient.connect(
  connectionString,
  {
    useUnifiedTopology: true,
  },
  (err, client) => {
    if (err) return console.error(err);
    console.log("Connected to Database");
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
app.get("/index/profile", async (req, res) => {
  console.log("Inside Get");
  //return user specific recipe from database
  const {id} = req.body;
  recipesCollection
    .find({uid:id})
    .toArray()
    .then((result) => {
      res.send(result.recipes);
    });
});
