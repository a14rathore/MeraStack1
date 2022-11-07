const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

require("../db/connection");
const User = require("../model/userSchema");

router.get("/", (req, res) => {
  res.send("hello World  from the server router.js");
});

/** using promises */

// router.post("/register",(req, res) => {
//   const { name, email, phone, work, password, cpassword } = req.body;

//   if (!name || !email || !phone || !work || !password || !cpassword) {
//     return res.status(422).json({ error: "Plaese Fill mandetory field" });
//   }

//   User.findOne({ email: email })
//     .then((userExist) => {
//       if (userExist) {
//         return res.status(422).json({ error: "Email already Exist" });
//       }

//       const user = new User({ name, email, phone, work, password, cpassword });

//       user
//         .save()
//         .then(() => {
//           res.status(201).json({ message: "user registered successfully" });
//         })
//         .catch((err) => res.status(500).json({ error: "Failed to register" }));
//     })
//     .catch((err) => console.log(err));
// });

/** using async await */
router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "Plaese Fill mandetory field" });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Email already Exist" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "Password are not matched" });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword });
      await user.save();
      res.status(201).json({ message: "user registered successfully" });
    }
  } catch (error) {
    console.log(error);
  }
});

/**Login route */
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please fill the data" });
    }

    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(await password, await userLogin.password);
      if (isMatch) {
        res.status(200).json({ message: "User Signin Successfully" });
      } else {
        res.status(400).json({ error: "Invaild Credential" });
      }
    } else {
      res.status(400).json({ error: "User not found" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
