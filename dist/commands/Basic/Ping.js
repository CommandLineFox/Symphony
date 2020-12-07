"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../command/Command");
const Groups_1 = require("../../Groups");
const discord_js_1 = require("discord.js");
class Ping extends Command_1.default {
    constructor() {
        super({ name: "Ping", triggers: ["ping"], group: Groups_1.Basic });
    }
    run(event) {
        event.send("Pinging...")
            .then(async (msg) => {
            msg = msg;
            const ping = new discord_js_1.MessageEmbed()
                .addField(":hourglass: Response time: ", `${msg.createdTimestamp - event.message.createdTimestamp}ms`, false)
                .addField(":heartbeat: Bot ping: ", `${Math.round(event.client.ws.ping)}ms`, true);
            await msg.edit({ content: "", embed: ping });
        });
    }
}
exports.default = Ping;
//# sourceMappingURL=Ping.js.map