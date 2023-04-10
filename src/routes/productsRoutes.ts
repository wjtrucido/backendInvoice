import { Request, Response, Router } from 'express'

import { requireToken } from '../middleware/requireToken'
import { product } from '../models/productModel'
import { errors } from '../utils/errors';

import { getproductsController } from '../controllers/products/getProductsController';

export const router = Router();
// requireToken, 
router.get("/products", getproductsController);

router.post("/products", (req, res) => {
  new product(req.body)
    .save()
    .then((product) => {
      throw new Error();
      //res.status(201).json({ ok: `The product ${product.id} was successfully created` })

    })
    .catch((error) => res.status(500).json({ error: `${errors.INTERNAL_SERVER_ERROR.message}` }));
});