const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE;

mongoose
  .connect(DB)
  .then(() => {
    console.log("Connection Succesful");
  })
  .catch((err) => {
    console.log("Hellerror", err);
  });

// Middleware

const middleware = (req, res, next) => {
  console.log("Middleware hello");
  next();
};

app.get("/", (req, res) => {
  res.send("<h1>0hello World  yes</h1>");
});

app.get("/about", middleware, (req, res) => {
  res.send("Hello About");
});

app.get("/contact", (req, res) => {
  res.send("Hello Contact");
});

app.get("/signin", (req, res) => {
  res.send("Hello SignIn");
});

app.get("/signup", (req, res) => {
  res.send("Hello Signup");
});

app.listen(3000, () => {
  console.log("server running");
});
