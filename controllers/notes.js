const express = require("express");
const router = express.Router();

const User = require("../models/user.js");

module.exports = router;

// all users notes page
router.get("/", async (req, res) => {
  const userInDb = await User.findById(req.session.user._id);
  res.render("notes/index.ejs", { notes: userInDb.notes });
});

// new note page
router.get("/new", (req, res) => {
  res.render("notes/new.ejs");
});

// create a new note
router.post("/", async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    user.notes.push(req.body);
    await user.save();
    res.redirect("notes");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});
