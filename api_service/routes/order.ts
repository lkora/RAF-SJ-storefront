import express from 'express'
const { sequelize, Order, ItemOrder, Item, OrderStatus } = require("../models");

export const orderRouter = express.Router()

orderRouter.use(express.json())
orderRouter.use(express.urlencoded({extended:true}))

// Read all orders
orderRouter.get('/', async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [
                {
                    model: Item,
                    as: 'items',
                    through: { attributes: ['quantity'] }
                },
                {
                    model: OrderStatus,
                    as: 'status'
                }
            ]
        });
        return res.json(orders);
    } catch(err) {
        console.log(err)
        res.status(500).json({ error: "Error", data: err })
    }
})

// Read order by ID
orderRouter.get('/:id', async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id, {
            include: [
                {
                    model: Item,
                    as: 'items',
                    through: { attributes: ['quantity'] }
                },
                {
                    model: OrderStatus,
                    as: 'status'
                }
            ]
        });
        return res.json(order);
    } catch(err) {
        console.log(err)
        res.status(500).json({ error: "Error", data: err })
    }
})

// Create new order
orderRouter.post('/', async (req, res) => {
    try {
        const { items, address } = req.body; // items is an array of { id, quantity }

        const orderItems = await Promise.all(items.map(async ({ id, quantity }: { id: number, quantity: number }) => {
            const item = await Item.findByPk(id);
            return {
                item,
                quantity,
                price: item.price * quantity
            };
        }));        

        const totalPrice = orderItems.reduce((sum, { price }) => sum + price, 0);

        const newOrder = await Order.create({
            status: 1,
            address,
            totalPrice,
            orderedAt: new Date()
        });

        await Promise.all(orderItems.map(({ item, quantity }) => {
            return ItemOrder.create({
                orderId: newOrder.id,
                itemId: item.id,
                quantity
            });
        }));

        return res.json(newOrder);
    } catch(err) {
        console.log(err)
        res.status(500).json({ error: "Error", data: err })
    }
})

// Update order
orderRouter.put('/:id', async (req, res) => {
    try {
        const { status } = req.body;
        await Order.update({ status }, { where: { id: req.params.id } });
        const updatedOrder = await Order.findByPk(req.params.id);
        return res.json(updatedOrder);
    } catch(err) {
        console.log(err)
        res.status(500).json({ error: "Error", data: err })
    }
})

// Delete order
orderRouter.delete('/:id', async (req, res) => {
    try {
        await Order.destroy({ where: { id: req.params.id } });
        return res.json({ message: `Order with id ${req.params.id} deleted.` });
    } catch(err) {
        console.log(err)
        res.status(500).json({ error: "Error", data: err })
    }
})
