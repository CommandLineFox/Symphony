"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shoukaku_1 = require("shoukaku");
const TrackScheduler_1 = require("./TrackScheduler");
class PlayerManager {
    constructor(client, config) {
        this.trackScheduler = new TrackScheduler_1.default();
        this.shoukaku = new shoukaku_1.Shoukaku(client, config.lavalink, { moveOnDisconnect: true, resumable: false, reconnectTries: 2, restTimeout: 10000 });
        this.shoukaku.on('ready', (name) => {
            console.log(`Lavalink Node: ${name} is now connected`);
        });
        this.shoukaku.on('error', (name, error) => {
            console.log(`Lavalink Node: ${name} emitted an error.`, error);
        });
        this.shoukaku.on('close', (name, code, reason) => {
            console.log(`Lavalink Node: ${name} closed with code ${code}. Reason: ${reason || 'No reason'}`);
        });
        this.shoukaku.on('disconnected', (name, reason) => {
            console.log(`Lavalink Node: ${name} disconnected. Reason: ${reason || 'No reason'}`);
        });
    }
    async connect(event) {
        const guildId = event.guild.id;
        const channel = event.channel;
        const member = event.member;
        const voicechannel = member.voice.channel;
        if (this.shoukaku.getPlayer(guildId)) {
            channel.send("Music is already playing elsewhere in the server.");
            return;
        }
        if (!voicechannel) {
            channel.send("You have to be connected to a voice channel to use this command.");
            return;
        }
        if (!voicechannel.joinable) {
            channel.send(`I am not allowed to join \`${voicechannel === null || voicechannel === void 0 ? void 0 : voicechannel.name}\``);
            return;
        }
        const node = this.shoukaku.getNode();
        const player = await node.joinVoiceChannel({
            guildID: guildId,
            voiceChannelID: voicechannel.id
        });
        player.on("end", () => {
            const song = this.trackScheduler.nextSong(guildId);
            if (song === null) {
                return;
            }
            player.playTrack(song);
        });
        return player;
    }
    async play(event, trackList) {
        const guild = event.guild;
        const message = event.message;
        const player = this.shoukaku.getPlayer(guild.id) || await this.connect(event);
        if (!player) {
            return;
        }
        const track = trackList.tracks.shift();
        player.playTrack(track);
        this.trackScheduler.addSongs(message.guild.id, trackList.tracks);
        event.send(`Playing ${track.info.title}!`);
        if (trackList.tracks.length !== 0) {
            event.send(`Added ${trackList.tracks.length} song(s) to the queue.`);
        }
    }
    async skip(event) {
        const guild = event.guild;
        const player = this.shoukaku.getPlayer(guild.id);
        if (!player) {
            event.send("I'm not connected to a voice channel.");
            return;
        }
        const track = this.trackScheduler.nextSong(guild.id);
        if (!track) {
            event.send("There's no more songs in the queue");
            player.stopTrack();
            return;
        }
        player.playTrack(track);
        event.send("Skipped!");
    }
    resume(event) {
        const guild = event.guild;
        const argument = event.argument;
        const player = this.shoukaku.getPlayer(guild.id);
        if (player && player.paused && !argument && player.track) {
            player.setPaused(false);
            event.send("Resumed!");
            return true;
        }
        return false;
    }
    voiceChannelCheck(event, member) {
        const me = event.guild.me;
        if (!member.voice.channel) {
            event.send("You have to be connected to a voice channel to use this command!");
            return;
        }
        if (me.voice.channel && me.voice.channel !== member.voice.channel) {
            event.send("I'm already playing music elsewhere.");
            return;
        }
        return true;
    }
    async getTracks(event, search) {
        const argument = event.argument;
        if (search) {
            let trackList = await this.shoukaku.getNode().rest.resolve(argument, search);
            if (trackList === null) {
                event.send("Couldn't find the song you're looking for.");
                return;
            }
            trackList.tracks.splice(1);
            return trackList;
        }
        else {
            let trackList = await this.shoukaku.getNode().rest.resolve(argument);
            if (trackList == null) {
                return this.getTracks(event, "youtube");
            }
            return trackList;
        }
    }
}
exports.default = PlayerManager;
//# sourceMappingURL=PlayerManager.js.map