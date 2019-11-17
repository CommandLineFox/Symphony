"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
class Database {
    constructor(client, database) {
        this.client = client;
        this.database = database;
    }
    static async getClient(config) {
        const { username, password, authenticationDatabase, shards } = config.database;
        function mongoUrlEncoder(str) {
            return str.replace(/@/g, "%40")
                .replace(/:/g, "%3A")
                .replace(/\//g, "%2F")
                .replace(/%/g, "%25");
        }
        const client = await mongodb_1.MongoClient.connect(`mongodb://${mongoUrlEncoder(username)}:${mongoUrlEncoder(password)}@${shards.map(({ host, port }) => host + ":" + port).join(",")}/${authenticationDatabase}`);
        const database = client.db(config.database.database);
        return { client: client, database: database };
    }
}
exports.default = Database;
//# sourceMappingURL=Database.js.map