"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const fs_1 = __importDefault(require("fs"));
const body_parser_1 = __importDefault(require("body-parser"));
const schemas_1 = require("./schemas");
const router = express_1.default.Router();
exports.router = router;
const itemsFile = './entities/items.json';
// --- ROUTES ---
// New Item
router.use('/item', body_parser_1.default.urlencoded({ extended: false }));
router.post('/item', (req, res) => {
    const formData = req.body;
    const { error, value } = schemas_1.newItem.validate(formData);
    if (error) {
        res.status(http_status_codes_1.default.UNPROCESSABLE_ENTITY)
            .json({ error: error.details.map((detail) => detail.message) });
    }
    else {
        if (fs_1.default.existsSync(itemsFile)) {
            let items = [];
            fs_1.default.readFile(itemsFile, 'utf8', (readError, data) => {
                if (readError) {
                    res.json({ error: readError });
                }
                else {
                    items = data ? JSON.parse(data) : [];
                    items.push(formData);
                    writeItemsToFile(itemsFile, items, value, res);
                }
            });
        }
        else {
            writeItemsToFile(itemsFile, [value], value, res);
        }
    }
    function writeItemsToFile(itemsFile, items, value, res) {
        fs_1.default.writeFile(itemsFile, JSON.stringify(items), (writeError) => {
            if (writeError) {
                res.json({ error: writeError });
            }
            else {
                res.json({ success: 'New item has been saved', data: value });
            }
        });
    }
});
// Catalog
router.get('/items', (req, res) => {
    fs_1.default.readFile(itemsFile, 'utf8', (error, data) => {
        if (error) {
            res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({ error: 'Unable to read items data' });
        }
        else {
            const items = JSON.parse(data);
            // Send the items as a JSON response
            res.json({ success: 'Items retrieved successfully', data: items });
        }
    });
});
//# sourceMappingURL=routes.js.map