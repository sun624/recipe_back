const express = require("express");
const cors = require("cors");

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

app.post("/", (req, res) => {
  res.json("success");
});
