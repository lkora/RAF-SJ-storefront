import path from 'path'
import WebSocket from 'ws'
import fs from 'fs'
import express from 'express'
import bodyParser from 'body-parser'
import { router } from './routes'

const constants: Config = {
    httpPort: 8000,
    wssPort: 8080,
    itemsFile: './entities/items.json',
};

export const app = express()
export const wss = new WebSocket.Server({ port: constants.wssPort });

// -- Load app middleware --
app.use(express.static(path.join(__dirname, 'static')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// -- Load API routes --
app.use('/', router)

// -- Request middlewares --

app.listen(constants.httpPort, () => {
    return console.log(`Express is listening at http://localhost:${constants.httpPort}`);
})

// -- Web socket server --
wss.on('connection', ws => {
    console.log('Client connected');

    // Watch for file changes for items
    fs.watch(constants.itemsFile, (eventType, filename) => {
        if (eventType === 'change') {
            console.log(`File changed: ${filename}`)
            ws.send('catalog-changed')
        }
    });
}); 