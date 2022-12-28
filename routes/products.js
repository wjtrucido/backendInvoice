const express = require("express");
const requireToken = require("../middleware/requireToken");
const productSchema = require("../src/models/product");
const router = express.Router();

//list products
router.get("/listProduct", requireToken, (req, res) => {
  productSchema
    .find()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});

router.post("/createProduct", (req, res) => {
  const product = productSchema(req.body);
  product
    .save()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});

module.exports = router;
