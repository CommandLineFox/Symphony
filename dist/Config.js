"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConfigHandler_1 = require("./ConfigHandler");
exports.default = {
    token: ConfigHandler_1.string(""),
    prefix: ConfigHandler_1.string("!"),
    owners: ConfigHandler_1.array(ConfigHandler_1.base.string),
    database: ConfigHandler_1.object({
        name: ConfigHandler_1.string(""),
        url: ConfigHandler_1.string(""),
        mongoOptions: ConfigHandler_1.object({
            useUnifiedTopology: ConfigHandler_1.boolean(true)
        })
    }),
    lavalink: ConfigHandler_1.objectArray({
        auth: ConfigHandler_1.string("Passw0rd!"),
        name: ConfigHandler_1.string("Symphony"),
        host: ConfigHandler_1.string("localhost"),
        port: ConfigHandler_1.number(2333)
    })
};
//# sourceMappingURL=Config.js.map