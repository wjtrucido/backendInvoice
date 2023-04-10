import mongoose, { Document } from 'mongoose'

export interface Client extends Document {
    name: string,
    surname: string,
    address: string,
    phone: string,
    city: string,
    country: string
}
const clientSchema = new mongoose.Schema<Client>({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
})
export const client = mongoose.model<Client>('Client', clientSchema)