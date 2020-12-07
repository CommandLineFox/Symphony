import Command from "@command/Command";
import {Music} from "~/Groups";
import CommandEvent from "@command/CommandEvent";

export default class Disconnect extends Command {
    public constructor() {
        super({name: "Disconnect", triggers: ["leave", "disconnect", "dc"], group: Music});
    }

    public async run(event: CommandEvent): Promise<void> {
        const client = event.client;
        const guild = event.guild;
        const player = client.playerManager.shoukaku.getPlayer(guild.id);

        if (!player) {
            await event.send("I'm not connected to a voice channel.");
            return;
        }

        client.playerManager.trackScheduler.emptyQueue(guild.id);
        player.disconnect();
        await event.send("Disconnected.");
    }
}
