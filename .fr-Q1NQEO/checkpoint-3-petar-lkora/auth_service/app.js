"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes/routes");
require('dotenv').config();
const restConstants = {
    httpPort: 9001,
};
const app = express_1.default();
const { sequelize, User } = require("./models");
// Setup CO
const cors = require("cors");
const corsOptions = {
    origin: [`http://localhost:${8000}`, `http://127.0.0.1:${8000}`,
        `http://localhost:${8080}`, `http://127.0.0.1:${8080}`],
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
// -- Load REST routes --
app.use('/', routes_1.router);
app.listen(restConstants.httpPort, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Express is listening at http://localhost:${restConstants.httpPort}`);
    yield sequelize.sync({ force: true });
    yield sequelize.authenticate();
    console.log("DB synced");
}));
//# sourceMappingURL=app.js.map