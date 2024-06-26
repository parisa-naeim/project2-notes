const express = require("express");
const { getNoteBgColor } = require("../helper/helper.js");

const router = express.Router();

const User = require("../models/user.js");

module.exports = router;

// index
router.get("/", async (req, res) => {
  const colorEnumValues = User.schema
  .path("categories")
  .schema.path("color").enumValues;

  const userInDb = await User.findById(req.session.user._id);

  res.render("categories/index.ejs", {
    categories: userInDb.categories,
    getNoteBgColor: getNoteBgColor,
    colorsEnum: colorEnumValues
  });
});

// new
router.get("/new", (req, res) => {
  const colorEnumValues = User.schema
    .path("categories")
    .schema.path("color").enumValues;

  res.render("categories/new.ejs", { colorsEnum: colorEnumValues });
});

// create
router.post("/", async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    user.categories.push(req.body);
    await user.save();
    res.redirect("categories");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// update
router.put("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    const index = user.categories.findIndex(
      (item) => item._id == req.params.id
    );
    user.categories[index].name = req.body.name;
    user.categories[index].color = req.body.color;
    await user.save();
    res.redirect(`/users/${req.session.user._id}/categories`);
  } catch (error) {
    console.log(error);
    res.redirect(`/users/${req.session.user._id}/categories`);
  }
});

// delete
router.delete("/:id", async (req, res) => {
  try {
    console.log("second log;jdg");
    const user = await User.findById(req.session.user._id);
    const index = user.categories.findIndex(
      (item) => item._id == req.params.id
    );

    user.categories.splice(index, 1);
    await user.save();

    res.redirect(`/users/${req.session.user._id}/categories`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});
