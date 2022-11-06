const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("hello World  from the server router.js");
});

router.post("/register", (req, res) => {
  console.log("hello",req.body);
  res.json({ message: req.body });
});

module.exports = router;
