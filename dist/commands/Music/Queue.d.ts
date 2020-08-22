import Command from "../../command/Command";
import CommandEvent from "../../command/CommandEvent";
export default class Queue extends Command {
    constructor();
    run(event: CommandEvent): void;
}
