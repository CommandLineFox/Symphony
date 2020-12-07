import Command from "@command/Command";
import {Music} from "~/Groups";
import CommandEvent from "@command/CommandEvent";

export default class Summon extends Command {
    public constructor() {
        super({name: "Summon", triggers: ["summon", "join"], group: Music});
    }

    public async run(event: CommandEvent): Promise<void> {
        const client = event.client;

        await client.playerManager.connect(event);
    }
}
