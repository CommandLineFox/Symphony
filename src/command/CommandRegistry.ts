import Command from "@command/Command";
import Group from "@command/Group";
import Ping from "@commands/Basic/Ping";
import Disconnect from "@commands/Music/Disconnect";
import Play from "@commands/Music/Play";
import Queue from "@commands/Music/Queue";
import Skip from "@commands/Music/Skip";
import Summon from "@commands/Music/Summon";

class CommandRegistry {
    readonly commands: ReadonlyArray<Command> = [
        new Ping(),
        new Disconnect(),
        new Play(),
        new Queue(),
        new Skip(),
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