import express from 'express'
export const manufacturerRouter = express.Router()

const { sequelize, Manufacturer} = require("../models");

manufacturerRouter.use(express.json())
manufacturerRouter.use(express.urlencoded({extended:true}))

manufacturerRouter.get('/', async (req, res) => {
    try {
        const items = await Manufacturer.findAll();
        return res.json(items);
    } catch(err) {
        console.log(err)
        res.status(500).json({ error: "Error", data: err })
    }
})

// Get item by ID
manufacturerRouter.get('/:id', async (req, res) => {
    try {
        const item = await Manufacturer.findOne({
            where: { id: req.params.id }
        });
        return res.json(item);
    } catch(err) {
        console.log(err)
        res.status(500).json({ error: "Error", data: err })
    }
})

