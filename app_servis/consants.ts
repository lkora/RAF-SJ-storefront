interface Config {
    httpPort: number;
    wssPort: number;
    itemsFile: string;
}

const constants: Config = {
    httpPort: 8000,
    wssPort: 8080,
    itemsFile: './entities/items.json',
};

module.exports = Object.freeze(constants)

