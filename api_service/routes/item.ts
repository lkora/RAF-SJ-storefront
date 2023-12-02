import express from 'express'

export const itemRouter = express.Router()

itemRouter.use(express.json())
itemRouter.use(express.urlencoded({extended:true}))

// Read
itemRouter.get('/', async (req, res) => {
    try {
        return res.json("Get all items")
    } catch(err) {
        console.log(err)
        res.status(500).json({ error: "Error", data: err })
    }
})

itemRouter.get('/:id', async (req, res) => {
    try {
        return res.json(`Get item with id ${req.params.id}`)
    } catch(err) {
        console.log(err)
        res.status(500).json({ error: "Error", data: err })
    }
})

// Create
itemRouter.post('/', async (req, res) => {
    try {
        return res.json(`New item entry: ${req.body}`)
    } catch(err) {
        console.log(err)
        res.status(500).json({ error: "Error", data: err })
    }
})

// Update
itemRouter.put('/:id', async (req, res) => {
    try {
        return res.json(`Data change of item with id=${req.params.id} => to: ${req.body}`)
    } catch(err) {
        console.log(err)
        res.status(500).json({ error: "Error", data: err })
    }
})

// Delete
itemRouter.delete('/:id', async (req, res) => {
    try {
        return res.json(req.params.id)
    } catch(err) {
        console.log(err)
        res.status(500).json({ error: "Error", data: err })
    }
})

