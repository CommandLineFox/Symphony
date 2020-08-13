"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const mongodb_1 = require("mongodb");
class Database {
    constructor(config) {
        this.config = config;
    }
    async connect() {
        const client = await mongodb_1.connect(this.config.url, this.config.mongoOptions)
            .catch(err => {
            throw err;
        });
        this.db = client.db(this.config.name);
        console.log("Connected to database");
    }
}
exports.Database = Database;
//# sourceMappingURL=Database.js.map