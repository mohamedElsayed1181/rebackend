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
const categoryRoutes = require("./src/routes/categoryRoutes");
app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/article", articleRoutes);
app.use("/category", categoryRoutes);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT} `);
});
