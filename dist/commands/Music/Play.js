"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../command/Command");
const Groups_1 = require("../../Groups");
class Play extends Command_1.default {
    constructor() {
        super({ name: "play", triggers: ["play", "p"], group: Groups_1.Music });
    }
    async run(event) {
        const client = event.client;
        const member = event.member;
        if (await client.playerManager.resume(event)) {
            return;
        }
        if (!await client.playerManager.voiceChannelCheck(event, member)) {
            return;
        }
        const trackList = await client.playerManager.getTracks(event);
        if (!trackList) {
            return;
        }
        await client.playerManager.play(event, trackList);
    }
}
exports.default = Play;
//# sourceMappingURL=Play.js.map