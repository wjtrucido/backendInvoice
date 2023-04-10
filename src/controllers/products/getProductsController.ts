import { Request, Response } from 'express';
import { product } from '../../models/productModel'
import { errors } from '../../utils/errors';

export const getproductsController = (req: Request, res: Response) => {
    product
        .find()
        .then((productos) => res.status(200).json({ productos }))
        .catch((error) => res.status(500).json({ error: `${errors.INTERNAL_SERVER_ERROR}` }));
}