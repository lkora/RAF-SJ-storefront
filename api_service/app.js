"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes/routes");
const restConstants = {
    httpPort: 9000,
};
const app = (0, express_1.default)();
// -- Load REST routes --
app.use('/', routes_1.router);
app.listen(restConstants.httpPort, () => {
    return console.log(`Express is listening at http://localhost:${restConstants.httpPort}`);
});
//# sourceMappingURL=app.js.map