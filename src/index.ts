import * as fs from "fs";
import Config from "./Config";
import { generateConfig, checkConfig } from "./ConfigHandler";

function main() {
    if(!fs.existsSync("config.json")) {
        generateConfig("config.json", Config);
        console.warn("Generated config");
        console.info("Please edit the config before restarting the bot");
        return;
    }

    const config = JSON.parse(fs.readFileSync("config.json").toString());

    if(!checkConfig(config, Config)) {
        console.warn("Failed to read config");
        console.info("Please use the above errors to fix your config before restarting the bot");
        return;
    }
}