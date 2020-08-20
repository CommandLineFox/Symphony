import Command from "@command/Command";
import { Music } from "~/Groups";
import CommandEvent from "@command/CommandEvent";

export default class Skip extends Command {
    constructor() {
        super({ name: "skip", triggers: ["skip", "s", "next"], group: Music })
    }

    run(event: CommandEvent) {
        const client = event.client;
        
        client.playerManager.skip(event);
    }
}