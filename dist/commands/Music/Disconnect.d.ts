import Command from "../../command/Command";
import CommandEvent from "../../command/CommandEvent";
export default class Disconnect extends Command {
    constructor();
    run(event: CommandEvent): Promise<void>;
}
