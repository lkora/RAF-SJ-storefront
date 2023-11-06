"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wss = exports.app = void 0;
const path_1 = __importDefault(require("path"));
const ws_1 = __importDefault(require("ws"));
const fs_1 = __importDefault(require("fs"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = require("./routes");
const constants = {
    httpPort: 8000,
    wssPort: 8080,
    itemsFile: './entities/items.json',
};
exports.app = (0, express_1.default)();
exports.wss = new ws_1.default.Server({ port: constants.wssPort });
// -- Load app middleware --
exports.app.use(express_1.default.static(path_1.default.join(__dirname, 'static')));
exports.app.use(body_parser_1.default.json());
exports.app.use(body_parser_1.default.urlencoded({ extended: false }));
// -- Load API routes --
exports.app.use('/', routes_1.router);
// -- Request middlewares --
exports.app.listen(constants.httpPort, () => {
    return console.log(`Express is listening at http://localhost:${constants.httpPort}`);
});
// -- Web socket server --
exports.wss.on('connection', ws => {
    console.log('Client connected');
    // Watch for file changes for items
    fs_1.default.watch(constants.itemsFile, (eventType, filename) => {
        if (eventType === 'change') {
            console.log(`File changed: ${filename}`);
            ws.send('catalog-changed');
        }
    });
});
//# sourceMappingURL=app.js.map