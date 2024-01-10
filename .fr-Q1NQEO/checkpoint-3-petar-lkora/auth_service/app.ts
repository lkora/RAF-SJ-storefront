import express from 'express'
import { router } from './routes/routes'
import { RestConstants } from './rest-constants';
require('dotenv').config();

const restConstants: RestConstants = {
    httpPort: 9001,
};
const app = express()
const { sequelize, User } = require("./models")

// Setup CO
const cors = require("cors")
const corsOptions = {
    origin: [`http://localhost:${8000}`, `http://127.0.0.1:${8000}`,
    `http://localhost:${8080}`, `http://127.0.0.1:${8080}`],
    optionsSuccessStatus: 200
  };
app.use(cors(corsOptions))
  

// -- Load REST routes --
app.use('/', router)


app.listen(restConstants.httpPort, async () => {
    console.log(`Express is listening at http://localhost:${restConstants.httpPort}`)
    await sequelize.sync({force:true})
    await sequelize.authenticate();
	console.log("DB synced")
    
})
