"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const CommandHandler_1 = __importDefault(require("./command/CommandHandler"));
class EeveeClient extends discord_js_1.Client {
    constructor(config, options) {
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
        return this.config.prefix;
    }
}
exports.default = EeveeClient;
//# sourceMappingURL=EeveeClient.js.map