import { Router } from 'express'

import { requireToken } from '../middleware/requireToken'

import { getproductsController } from '../controllers/products/getProductsController'
import { postProductsController } from '../controllers/products/postProductsController'

export const router = Router()
// requireToken,
router.get("/products", getproductsController)

router.post("/products", postProductsController)