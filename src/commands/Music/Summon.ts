import Command from "@command/Command";
import { Music } from "~/Groups";
import CommandEvent from "@command/CommandEvent";

export default class Summon extends Command {
    constructor() {
        super({ name: "Summon", triggers: ["summon", "join"], group: Music })
    }

    run(event: CommandEvent) {
        const client = event.client;

        client.playerManager.connect(event);
    }
}