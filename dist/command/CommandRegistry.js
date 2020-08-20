"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Ping_1 = require("../commands/Basic/Ping");
const Summon_1 = require("../commands/Music/Summon");
class CommandRegistry {
    constructor() {
        this.commands = [
            new Ping_1.default(),
            new Summon_1.default()
        ];
        this.groups = this.commands.map((command) => command.group).filter((group, index, self) => self.indexOf(group) === index);
    }
    getCommands(group) {
        return this.commands.filter((command) => command.group === group);
    }
    getCommand(trigger) {
        return this.commands.find((command) => command.triggers.includes(trigger.toLowerCase()));
    }
}
exports.default = new CommandRegistry();
//# sourceMappingURL=CommandRegistry.js.map