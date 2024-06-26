const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: { type: String, required: true },
  color: {
    type: String,
    enum: ["yellow", "brown", "blue", "pink", "white", "orange"],
    required: true,
  },
});

const noteSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
});

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  notes: [noteSchema],
  categories: [categorySchema],
});

const User = mongoose.model("User", userSchema);
mongoose.model("Category", categorySchema);


module.exports = User;
