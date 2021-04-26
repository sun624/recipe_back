const express = require("express");
const cors = require("cors");

const app = express();
const MongoClient = require("mongodb").MongoClient;

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
