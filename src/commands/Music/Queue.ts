import Command from "@command/Command";
import { Music } from "~/Groups";
import CommandEvent from "@command/CommandEvent";

export default class Queue extends Command {
    constructor() {
        super({ name: "queue", triggers: ["queue", "q", "songs"], group: Music })
    }

    run(event: CommandEvent) {
        const client = event.client;
        const guild = event.guild;
        const playerManager = client.playerManager;

        const player = playerManager.shoukaku.getPlayer(guild.id);
        const queue = playerManager.trackScheduler.getQueue(guild.id);

        if (!player) {
            event.send("I'm not connected to a voice channel.")
            return;
        }

        let content = "";

        if (queue.length !== 0) {
            queue.forEach((track) => {
                content += `${track.info.title}\n`;
            });
        }
        else {
            content = "Queue is empty.";
        }
        
        event.send(content);
    }
}