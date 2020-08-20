"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TrackScheduler {
    constructor() {
        this.queues = new Map();
    }
    getQueue(guildId) {
        var _a;
        return (_a = this.queues.get(guildId)) !== null && _a !== void 0 ? _a : [];
    }
    addSong(guildId, song) {
        this.queues.set(guildId, [...this.getQueue(guildId), song]);
    }
    addSongs(guildId, song) {
        this.queues.set(guildId, [...this.getQueue(guildId), ...song]);
    }
    removeSong(queueOrGuildId, indexOrSong) {
        if (typeof queueOrGuildId === "string") {
            if (typeof indexOrSong === "number") {
                this.queues.set(queueOrGuildId, this.removeSong(this.getQueue(queueOrGuildId), indexOrSong));
                return true;
            }
            else {
                return this.removeSong(this.getQueue(queueOrGuildId), indexOrSong) !== null;
            }
        }
        else {
            if (typeof indexOrSong === "number") {
                queueOrGuildId.splice(indexOrSong, 1);
                return queueOrGuildId;
            }
            else {
                const index = queueOrGuildId.indexOf(indexOrSong);
                if (index === -1) {
                    return null;
                }
                return this.removeSong(queueOrGuildId, indexOrSong);
            }
        }
    }
    removeSongs(guildId, indexesOrSongs) {
        if (indexesOrSongs.length === 0) {
            throw Error("Empty arrays are not allowed");
        }
        if (typeof indexesOrSongs[0] === "number") {
            this.queues.set(guildId, this.getQueue(guildId).filter((_, i) => !indexesOrSongs.includes(i)));
            return true;
        }
        else {
            let queue = [...this.getQueue(guildId)];
            const missing = [];
            indexesOrSongs.forEach((song) => {
                const newQueue = this.removeSong(queue, song);
                if (newQueue === null) {
                    missing.push(song);
                }
                else {
                    queue = newQueue;
                }
            });
            if (missing.length === 0) {
                return missing;
            }
            this.queues.set(guildId, queue);
            return [];
        }
    }
    nextSong(guildId) {
        const queue = this.getQueue(guildId);
        if (queue.length === 0) {
            return null;
        }
        const song = queue.shift();
        this.queues.set(guildId, queue);
        return song;
    }
}
exports.default = TrackScheduler;
//# sourceMappingURL=TrackScheduler.js.map