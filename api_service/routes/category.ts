import express from 'express'
export const categoryRouter = express.Router()

const { sequelize, Category} = require("../models");

categoryRouter.use(express.json())
categoryRouter.use(express.urlencoded({extended:true}))

categoryRouter.get('/', async (req, res) => {
    try {
        const items = await Category.findAll();
        return res.json(items);
    } catch(err) {
        console.log(err)
        res.status(500).json({ error: "Error", data: err })
    }
})

// Get item by ID
categoryRouter.get('/:id', async (req, res) => {
    try {
        const item = await Category.findOne({
            where: { id: req.params.id }
        });
        return res.json(item);
    } catch(err) {
        console.log(err)
        res.status(500).json({ error: "Error", data: err })
    }
})

// Create new item
categoryRouter.post('/', async (req, res) => {
    try {
        const newItem = await Category.create(req.body);
        return res.json(newItem);
    } catch(err) {
        console.log(err)
        res.status(500).json({ error: "Error", data: err })
    }
})

// Update item
categoryRouter.put('/:id', async (req, res) => {
    try {
        await Category.update(req.body, { where: { id: req.params.id } });
        const updatedItem = await Category.findOne({
            where: { id: req.params.id },
        });
        if (req.body.categories) {
            const currentCategories = await updatedItem.getCategories();
            for (let category of currentCategories) {
                await updatedItem.removeCategory(category);
            }
            for (let categoryId of req.body.categories) {
                const category = await Category.findByPk(categoryId);
                if (category) {
                    await updatedItem.addCategory(category);
                }
            }
        }
        return res.json(updatedItem);
    } catch(err) {
        console.log(err)
        res.status(500).json({ error: "Error", data: err })
    }
})

// Delete item
categoryRouter.delete('/:id', async (req, res) => {
    try {
        const item = await Category.findByPk(req.params.id);
        if (item) {
            const categories = await item.getCategories();
            for (let category of categories) {
                await item.removeCategory(category);
            }
            await Category.destroy({ where: { id: req.params.id } });
        }
        return res.json({ message: `Item with id ${req.params.id} deleted.` });
    } catch(err) {
        console.log(err)
        res.status(500).json({ error: "Error", data: err })
    }
})
