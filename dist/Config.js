"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConfigHandler_1 = require("./ConfigHandler");
exports.default = {
    token: ConfigHandler_1.string(""),
    prefix: ConfigHandler_1.string("!"),
    owners: ConfigHandler_1.array(ConfigHandler_1.base.string),
    database: ConfigHandler_1.object({
        username: ConfigHandler_1.string("Eevee"),
        password: ConfigHandler_1.string("Passw0rd!"),
        database: ConfigHandler_1.string("Eevee"),
        authenticationDatabase: ConfigHandler_1.string("admin"),
        shards: ConfigHandler_1.objectArray({
            host: ConfigHandler_1.string("localhost"),
            port: ConfigHandler_1.number(27017)
        })
    })
};
//# sourceMappingURL=Config.js.map