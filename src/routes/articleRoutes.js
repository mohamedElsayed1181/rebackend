const express = require("express");

const router = express.Router();

const {
  addArticle,
  editArticle,
  deleteArticle,
  getArticles,
} = require("../controllers/articleController");



router.post("/article", addArticle);

router.put("/article/:id", editArticle);

router.delete("/article/:id", deleteArticle);

router.get("/", getArticles);


module.exports = router;