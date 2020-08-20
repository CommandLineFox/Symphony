import Command from "@command/Command";
import { Music } from "~/Groups";
import CommandEvent from "@command/CommandEvent";

export default class Play extends Command {
    constructor() {
        super({ name: "play", triggers: ["play", "p"], group: Music })
    }

    async run(event: CommandEvent) {
        const client = event.client;
        const member = event.member;

        if (client.playerManager.resume(event)) {
            return;
        }

        if (!client.playerManager.voiceChannelCheck(event, member)) {
            return;
        }

        const trackList = await client.playerManager.getTracks(event);
        if (!trackList) {
            return;
        }

        client.playerManager.play(event, trackList);
    }
}