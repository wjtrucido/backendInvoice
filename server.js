"use strict";
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const authUsers = require("./routes/authUsers");
const clientRoutes = require("./routes/clients");
const productRoutes = require("./routes/products");
const port = process.env.PORT || 5000;
const root = "/api";
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("base de datos conectada"))
  .catch((err) => console.log(err));
//Midlewars
app.use(cors());
app.use(bodyParser.json());
//Routes
app.use(root, authUsers);
app.use(root, clientRoutes);
app.use(root, productRoutes);
app.listen(port, console.log("server run on port: ", port));
