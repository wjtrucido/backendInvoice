const express = require("express");
const userSchema = require("../src/models/user");
const jwt = require("jsonwebtoken");
const createToken = require("../utils/createToken");
const router = express.Router();

router.post("/auth/register", async (req, res) => {
  const { name, email, pass, active, rol } = req.body;
  try {
    let user = await userSchema.findOne({ email });
    if (!user) {
      const newUser = userSchema({ name, email, pass, active, rol });
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
    if (user.pass != pass) {
      return res.status(403).json({ error: "invalid password" });
    }

    //const privateKey = fs.readFileSync("keykey");
    //const token = jwt.sign({ uid: user._id }, privateKey);
    //console.log(token);
    const token = createToken(user._id);

    return res.status(200).json({ messagge: "Login OK", token });
  } catch (error) {
    console.log(error);
  }
  //Do the token

  //Send de token
});
module.exports = router;
