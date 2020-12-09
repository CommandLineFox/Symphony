import Command from "@command/Command";
import {Music} from "~/Groups";
import CommandEvent from "@command/CommandEvent";

export default class Disconnect extends Command {
    public constructor() {
        super({name: "Remove", triggers: ["remove", "rm"], group: Music});
    }

    public async run(event: CommandEvent): Promise<void> {
        const client = event.client;
        const member = event.member;

        if (!await client.playerManager.voiceChannelCheck(event, member)) {
            return;
        }
    }
}
