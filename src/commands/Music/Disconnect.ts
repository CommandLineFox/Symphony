import Command from "@command/Command";
import { Music } from "~/Groups";
import CommandEvent from "@command/CommandEvent";

export default class Disconnect extends Command {
    constructor() {
        super({ name: "Disconnect", triggers: ["leave", "disconnect"], group: Music })
    }

    run(event: CommandEvent) {
        const client = event.client;
        const guild = event.guild;
        const player = client.playerManager.shoukaku.getPlayer(guild.id);

        if (!player) {
            event.send("I'm not connected to a voice channel.");
            return;
        }

        player.disconnect();
        event.send("Disconnected!");
    }
}