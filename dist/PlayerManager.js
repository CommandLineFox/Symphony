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
    async connect(message) {
        const guildId = message.guild.id;
        const channel = message.channel;
        const member = message.member;
        const voicechannel = member.voice.channel;
        if (this.shoukaku.getPlayer(guildId)) {
            return;
        }
        if (!voicechannel) {
            channel.send("You have to be connected to a voice channel to use this command.");
        }
        if (!voicechannel.joinable) {
            channel.send(`I am not allowed to join \`${voicechannel === null || voicechannel === void 0 ? void 0 : voicechannel.name}\``);
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
    }
}
exports.default = PlayerManager;
//# sourceMappingURL=PlayerManager.js.map