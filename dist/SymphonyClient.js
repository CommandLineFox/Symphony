"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const CommandHandler_1 = require("./command/CommandHandler");
const PlayerManager_1 = require("./PlayerManager");
class SymphonyClient extends discord_js_1.Client {
    constructor(config, database, options) {
        super(options);
        this.config = config;
        this.database = database;
        this.playerManager = new PlayerManager_1.default(this, config);
        this.once("ready", () => {
            new CommandHandler_1.default(this);
        });
    }
    isOwner(user) {
        return this.config.owners.includes(user.id);
    }
    getPrefix(guild) {
        if (guild) {
            return this.config.prefix;
        }
        return this.config.prefix;
    }
}
exports.default = SymphonyClient;
//# sourceMappingURL=SymphonyClient.js.map