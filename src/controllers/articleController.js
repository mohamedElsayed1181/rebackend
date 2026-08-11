const addArticle = async (req, res) => {
  try {
    const newArticle = await Article.create(req.body);

    res.status(201).json(newArticle);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};


const editArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!article) {
      return res.status(404).json({
        message: "Article not found",
      });
    }

    res.json(article);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};


const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(
      req.params.id
    );

    if (!article) {
      return res.status(404).json({
        message: "Article not found",
      });
    }

    res.json({
      message: "Article deleted successfully",
      article,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const getArticles = async (req, res) => {
  try {
    // 1. Query params
    const {
      search,
      page = 1,
      limit = 10,
    } = req.query;

    // 2. Dynamic query
    let query = {};

    if (search) {
      query.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          content: {
            $regex: search,
            $options: "i",
          },
        },
        {
          body: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // 3. Pagination
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    const skip = (pageNumber - 1) * limitNumber;

    // 4. Get articles
    const articles = await Article.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNumber);

    // 5. Total
    const total = await Article.countDocuments(query);

    res.json({
      total,
      page: pageNumber,
      totalPages: Math.ceil(total / limitNumber),
      articles,
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};


module.exports = {
  addArticle,
  editArticle,
  deleteArticle,
  getArticles,
};