const express = require("express");
const userSchema = require("../src/models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createToken = require("../utils/createToken");
const router = express.Router();

router.post("/auth/register", async (req, res) => {
  const { name, email, pass, active, rol } = req.body;
  try {
    let user = await userSchema.findOne({ email });
    if (!user) {
      const newUser = userSchema(req.body);
      newUser
        .save()
        .then((data) => res.json(data))
        .catch((error) => console.log(error));
    } else {
      console.log("el usuario ya existe");
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/auth/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    let user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(403).json({ error: "email not found" });
    }

    const cPassword = await bcrypt.compare(pass, user.pass);

    if (!cPassword) {
      return res.status(403).json({ error: "invalid Password" });
    }

    const { token, expiresIn } = createToken(user._id);

    return res.status(200).json({ messagge: "Login OK", token, expiresIn });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
