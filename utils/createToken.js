const jwt = require("jsonwebtoken");
const privateKey = process.env.PRIVATE_KEY;
const expiresIn = 60 * 5;

const generateToken = (id) => {
  try {
    const token = jwt.sign({ uid: id }, privateKey, { expiresIn });
    console.log(token);
    return { token, expiresIn };
  } catch (error) {
    console.log(error);
  }
};

module.exports = generateToken;
