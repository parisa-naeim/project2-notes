const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const server = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const session = require("express-session");

const authController = require("./controllers/auth.js");
const ensureSignedIn = require("./middleware/ensure-signed-in.js");
const passUserToView = require("./middleware/pass-user-to-view.js");

server.use(express.static("public"));

const port = process.env.PORT ? process.env.PORT : "3000";

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

server.use(express.urlencoded({ extended: false }));
server.use(methodOverride("_method"));
server.use(morgan("dev"));
server.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

server.get("/", (req, res) => {
  res.render("index.ejs", {
    user: req.session.user,
  });
});

server.use(passUserToView);
server.use("/auth", authController);
server.use(ensureSignedIn);

server.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
