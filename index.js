require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("db is connected successfully"))
  .catch((err) => console.log("error is : " + err));
app.use(express.json());
const articleRoutes = require("./src/routes/articleRoutes");

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/home", (req, res) => {
  res.send("please login first to see this page");
});

app.get("/product", (req, res) => {
  res.send("this is product page");
});

app.get("/category", (req, res) => {
  res.send("this is category page");
});

app.use("/article", articleRoutes);



app.post("/addComment/:num1/:num2", (req, res) => {
  const num1 = req.params.num1;
  const num2 = req.params.num2;
  const total = Number(num1) + Number(num2);

  res.send(`the sum of ${total}`);
});

app.post("/addFormInput", (req, res) => {
const input1 = req.body.input1;
const input2 = req.body.input2;

  res.send(" the sum of " + (Number(input1) + Number(input2)));
});


app.post("/sample", (req, res) => {
const age = req.query.age;

  res.send(`this is ${age} years old`);
});
//articles
//add article



app.listen(PORT, () => {
  console.log(`server is running on port ${PORT} `);
});
