const express = require('express')
const clientSchema = require("../src/models/client")
const router = express.Router()

router.get('/listClient', (req, res) => {
    clientSchema
        .find()
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }))
    /*    
    [{ "id": 0, Nombre: "Matias", Apellido: "Trucido", Telefono: "098123456", Direccion: "Berro 573", Ciudad: "Florida", Pais: "Uruguay" }]
    */
})

router.post("/createClient", (req, res) => {
    const client = clientSchema(req.body)
    client.save()
        .then((data) => res.json(data))
        .catch((error) => console.log(error))
})

router.delete("/deleteClient/:id", (req, res) => {
    const id = req.params.id
    clientSchema
        .remove({ _id: id })
        .then(res => res.json())
        .catch(err => res.json({ message: err }))
})

//implement update
router.put("/updateClient/:id", async (req, res) => {
    const id = req.params.id
    const update = req.body
    await clientSchema
        .updateOne({ _id: id }, update)
        .then(data => res.json(data))
        .catch(err => res.json({ message: err }))
})

module.exports = router