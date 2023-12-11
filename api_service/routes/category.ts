import express from 'express'
export const categoryRouter = express.Router()

const { sequelize, Category} = require("../models");

categoryRouter.use(express.json())
categoryRouter.use(express.urlencoded({extended:true}))

categoryRouter.get('/', async (req, res) => {
    try {
        const categories = await Category.findAll();
        return res.json(categories);
    } catch(err) {
        console.log(err)
        res.status(500).json({ error: "Error", data: err })
    }
})

// Get item by ID
categoryRouter.get('/:id', async (req, res) => {
    try {
        const category = await Category.findOne({
            where: { id: req.params.id }
        });
        return res.json(category);
    } catch(err) {
        console.log(err)
        res.status(500).json({ error: "Error", data: err })
    }
})

// Create new category
categoryRouter.post('/', async (req, res) => {
    try {
        const newCategory = await Category.create(req.body);
        return res.json(newCategory);
    } catch(err) {
        console.log(err)
        res.status(500).json({ error: "Error", data: err })
    }
})

// Update category
categoryRouter.put('/:id', async (req, res) => {
    try {
        await Category.update(req.body, { where: { id: req.params.id } });
        const updatedCategory = await Category.findOne({
            where: { id: req.params.id },
        });
        return res.json(updatedCategory);
    } catch(err) {
        console.log(err)
        res.status(500).json({ error: "Error", data: err })
    }
})

// Delete category
categoryRouter.delete('/:id', async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (category) {
            await Category.destroy({ where: { id: req.params.id } });
        }
        return res.json({ message: `Category with id ${req.params.id} deleted.` });
    } catch(err) {
        console.log(err)
        res.status(500).json({ error: "Error", data: err })
    }
})
