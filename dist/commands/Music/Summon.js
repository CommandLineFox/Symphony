"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../command/Command");
const Groups_1 = require("../../Groups");
class Summon extends Command_1.default {
    constructor() {
        super({ name: "Summon", triggers: ["summon", "join"], group: Groups_1.Music });
    }
    run(event) {
        const client = event.client;
        client.playerManager.connect(event);
    }
}
exports.default = Summon;
//# sourceMappingURL=Summon.js.map