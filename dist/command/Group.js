"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommandRegistry_1 = require("./CommandRegistry");
class Group {
    constructor(options) {
        var _a, _b;
        this.name = options.name;
        this.description = options.description;
        this.ownerOnly = (_a = options.ownerOnly) !== null && _a !== void 0 ? _a : false;
        this.guildOnly = (_b = options.guildOnly) !== null && _b !== void 0 ? _b : false;
    }
    get commands() {
        var _a;
        return (_a = this._commands) !== null && _a !== void 0 ? _a : (this._commands = CommandRegistry_1.default.getCommands(this));
    }
}
exports.default = Group;
//# sourceMappingURL=Group.js.map