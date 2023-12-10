import express from 'express'
export const itemRouter = express.Router()

const { sequelize, Item, Manufacturer, Category, ItemCategory} = require("../models");

itemRouter.use(express.json())
itemRouter.use(express.urlencoded({extended:true}))

// Read
itemRouter.get('/', async (req, res) => {
    try {
        const items = await Item.findAll({
            include: [
                { model: Manufacturer, as: 'manufacturer' },
                { model: Category, through: ItemCategory, as: 'categories' }
            ]
            });
        return res.json(items);
    } catch(err) {
        console.log(err)
        res.status(500).json({ error: "Error", data: err })
    }
})

// Get item by ID
itemRouter.get('/:id', async (req, res) => {
    try {
        const item = await Item.findOne({
            where: { id: req.params.id },
            include: [
                { model: Manufacturer, as: 'manufacturer' },
                { model: Category, through: ItemCategory, as: 'categories' }
            ]
        });
        return res.json(item);
    } catch(err) {
        console.log(err)
        res.status(500).json({ error: "Error", data: err })
    }
})

// Create new item
itemRouter.post('/', async (req, res) => {
    try {
        const newItem = await Item.create(req.body);
        if (req.body.categories) {
            await newItem.setCategories(req.body.categories);
        }
        return res.json(newItem);
    } catch(err) {
        console.log(err)
        res.status(500).json({ error: "Error", data: err })
    }
})

// Update item
itemRouter.put('/:id', async (req, res) => {
    try {
        const item = await Item.findByPk(req.params.id);
        if (!item) {
            return res.status(404).json({ error: "Item not found" });
        }

        // Update item fields
        for (let key in req.body) {
            if (key !== 'categories' && item[key] !== undefined) {
                item[key] = req.body[key];
            }
        }
        await item.save();

        // Update categories
        if (req.body.categories) {
            await item.setCategories(req.body.categories);
        }

        const updatedItem = await Item.findOne({
            where: { id: req.params.id },
            include: [
                { model: Manufacturer, as: 'manufacturer' },
                { model: Category, through: ItemCategory, as: 'categories' }
            ]
        });

        return res.json(updatedItem);
    } catch(err) {
        console.log(err)
        res.status(500).json({ error: "Error", data: err })
    }
});

// Delete item
itemRouter.delete('/:id', async (req, res) => {
    try {
        await Item.destroy({ where: { id: req.params.id } });
        return res.json({ message: `Item with id ${req.params.id} deleted.` });
    } catch(err) {
        console.log(err)
        res.status(500).json({ error: "Error", data: err })
    }
})

