import { PermissionResolvable } from "discord.js";
import CommandEvent from "./CommandEvent";

interface CommandOptions {
    readonly name: string;
    readonly triggers: string[];
    readonly botPermissions?: PermissionResolvable;
    readonly userPermissions?: PermissionResolvable;
}

export default abstract class Command implements CommandOptions {
    readonly name: string;
    readonly triggers: string[];
    readonly botPermissions: PermissionResolvable;
    readonly userPermissions: PermissionResolvable;

    protected constructor (options: CommandOptions) {
        this.name = options.name;
        this.triggers = options.triggers;
        this.botPermissions = options.botPermissions || [];
        this.userPermissions = options.userPermissions || [];
    }

    execute(event: CommandEvent) : void {
        // TODO: Add permission checks
        this.run(event)
    }

    protected abstract run(event: CommandEvent) : void;
}