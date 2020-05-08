import { Client, Message, TextChannel, VoiceChannel } from "discord.js";
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
        const guildId = message.guild!.id;
        const channel = message.channel;
        const member = message.member;
        const voicechannel = member!.voice.channel;

        if (this.shoukaku.getPlayer(guildId)) {
            return;
        }
        if (!voicechannel) {
            (channel as TextChannel).send("You have to be connected to a voice channel to use this command.");
        }
        
        if (!(voicechannel as VoiceChannel).joinable) {
            channel.send(`I am not allowed to join \`${voicechannel?.name}\``);
        }
        
        const node = this.shoukaku.getNode();
        const player = await node.joinVoiceChannel({
            guildID: guildId,
            voiceChannelID: voicechannel!.id
        });
        
        player.on("end", () => {
            const song = this.trackScheduler.nextSong(guildId);
            
            if (song === null) {
                return;
            }
            
            player.playTrack(song);
        });
    }
}