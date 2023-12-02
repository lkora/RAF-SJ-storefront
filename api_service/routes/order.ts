import express from 'express'

export const orderRouter = express.Router()

orderRouter.use(express.json())
orderRouter.use(express.urlencoded({extended:true}))

// Read
orderRouter.get('/', async (req, res) => {
    try {
        return res.json("Get all orders")
    } catch(err) {
        console.log(err)
        res.status(500).json({ error: "Error", data: err })
    }
})

orderRouter.get('/:id', async (req, res) => {
    try {
        return res.json(`Get order with id ${req.params.id}`)
    } catch(err) {
        console.log(err)
        res.status(500).json({ error: "Error", data: err })
    }
})

// Create
orderRouter.post('/', async (req, res) => {
    try {
        return res.json(`New order entry: ${req.body}`)
    } catch(err) {
        console.log(err)
        res.status(500).json({ error: "Error", data: err })
    }
})

// Update
orderRouter.put('/:id', async (req, res) => {
    try {
        return res.json(`Data change of order with id=${req.params.id} => to: ${req.body}`)
    } catch(err) {
        console.log(err)
        res.status(500).json({ error: "Error", data: err })
    }
})

// Delete
orderRouter.delete('/:id', async (req, res) => {
    try {
        return res.json(req.params.id)
    } catch(err) {
        console.log(err)
        res.status(500).json({ error: "Error", data: err })
    }
})
