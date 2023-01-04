const jwt = require("jsonwebtoken");

const requireToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    //console.log(token);
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
    if (!decoded.uid) throw new Error("Invalid token");
    console.log(decoded);
    next();
  } catch (error) {
    return res.status(403).json({ error: error.message });
  }
};

module.exports = requireToken;
