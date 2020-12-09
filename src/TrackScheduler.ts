import {ShoukakuTrack} from "shoukaku";

export default class TrackScheduler {
    private readonly queues: Map<string, ShoukakuTrack[]> = new Map();

    public getQueue(guildId: string): ShoukakuTrack[] {
        return this.queues.get(guildId) ?? [];
    }

    public emptyQueue(guildId: string): void {
        this.queues.set(guildId, []);
    }

    public addSong(guildId: string, song: ShoukakuTrack): void {
        this.queues.set(guildId, [...this.getQueue(guildId), song]);
    }

    public addSongs(guildId: string, song: readonly ShoukakuTrack[]): void {
        this.queues.set(guildId, [...this.getQueue(guildId), ...song]);
    }

    public removeSong(queue: ShoukakuTrack[], index: number): ShoukakuTrack[];
    public removeSong(guildId: string, indexOrSong: number): boolean;
    public removeSong(queue: ShoukakuTrack[], song: ShoukakuTrack): ShoukakuTrack[] | null;
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    public removeSong(guildId: string, song: ShoukakuTrack): boolean;
    public removeSong(queueOrGuildId: string | ShoukakuTrack[], indexOrSong: number | ShoukakuTrack): boolean | ShoukakuTrack[] | null {
        if (typeof queueOrGuildId === "string") {
            if (typeof indexOrSong === "number") {
                this.queues.set(queueOrGuildId, this.removeSong(this.getQueue(queueOrGuildId), indexOrSong));
                return true;
            } else {
                return this.removeSong(this.getQueue(queueOrGuildId), indexOrSong) !== null;
            }
        } else {
            if (typeof indexOrSong === "number") {
                queueOrGuildId.splice(indexOrSong, 1);
                return queueOrGuildId;
            } else {
                const index = queueOrGuildId.indexOf(indexOrSong);

                if (index === -1) {
                    return null;
                }

                return this.removeSong(queueOrGuildId, indexOrSong);
            }
        }
    }

    public removeSongs(guildId: string, indexes: number[]): boolean;
    public removeSongs(guildId: string, songs: ShoukakuTrack[]): ShoukakuTrack[];
    public removeSongs(guildId: string, indexesOrSongs: number[] | ShoukakuTrack[]): boolean | ShoukakuTrack[] {
        if (indexesOrSongs.length === 0) {
            throw Error("Empty arrays are not allowed");
        }
        if (typeof indexesOrSongs[0] === "number") {
            this.queues.set(guildId, this.getQueue(guildId).filter((_, i) => !(indexesOrSongs as number[]).includes(i)));
            return true;
        } else {
            let queue = [...this.getQueue(guildId)];
            const missing = [] as ShoukakuTrack[];

            (indexesOrSongs as ShoukakuTrack[]).forEach((song) => {
                const newQueue = this.removeSong(queue, song);

                if (newQueue === null) {
                    missing.push(song);
                } else {
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

    public nextSong(guildId: string): ShoukakuTrack | null {
        return this.getQueue(guildId).shift() as ShoukakuTrack;
    }
}
