import Command from "@command/Command";
import Group from "@command/Group";
import Summon from "@commands/Music/Summon";

class CommandRegistry {
    readonly commands: ReadonlyArray<Command> = [
        new Summon()
    ];
    readonly groups: ReadonlyArray<Group> = this.commands.map((command) => command.group).filter((group, index, self) => self.indexOf(group) === index);

    getCommands(group: Group): ReadonlyArray<Command> {
        return this.commands.filter((command) => command.group === group);
    }

    getCommand(trigger: string): Command | undefined {
        return this.commands.find((command) => command.triggers.includes(trigger.toLowerCase()));
    }
}

export default new CommandRegistry();