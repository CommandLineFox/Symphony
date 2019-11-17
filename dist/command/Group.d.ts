import Command from "./Command";
interface GroupOptions {
    readonly name: string;
    readonly description: string;
    readonly ownerOnly?: boolean;
    readonly guildOnly?: boolean;
}
export default class Group implements GroupOptions {
    readonly name: string;
    readonly description: string;
    readonly ownerOnly: boolean;
    readonly guildOnly: boolean;
    constructor(options: GroupOptions);
    private _commands;
    readonly commands: ReadonlyArray<Command>;
}
export {};
