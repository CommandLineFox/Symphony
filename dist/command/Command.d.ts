import { PermissionResolvable } from "discord.js";
import CommandEvent from "./CommandEvent";
import Group from "./Group";
interface CommandOptions {
    readonly name: string;
    readonly triggers: string[];
    readonly botPermissions?: PermissionResolvable;
    readonly userPermissions?: PermissionResolvable;
    readonly group: Group;
    readonly guildOnly?: boolean;
    readonly ownerOnly?: boolean;
}
export default abstract class Command implements CommandOptions {
    readonly name: string;
    readonly triggers: string[];
    readonly botPermissions: PermissionResolvable;
    readonly userPermissions: PermissionResolvable;
    readonly group: Group;
    readonly guildOnly?: boolean;
    readonly ownerOnly?: boolean;
    protected constructor(options: CommandOptions);
    execute(event: CommandEvent): Promise<void>;
    protected abstract run(event: CommandEvent): void;
}
export {};
