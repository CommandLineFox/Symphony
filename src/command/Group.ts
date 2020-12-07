import Command from "@command/Command";
import CommandRegistry from "@command/CommandRegistry";

interface GroupOptions {
    readonly name: string;
    readonly description: string;
    readonly ownerOnly?: boolean;
    readonly guildOnly?: boolean;
}

export default class Group implements GroupOptions {
    public readonly name: string;
    public readonly description: string;
    public readonly ownerOnly: boolean;
    public readonly guildOnly: boolean;

    public constructor(options: GroupOptions) {
        this.name = options.name;
        this.description = options.description;
        this.ownerOnly = options.ownerOnly ?? false;
        this.guildOnly = options.guildOnly ?? false;
    }

    private _commands: readonly Command[] | undefined;

    public get commands(): readonly Command[] {
        return this._commands ?? (this._commands = CommandRegistry.getCommands(this));
    }
}
