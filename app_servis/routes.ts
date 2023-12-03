import express from 'express'
import codes from 'http-status-codes'
import fs from 'fs'

import bodyParser from 'body-parser'

import { newItem } from './schemas'

const router = express.Router()
const itemsFile = './entities/items.json'


// --- ROUTES ---
// New Item
router.use('/item', bodyParser.urlencoded({ extended: false }))
router.post('/item', (req, res) => {
    const formData = req.body
    const { error, value } = newItem.validate(formData)

    if (error) {
        res.status(codes.UNPROCESSABLE_ENTITY)
            .json({ error: error.details.map((detail) => detail.message) })
    } else {
        if (fs.existsSync(itemsFile)) {
            let items = []

            fs.readFile(itemsFile, 'utf8', (readError, data) => {
                if (readError) {
                    res.json({ error: readError })
                } else {
                    items = data ? JSON.parse(data) : []
                    items.push(formData)

                    writeItemsToFile(itemsFile, items, value, res)
                }
            })
        } else {
            writeItemsToFile(itemsFile, [value], value, res)
        }
    }

    function writeItemsToFile(itemsFile: string, items: any[], value: any, res: any) {
        fs.writeFile(itemsFile, JSON.stringify(items), (writeError) => {
            if (writeError) {
                res.json({ error: writeError })
            } else {
                res.json({ success: 'New item has been saved', data: value })
            }
        })
    }
    
})

// Catalog
router.get('/items', (req, res) => {
    fs.readFile(itemsFile, 'utf8', (error, data) => {
        if (error) {
            res.status(codes.INTERNAL_SERVER_ERROR).json({ error: 'Unable to read items data' });
        } else {
            const items = JSON.parse(data);

            // Send the items as a JSON response
            res.json({ success: 'Items retrieved successfully', data: items });
        }
    });
});


export { router }
