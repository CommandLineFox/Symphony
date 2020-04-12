export default class TrackScheduler {
    private readonly queues: Map<string, object[]> = new Map();

    constructor() {
    }

    getQueue(guildId: string): object[] {
        return this.queues.get(guildId) ?? [];
    }
    
    addSong(guildId: string, song: object) {
        this.queues.set(guildId, [...this.getQueue(guildId), song]);
    }
    
    removeSong(queue: object[], index: number): object[];
    removeSong(guildId: string, index: number): boolean;
    removeSong(queue: object[], song: object): object[] | null;
    removeSong(guildId: string, song: object): boolean;
    removeSong(queueOrGuildId: string | object[], indexOrSong: number|object): boolean | object[] | null {
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
    removeSongs(guildId: string, songs: object[]): object[];
    removeSongs(guildId: string, indexesOrSongs: number[] | object[]): boolean | object[] {
        if (indexesOrSongs.length === 0) {
            throw Error("Empty arrays are not allowed");
        }
        if (typeof indexesOrSongs === "number") {
            this.queues.set(guildId, this.getQueue(guildId).filter((_, i) => !(indexesOrSongs as number[]).includes(i)));
            return true;
        }
        else {
            let queue = [...this.getQueue(guildId)];
            const missing = [] as Object[];
            
            indexesOrSongs.forEach((song: Object) => {
                song as Object;
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

    nextSong(guildId: string): object | null {
        const queue = this.getQueue(guildId);
        
        if (queue.length === 0) {
            return null;
        }
        
        const song = queue.shift() as object;
        
        this.queues.set(guildId, queue);
        
        return song;
    }
}