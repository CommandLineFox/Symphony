"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Command {
    constructor(options) {
        var _a, _b, _c, _d, _e, _f;
        this.name = options.name;
        this.triggers = options.triggers;
        this.botPermissions = (_a = options.botPermissions) !== null && _a !== void 0 ? _a : [];
        this.userPermissions = (_b = options.userPermissions) !== null && _b !== void 0 ? _b : [];
        this.group = options.group;
        this.guildOnly = (_d = (_c = this.group.guildOnly) !== null && _c !== void 0 ? _c : options.guildOnly) !== null && _d !== void 0 ? _d : false;
        this.ownerOnly = (_f = (_e = this.group.ownerOnly) !== null && _e !== void 0 ? _e : options.ownerOnly) !== null && _f !== void 0 ? _f : false;
    }
    async execute(event) {
        if (this.ownerOnly && !event.client.isOwner(event.author)) {
            await event.reply(" you do not own me!");
            return;
        }
        if (this.guildOnly && !event.isFromGuild) {
            await event.reply(" this command can only be used in servers.");
            return;
        }
        if (event.isFromGuild) {
            const missingBotPermission = event.textChannel.permissionsFor(event.guild.me).missing(this.botPermissions);
            if (!missingBotPermission) {
                await event.reply(" I am not allowed to run this command.");
                return;
            }
            const missingUserPermission = event.textChannel.permissionsFor(event.member).missing(this.userPermissions);
            if (!missingUserPermission) {
                await event.reply(" You are not allowed to run this command.");
                return;
            }
        }
        this.run(event);
    }
}
exports.default = Command;
//# sourceMappingURL=Command.js.map