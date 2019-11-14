import Command from "./Command";
import Group from "./Group";
declare class CommandRegistry {
    readonly commands: ReadonlyArray<Command>;
    readonly groups: ReadonlyArray<Group>;
    getCommands(group: Group): ReadonlyArray<Command>;
    getCommand(trigger: string): Command | undefined;
}
declare const _default: CommandRegistry;
export default _default;
