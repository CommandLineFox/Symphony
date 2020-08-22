import Command from "@command/Command";
import { Music } from "~/Groups";
import CommandEvent from "@command/CommandEvent";

export default class Skip extends Command {
    constructor() {
        super({ name: "skip", triggers: ["skip", "s", "next"], group: Music })
    }

    async run(event: CommandEvent) {
        const client = event.client;
        const member = event.member;
        
        if (!client.playerManager.voiceChannelCheck(event, member)) {
            return;
        }
        
        await client.playerManager.skip(event);
    }
}