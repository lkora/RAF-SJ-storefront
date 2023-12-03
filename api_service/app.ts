import express from 'express'
import { router } from './routes/routes'

const restConstants: RestConstants = {
    httpPort: 9000,
};
const app = express()
const { sequelize, Item, Category, ItemCategory, ItemOrder, Manufacturer, Order, OrderStatus } = require("./models")

// -- Load REST routes --
app.use('/', router)


app.listen(restConstants.httpPort, async () => {
    console.log(`Express is listening at http://localhost:${restConstants.httpPort}`)
    await sequelize.sync({force:true})
	console.log("DB synced")
})
