import Command from "./Command";
import Group from "./Group";
declare class CommandRegistry {
    readonly commands: readonly Command[];
    readonly groups: readonly Group[];
    getCommands(group: Group): readonly Command[];
    getCommand(trigger: string): Command | undefined;
}
declare const _default: CommandRegistry;
export default _default;
