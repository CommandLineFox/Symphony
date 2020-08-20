"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../command/Command");
const Groups_1 = require("../../Groups");
class Skip extends Command_1.default {
    constructor() {
        super({ name: "skip", triggers: ["skip", "s", "next"], group: Groups_1.Music });
    }
    run(event) {
        const client = event.client;
        const member = event.member;
        if (!client.playerManager.voiceChannelCheck(event, member)) {
            return;
        }
        client.playerManager.skip(event);
    }
}
exports.default = Skip;
//# sourceMappingURL=Skip.js.map