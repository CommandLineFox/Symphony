import Command from "@command/Command";
import {Music} from "~/Groups";
import CommandEvent from "@command/CommandEvent";

export default class Play extends Command {
    public constructor() {
        super({name: "play", triggers: ["play", "p"], group: Music});
    }

    public async run(event: CommandEvent): Promise<void> {
        const client = event.client;
        const member = event.member;

        if (await client.playerManager.resume(event)) {
            return;
        }

        if (!await client.playerManager.voiceChannelCheck(event, member)) {
            return;
        }

        const trackList = await client.playerManager.getTracks(event);
        if (!trackList) {
            return;
        }

        await client.playerManager.play(event, trackList);
    }
}
