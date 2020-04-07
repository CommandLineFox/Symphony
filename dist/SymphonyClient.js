"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const CommandHandler_1 = require("./command/CommandHandler");
class SymphonyClient extends discord_js_1.Client {
    constructor(config, _database, options) {
        super(options);
        this.config = config;
        this.once("ready", () => {
            new CommandHandler_1.default(this);
        });
    }
    isOwner(user) {
        return this.config.owners.includes(user.id);
    }
    getPrefix(guild) {
        if (guild) {
        }
        return this.config.prefix;
    }
}
exports.default = SymphonyClient;
//# sourceMappingURL=SymphonyClient.js.map