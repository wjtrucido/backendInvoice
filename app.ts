import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

import { router as authUsersRoutes } from './src/routes/authUsersRoutes'
import { router as clientsRoutes } from './src/routes/clientsRoutes'
import { router as productsRoutes } from './src/routes/productsRoutes'

dotenv.config()
const URI: string = process.env.MONGODB_URI!
const root = '/api-invoices';
export const app = express();
//DB Connection
mongoose
  .connect(URI)
  .then(() => console.log('** Data base connected **'))
  .catch((err: Error) => console.error(err));

//Middlewars
app.use(cors());
app.use(bodyParser.json());

//Routes
app.use(root, authUsersRoutes);
app.use(root, clientsRoutes);
app.use(root, productsRoutes);