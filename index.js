const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
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

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT} `);
});
