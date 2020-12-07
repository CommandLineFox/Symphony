"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../command/Command");
const Groups_1 = require("../../Groups");
class Queue extends Command_1.default {
    constructor() {
        super({ name: "queue", triggers: ["queue", "q", "songs"], group: Groups_1.Music });
    }
    async run(event) {
        const client = event.client;
        const guild = event.guild;
        const playerManager = client.playerManager;
        const player = playerManager.shoukaku.getPlayer(guild.id);
        const queue = playerManager.trackScheduler.getQueue(guild.id);
        if (!player) {
            await event.send("I'm not connected to a voice channel.");
            return;
        }
        let content = "";
        if (queue.length !== 0) {
            queue.forEach((track) => {
                content += `${track.info.title}\n`;
            });
        }
        else {
            content = "Queue is empty.";
        }
        await event.send(content);
    }
}
exports.default = Queue;
//# sourceMappingURL=Queue.js.map