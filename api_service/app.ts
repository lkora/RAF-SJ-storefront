import express from 'express'
import { router } from './routes/routes'

const restConstants: RestConstants = {
    httpPort: 9000,
};

const app = express()


// -- Load REST routes --
app.use('/', router)


app.listen(restConstants.httpPort, () => {
    return console.log(`Express is listening at http://localhost:${restConstants.httpPort}`);
})
