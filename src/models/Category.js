const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
      minlength: [3, "Category name must be at least 3 characters long"],
      maxlength: [32, "Category name must be at most 32 characters long"],
    },

    slug: {
      type: String,
      lowercase: true,
      unique: true,
    },

    image: String,
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;