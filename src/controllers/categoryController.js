const Category = require("../models/Category");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const createCategory = asyncHandler(async (req, res) => {
  const { name, image } = req.body;

  const newCategory = await Category.create({
    name,
    slug: slugify(name, {
      lower: true,
      strict: true,
    }),
    image,
  });

  res.status(201).json(newCategory);
});

const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

const deleteCategory=asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) {
    return res.status(404).json({
      message: "Category not found",
    });
  }
  res.json({
    message: "Category deleted successfully",
    category,
  });
});


 const updateCategory=asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!category) {
    return res.status(404).json({
      message: "Category not found",
    });
  }
  res.json({
    message: "Category updated successfully",
    category,
  });
});





module.exports = {
  createCategory,
  getAllCategories,
  deleteCategory,
  updateCategory
};
