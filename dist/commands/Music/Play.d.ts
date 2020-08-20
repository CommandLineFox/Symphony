import Command from "../../command/Command";
import CommandEvent from "../../command/CommandEvent";
export default class Play extends Command {
    constructor();
    run(event: CommandEvent): Promise<void>;
}
