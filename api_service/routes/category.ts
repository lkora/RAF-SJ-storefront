import express from 'express'

export const categoryRouter = express.Router()

categoryRouter.use(express.json())
categoryRouter.use(express.urlencoded({extended:true}))

// Read
categoryRouter.get('/', async (req, res) => {
    try {
        return res.json("Get all categories")
    } catch(err) {
        console.log(err)
        res.status(500).json({ error: "Error", data: err })
    }
})

categoryRouter.get('/:id', async (req, res) => {
    try {
        return res.json(`Get category with id ${req.params.id}`)
    } catch(err) {
        console.log(err)
        res.status(500).json({ error: "Error", data: err })
    }
})

// Create
categoryRouter.post('/', async (req, res) => {
    try {
        return res.json(`New category entry: ${req.body}`)
    } catch(err) {
        console.log(err)
        res.status(500).json({ error: "Error", data: err })
    }
})

// Update
categoryRouter.put('/:id', async (req, res) => {
    try {
        return res.json(`Data change of category with id=${req.params.id} => to: ${req.body}`)
    } catch(err) {
        console.log(err)
        res.status(500).json({ error: "Error", data: err })
    }
})

// Delete
categoryRouter.delete('/:id', async (req, res) => {
    try {
        return res.json(req.params.id)
    } catch(err) {
        console.log(err)
        res.status(500).json({ error: "Error", data: err })
    }
})
