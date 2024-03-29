"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const Config_1 = require("./Config");
const ConfigHandler_1 = require("./ConfigHandler");
const BotClient_1 = require("./BotClient");
const Database_1 = require("./database/Database");
async function main() {
    const configFile = "config.json";
    if (!fs.existsSync(configFile)) {
        ConfigHandler_1.generateConfig(configFile, Config_1.default);
        console.warn("Generated config");
        console.info("Please edit the config before restarting the bot");
        return;
    }
    const config = ConfigHandler_1.getConfig(configFile, Config_1.default);
    if (!config) {
        console.warn("Failed to read config");
        console.info("Please use the above errors to fix your config before restarting the bot");
        return;
    }
    const database = new Database_1.Database(config.database);
    await database.connect();
    const client = new BotClient_1.default(config, database);
    await client.login(config.token);
    client.on("ready", () => {
        console.log(`Logged in as ${client.user.tag}`);
    });
}
main().catch((err) => {
    console.log(err);
});
//# sourceMappingURL=index.js.map