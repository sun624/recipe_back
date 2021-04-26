const express = require("express");
const cors = require("cors");
const{randRecipe} = require("./Utilities");

const app = express();

app.use(cors());

//data from json
app.use(express.json());
//data from form
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}.`);
});

app.get("/index.html", (req, res) => {
    console.log("INside GET")
  //res.send("Success");
  //send back default recipes from API

});
