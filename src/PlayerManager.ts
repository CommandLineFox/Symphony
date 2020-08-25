import { Client, TextChannel, VoiceChannel, GuildMember } from "discord.js";
import ConfigTemplate from "~/Config";
import { IFunctionResult } from "~/ConfigHandler";
import { Shoukaku, ShoukakuNodeOptions, ShoukakuTrackList, Source } from "shoukaku";
import TrackScheduler from "~/TrackScheduler";
import CommandEvent from "./command/CommandEvent";

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

    async connect(event: CommandEvent) {
        const guildId = event.guild!.id;
        const channel = event.channel;
        const member = event.member;
        const voicechannel = member!.voice.channel;

        if (this.shoukaku.getPlayer(guildId)) {
            (channel as TextChannel).send("Music is already playing elsewhere in the server.");
            return;
        }
        if (!voicechannel) {
            (channel as TextChannel).send("You have to be connected to a voice channel to use this command.");
            return;
        }

        if (!(voicechannel as VoiceChannel).joinable) {
            channel.send(`I am not allowed to join \`${voicechannel?.name}\``);
            return;
        }

        const node = this.shoukaku.getNode();
        const player = await node.joinVoiceChannel({
            guildID: guildId,
            voiceChannelID: voicechannel!.id
        });

        player.on("end", () => {
            const song = this.trackScheduler.nextSong(guildId);

            if (!song) {
                return;
            }

            player.playTrack(song);
        });

        return player;
    }

    async play(event: CommandEvent, trackList: ShoukakuTrackList) {
        const guild = event.guild;
        const message = event.message;

        const player = this.shoukaku.getPlayer(guild!.id) || await this.connect(event);

        if (!player) {
            return;
        }

        const track = trackList!.tracks.shift()!;

        if (!player.track) {
            player.playTrack(track);
            event.send(`Playing ${track.info.title}!`);

            if (trackList.tracks.length !== 0) {
                this.trackScheduler.addSongs(message.guild!.id, trackList.tracks);
                event.send(`Added ${trackList.tracks.length} song(s) to the queue.`);
            }
        }

        else if (player.track && trackList.tracks.length === 0) {
            this.trackScheduler.addSong(message.guild!.id, track);
            event.send(`Added ${track.info.title} to the queue.`);
        }

        else if (trackList.tracks.length !== 0) {
            this.trackScheduler.addSong(message.guild!.id, track);
            this.trackScheduler.addSongs(message.guild!.id, trackList.tracks);
            event.send(`Added ${trackList.tracks.length + 1} song(s) to the queue.`);
        }
    }

    async skip(event: CommandEvent) {
        const guild = event.guild;
        const player = this.shoukaku.getPlayer(guild!.id);

        if (!player) {
            event.send("I'm not connected to a voice channel.")
            return;
        }

        if (!player.track) {
            event.send("There's nothing playing in this server.");
            return;
        }

        const track = this.trackScheduler.nextSong(guild.id);
        if (!track) {
            event.send("There's no more songs in the queue");
            player.stopTrack();
            return;
        }

        player.stopTrack();
        event.send("Skipped!");
    }

    resume(event: CommandEvent) {
        const guild = event.guild;
        const argument = event.argument;
        const player = this.shoukaku.getPlayer(guild!.id);

        if (player && player.paused && !argument && player.track) {
            player.setPaused(false);
            event.send("Resumed!");
            return true;
        }

        return false;
    }

    voiceChannelCheck(event: CommandEvent, member: GuildMember) {
        const me = event.guild.me;
        if (!member.voice.channel) {
            event.send("You have to be connected to a voice channel to use this command!")
            return false;
        }

        if (me!.voice.channel && me!.voice.channel !== member.voice.channel) {
            event.send("I'm already playing music elsewhere.");
            return false;
        }

        return true;
    }

    async getTracks(event: CommandEvent, search?: Source): Promise<ShoukakuTrackList | undefined> {
        const argument = event.argument;

        if (search) {
            let trackList = await this.shoukaku.getNode().rest.resolve(argument, search)

            if (trackList === null) {
                event.send("Couldn't find the song you're looking for.");
                return;
            }

            trackList.tracks.splice(1);

            return trackList;
        }
        else {
            let trackList = await this.shoukaku.getNode().rest.resolve(argument)

            if (trackList == null) {
                return this.getTracks(event, "youtube");
            }
            return trackList;
        }
    }
}