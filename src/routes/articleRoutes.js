const express = require("express");

const router = express.Router();

const {
  addArticle,
  editArticle,
  deleteArticle,
  getArticles,
} = require("../controllers/articleController");

router.post("/", addArticle);

router.put("/:id", editArticle);

router.delete("/:id", deleteArticle);

router.get("/", getArticles);

module.exports = router;