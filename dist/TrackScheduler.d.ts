import { ShoukakuTrack } from "shoukaku";
export default class TrackScheduler {
    private readonly queues;
    constructor();
    getQueue(guildId: string): ShoukakuTrack[];
    addSong(guildId: string, song: ShoukakuTrack): void;
    addSongs(guildId: string, song: ReadonlyArray<ShoukakuTrack>): void;
    removeSong(queue: ShoukakuTrack[], index: number): ShoukakuTrack[];
    removeSong(guildId: string, index: number): boolean;
    removeSong(queue: ShoukakuTrack[], song: ShoukakuTrack): ShoukakuTrack[] | null;
    removeSong(guildId: string, song: ShoukakuTrack): boolean;
    removeSongs(guildId: string, indexes: number[]): boolean;
    removeSongs(guildId: string, songs: ShoukakuTrack[]): ShoukakuTrack[];
    nextSong(guildId: string): ShoukakuTrack | null;
}
