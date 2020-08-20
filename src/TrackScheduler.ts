import { ShoukakuTrack } from "shoukaku";

export default class TrackScheduler {
    private readonly queues: Map<string, ShoukakuTrack[]> = new Map();

    constructor() {
    }

    getQueue(guildId: string): ShoukakuTrack[] {
        return this.queues.get(guildId) ?? [];
    }

    addSong(guildId: string, song: ShoukakuTrack) {
        this.queues.set(guildId, [...this.getQueue(guildId), song]);
    }

    addSongs(guildId: string, song: ReadonlyArray<ShoukakuTrack>) {
        this.queues.set(guildId, [...this.getQueue(guildId), ...song]);
    }
    
    removeSong(queue: ShoukakuTrack[], index: number): ShoukakuTrack[];
    removeSong(guildId: string, index: number): boolean;
    removeSong(queue: ShoukakuTrack[], song: ShoukakuTrack): ShoukakuTrack[] | null;
    removeSong(guildId: string, song: ShoukakuTrack): boolean;
    removeSong(queueOrGuildId: string | ShoukakuTrack[], indexOrSong: number | ShoukakuTrack): boolean | ShoukakuTrack[] | null {
        if (typeof queueOrGuildId === "string") {
            if (typeof indexOrSong === "number") {
                this.queues.set(queueOrGuildId, this.removeSong(this.getQueue(queueOrGuildId), indexOrSong));
                return true;
            }
            else {
                return this.removeSong(this.getQueue(queueOrGuildId), indexOrSong) !== null
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

    removeSongs(guildId: string, indexes: number[]): boolean;
    removeSongs(guildId: string, songs: ShoukakuTrack[]): ShoukakuTrack[];
    removeSongs(guildId: string, indexesOrSongs: number[] | ShoukakuTrack[]): boolean | ShoukakuTrack[] {
        if (indexesOrSongs.length === 0) {
            throw Error("Empty arrays are not allowed");
        }
        if (typeof indexesOrSongs[0] === "number") {
            this.queues.set(guildId, this.getQueue(guildId).filter((_, i) => !(indexesOrSongs as number[]).includes(i)));
            return true;
        }
        else {
            let queue = [...this.getQueue(guildId)];
            const missing = [] as ShoukakuTrack[];

            (indexesOrSongs as ShoukakuTrack[]).forEach((song) => {
                const newQueue = this.removeSong(queue, song);

                if (newQueue === null) {
                    missing.push(song);
                } else {
                    queue = newQueue;
                }
            })

            if (missing.length === 0) {
                return missing;
            }

            this.queues.set(guildId, queue);

            return [];
        }
    }

    nextSong(guildId: string): ShoukakuTrack | null {
        const queue = this.getQueue(guildId);

        if (queue.length === 0) {
            return null;
        }

        const song = queue.shift() as ShoukakuTrack;

        this.queues.set(guildId, queue);

        return song;
    }
}