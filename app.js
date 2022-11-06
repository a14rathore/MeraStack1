const dotenv = require("dotenv");
const express = require("express");
const app = express();

dotenv.config({ path: "./config.env" });
require("./db/connection");
// const User = require('./model/userSchema')

app.use(express.json());
app.use(require("./router/auth"));

const Port = process.env.PORT;

// Middleware

const middleware = (req, res, next) => {
  console.log("Middleware hello");
  next();
};

/**below app.get no neede because we define router */

// app.get("/", (req, res) => {
//   res.send("<h1>hello World  yes App.js</h1>");
// });

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

app.listen(Port, () => {
  console.log(`server running on ${Port}`);
});
