import { Client, Message } from "discord.js";
import ConfigTemplate from "~/Config";
import { IFunctionResult } from "~/ConfigHandler";
import { Shoukaku, ShoukakuNodeOptions } from "shoukaku";
import TrackScheduler from "~/TrackScheduler";

export default class PlayerManager {
    readonly shoukaku: Shoukaku;
    readonly trackScheduler: TrackScheduler;

    constructor(client: Client, config: IFunctionResult<typeof ConfigTemplate>) {
        this.trackScheduler = new TrackScheduler();
        this.shoukaku = new Shoukaku(client, config.lavalink as ShoukakuNodeOptions[], { moveOnDisconnect: true, resumable: false, reconnectTries: 2, restTimeout: 10000 });
        this.shoukaku.on('ready', (name) => {
            console.log(`Lavalink Node: ${name} is now connected`)
        });
        this.shoukaku.on('error', (name, error) => {
            console.log(`Lavalink Node: ${name} emitted an error.`, error)
        });
        this.shoukaku.on('close', (name, code, reason) => {
            console.log(`Lavalink Node: ${name} closed with code ${code}. Reason: ${reason || 'No reason'}`)
        });
        this.shoukaku.on('disconnected', (name, reason) => {
            console.log(`Lavalink Node: ${name} disconnected. Reason: ${reason || 'No reason'}`)
        });
    }

    async connect(message: Message) {
        if (this.shoukaku.getPlayer(message.guild.id)) {
            return;
        }

        const node = this.shoukaku.getNode();
        const player = await node.joinVoiceChannel({
            guildID: message.guild.id,
            voiceChannelID: message.member.voiceChannelID
        });
    }
}