import { Request, Response, Router } from 'express'
import { client } from '../models/clientModel'

export const router = Router()

router.get('/clients', (req, res) => {
    client
        .find()
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }))
})

router.post("/clients", (req, res) => {
    new client(req.body)
        .save()
        .then((data) => res.json(data))
        .catch((error) => console.log(error))
})

router.delete("/clients/:id", (req, res) => {
    const id = req.params.id
    client
        .remove({ _id: id })
        .then(res => res.json())
        .catch(err => res.json({ message: err }))
})

router.put("/clients/:id", async (req, res) => {
    const id = req.params.id
    const update = req.body
    await client
        .updateOne({ _id: id }, update)
        .then(data => res.json(data))
        .catch(err => res.json({ message: err }))
})