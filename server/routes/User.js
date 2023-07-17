const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("../verifyToken");

// ======== USER REGISTRATION ===========================
const saltRound = 12;
router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, saltRound);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      sex: req.body.sex,
      phoneNumber: req.body.phoneNumber,
      location: req.body.location,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    const { password, ...otherData } = savedUser._doc;
    res.status(200).json(otherData);
    console.log("User Registered Successfully");
  } catch (error) {
    res.status(500).json({ error });
    console.log(error);
  }
});
// ========= USER LOGIN =======================

router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const inputedPassword = req.body.password;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json("Invalid Credentials");
    } else {
      bcrypt
        .compare(inputedPassword, user.password)
        .then(function (passwordMatch) {
          if (!passwordMatch) {
            return res.status(401).json("Invalid Password");
          } else {
            const access_token = jwt.sign(
              { id: user._id, isAdmin: user.email },
              process.env.jwt_key
            );
            const { password, ...data } = user._doc;
            res.status(200).json({ ...data, access_token });
          }
        });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// ================= UPDATE THE USER ==================

router.put("/:id", verifyToken, async (req, res) => {
  if (req.user.id === req.params.id) {
    if (req.body.password) {
      req.body.password = bcrypt.hash(req.body.password, saltRound);
    }
    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updateUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(403).json("You can update only your account");
  }
});

module.exports = router;
