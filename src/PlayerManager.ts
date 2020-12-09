import { Client, TextChannel, VoiceChannel, GuildMember } from "discord.js";
import ConfigTemplate from "~/Config";
import { FunctionResult } from "~/ConfigHandler";
import { Shoukaku, ShoukakuPlayer, ShoukakuNodeOptions, ShoukakuTrackList, Source } from "shoukaku";
import TrackScheduler from "~/TrackScheduler";
import CommandEvent from "./command/CommandEvent";

export default class PlayerManager {
    public readonly shoukaku: Shoukaku;
    public readonly trackScheduler: TrackScheduler;

    public constructor(client: Client, config: FunctionResult<typeof ConfigTemplate>) {
        this.trackScheduler = new TrackScheduler();
        this.shoukaku = new Shoukaku(client, config.lavalink as ShoukakuNodeOptions[], {
            moveOnDisconnect: true,
            resumable: false,
            reconnectTries: 2,
            restTimeout: 10000
        });
        this.shoukaku.on("ready", (name) => {
            console.log(`Lavalink Node: ${name} is now connected`);
        });
        this.shoukaku.on("error", (name, error) => {
            console.log(`Lavalink Node: ${name} emitted an error.`, error);
        });
        this.shoukaku.on("close", (name, code, reason) => {
            console.log(`Lavalink Node: ${name} closed with code ${code}. Reason: ${reason ?? "No reason"}`);
        });
        this.shoukaku.on("disconnected", (name, reason) => {
            console.log(`Lavalink Node: ${name} disconnected. Reason: ${reason ?? "No reason"}`);
        });
    }

    public async connect(event: CommandEvent): Promise<ShoukakuPlayer | undefined> {
        const guildId = event.guild!.id;
        const channel = event.channel;
        const member = event.member;
        const voiceChannel = member!.voice.channel;

        if (this.shoukaku.getPlayer(guildId)) {
            await (channel as TextChannel).send("Music is already playing elsewhere in the server.");
            return;
        }
        if (!voiceChannel) {
            await (channel as TextChannel).send("You have to be connected to a voice channel to use this command.");
            return;
        }

        if (!(voiceChannel as VoiceChannel).joinable) {
            channel.send(`I am not allowed to join \`${voiceChannel?.name}\``);
            return;
        }

        const node = this.shoukaku.getNode();
        const player = await node.joinVoiceChannel({
            guildID: guildId,
            voiceChannelID: voiceChannel!.id
        });

        player.on("end", (reason) => {
            if (reason.reason === "STOPPED" || reason.reason === "REPLACED") {
                return;
            }

            const song = this.trackScheduler.nextSong(guildId);

            if (!song) {
                return;
            }

            player.playTrack(song);
        });

        await event.send(`Joined ${voiceChannel.name}.`);
        return player;
    }

    public async play(event: CommandEvent, trackList: ShoukakuTrackList): Promise<void> {
        const guild = event.guild;
        const message = event.message;

        const player = this.shoukaku.getPlayer(guild!.id) ?? await this.connect(event);

        if (!player) {
            return;
        }

        const track = trackList!.tracks.shift()!;

        if (!player.track) {
            await player.playTrack(track);
            await event.send(`Playing ${track.info.title}!`);

            if (trackList.tracks.length !== 0) {
                this.trackScheduler.addSongs(message.guild!.id, trackList.tracks);
                await event.send(`Added ${trackList.tracks.length} song(s) to the queue.`);
            }
        } else if (player.track && trackList.tracks.length === 0) {
            this.trackScheduler.addSong(message.guild!.id, track);
            await event.send(`Added ${track.info.title} to the queue.`);
        } else if (trackList.tracks.length !== 0) {
            this.trackScheduler.addSong(message.guild!.id, track);
            this.trackScheduler.addSongs(message.guild!.id, trackList.tracks);
            await event.send(`Added ${trackList.tracks.length + 1} song(s) to the queue.`);
        }
    }

    public async skip(event: CommandEvent): Promise<void> {
        const guild = event.guild;
        const player = this.shoukaku.getPlayer(guild!.id);

        if (!player) {
            await event.send("I'm not connected to a voice channel.");
            return;
        }

        if (!player.track) {
            await event.send("There's nothing playing in this server.");
            return;
        }

        const track = this.trackScheduler.nextSong(guild.id);
        if (!track) {
            await event.send("There's no more songs in the queue");
            await player.stopTrack();
            return;
        }

        await player.playTrack(track, { noReplace: false });
        await event.send("Skipped!");
    }

    public async resume(event: CommandEvent): Promise<boolean> {
        const guild = event.guild;
        const argument = event.argument;
        const player = this.shoukaku.getPlayer(guild!.id);

        if (player && player.paused && !argument && player.track) {
            await player.setPaused(false);
            await event.send("Resumed!");
            return true;
        }

        return false;
    }

    public async voiceChannelCheck(event: CommandEvent, member: GuildMember): Promise<boolean> {
        const me = event.guild.me;
        if (!member.voice.channel) {
            await event.send("You have to be connected to a voice channel to use this command!");
            return false;
        }

        if (me!.voice.channel && me!.voice.channel !== member.voice.channel) {
            await event.send("I'm already playing music elsewhere.");
            return false;
        }

        return true;
    }

    public async getTracks(event: CommandEvent, search?: Source): Promise<ShoukakuTrackList | undefined> {
        const argument = event.argument;

        if (search) {
            const trackList = await this.shoukaku.getNode().rest.resolve(argument, search);
            if (trackList === null) {
                await event.send("Couldn't find the song you're looking for.");
                return;
            }

            trackList.tracks.splice(1);

            return trackList;
        } else {
            const trackList = await this.shoukaku.getNode().rest.resolve(argument);

            if (trackList == null) {
                return this.getTracks(event, "youtube");
            }
            return trackList;
        }
    }
}
