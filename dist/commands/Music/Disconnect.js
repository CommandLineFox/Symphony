"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../command/Command");
const Groups_1 = require("../../Groups");
class Disconnect extends Command_1.default {
    constructor() {
        super({ name: "Disconnect", triggers: ["leave", "disconnect"], group: Groups_1.Music });
    }
    run(event) {
        const client = event.client;
        const guild = event.guild;
        const player = client.playerManager.shoukaku.getPlayer(guild.id);
        if (!player) {
            event.send("I'm not connected to a voice channel.");
            return;
        }
        player.disconnect();
        event.send("Disconnected.");
    }
}
exports.default = Disconnect;
//# sourceMappingURL=Disconnect.js.map