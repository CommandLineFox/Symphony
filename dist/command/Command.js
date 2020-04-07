"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Command {
    constructor(options) {
        var _a, _b, _c, _d;
        this.name = options.name;
        this.triggers = options.triggers;
        this.botPermissions = options.botPermissions || [];
        this.userPermissions = options.userPermissions || [];
        this.group = options.group;
        this.guildOnly = (_b = (_a = this.group.guildOnly) !== null && _a !== void 0 ? _a : options.guildOnly) !== null && _b !== void 0 ? _b : false;
        this.ownerOnly = (_d = (_c = this.group.ownerOnly) !== null && _c !== void 0 ? _c : options.ownerOnly) !== null && _d !== void 0 ? _d : false;
    }
    execute(event) {
        if (this.ownerOnly && !event.client.isOwner(event.author)) {
            event.reply(' you do not own me!');
            return;
        }
        if (this.guildOnly && !event.isFromGuild) {
            event.reply(' this command can only be used in servers.');
            return;
        }
        if (event.isFromGuild) {
            const missingBotPermission = event.textChannel.permissionsFor(event.guild.me).missing(this.botPermissions);
            if (!missingBotPermission) {
                event.reply(' I am not allowed to run this command.');
                return;
            }
            const missingUserPermission = event.textChannel.permissionsFor(event.member).missing(this.userPermissions);
            if (!missingUserPermission) {
                event.reply(' You are not allowed to run this command.');
                return;
            }
        }
        this.run(event);
    }
}
exports.default = Command;
//# sourceMappingURL=Command.js.map