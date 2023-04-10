import mongoose, { Document } from 'mongoose'

export interface Product extends Document {
    code: string,
    description: string,
    brand: string,
    category: string,
    measurement_unit: string,
    purchase_price: number;
    sale_price: number,
    tax: number
}

const productSchema = new mongoose.Schema<Product>({
    code: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    measurement_unit: {
        type: String
    },
    purchase_price: {
        type: Number
    },
    sale_price: {
        type: Number
    },
    tax: {
        type: Number
    }
})
export const product = mongoose.model('Product', productSchema)