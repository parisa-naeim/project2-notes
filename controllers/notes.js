const express = require("express");
const router = express.Router();

const User = require("../models/user.js");

module.exports = router;

const getNoteBgColor = (color) => {
  //"yellow", "brown", "blue", "pink", "white", "orange"

  switch (color) {
    case "yellow":
      return "#FFE675";
    case "blue":
      return "#B3DFF5";
    case "brown":
      return "#C2A08C";
    case "pink":
      return "#F6C8C4";
    case "white":
      return "#FFFFFF";
    case "orange":
      return "#F3AF70";
    default:
      return "#FFE675";
  }
};

// all users notes page
router.get("/", async (req, res) => {
  const userInDb = await User.findById(req.session.user._id);

  const groupedNotes = new Map();

  // categorise notes based on their category
  userInDb.notes.forEach((note) => {
    const category = userInDb.categories.filter(
      (c) => c._id.toString() === note.category.toString()
    )[0];
    const key = `${category.name},${category.color}`;
    if (!groupedNotes.get(key)) {
      groupedNotes.set(key, []);
    }
    const notesArr = groupedNotes.get(key);
    notesArr.push(note);
    groupedNotes.set(key, notesArr);
  });

  res.render("notes/index.ejs", {
    notes: groupedNotes,
    getNoteBgColor: getNoteBgColor,
  });
});

// new note page
router.get("/new", async (req, res) => {
  const userInDb = await User.findById(req.session.user._id);
  console.log(userInDb);
  res.render("notes/new.ejs", { categories: userInDb.categories });
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
router.delete("/:id", async (req, res) => {
  try {
    console.log("second log;jdg");
    const user = await User.findById(req.session.user._id);
    const index = user.notes.findIndex((item) => item._id == req.params.id);

    user.notes.splice(index, 1);
    await user.save();

    res.redirect(`/users/${req.session.user._id}/notes`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});
