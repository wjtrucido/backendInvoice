import { Request, Response } from 'express'
import { product } from '../../models/productModel'
import { errors } from '../../utils/errors'

export const postProductsController = (req: Request, res: Response) => {
    new product(req.body)
        .save()
        .then((product) => {
            res.status(201).json({ ok: `The product ${product.id} was successfully created` })
        })
        .catch((error) => res.status(500).json({ error: `${errors.INTERNAL_SERVER_ERROR.message}` }));
}