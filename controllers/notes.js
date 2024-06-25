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

// update
router.put("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    const index = user.notes.findIndex((item) => item._id == req.params.id);
    user.notes[index].title = req.body.title;
    user.notes[index].content = req.body.content;
    await user.save();
    res.redirect(`/users/${req.session.user._id}/notes`);
  } catch (error) {
    console.log(error);
    res.redirect(`/users/${req.session.user._id}/notes`);
  }
});

// delete
console.log("first log");
router.delete("/:id", async (req, res) => {
  try {
    console.log("second log;jdg");
    const user = await User.findById(req.session.user._id);
    const index = user.notes.findIndex((item) => item._id == req.params.id);
    console.log(index);
    // user.notes[index].title = req.body.title;
    // user.notes[index].content = req.body.content;
    console.log(user);
    user.notes.splice(index, 0);
    await user.save();
    res.redirect(`/users/${req.session.user._id}/notes`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});
