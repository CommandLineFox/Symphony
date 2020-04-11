import { Client } from "discord.js";
import ConfigTemplate from "./Config";
import { IFunctionResult } from "./ConfigHandler";
import { Shoukaku } from "shoukaku";
export default class TrackScheduler {
    readonly shoukaku: Shoukaku;
    private readonly queues;
    constructor(client: Client, config: IFunctionResult<typeof ConfigTemplate>);
    getQueue(guildId: string): object[];
    addSong(guildId: string, song: object): void;
    removeSong(queue: object[], index: number): object[];
    removeSong(guildId: string, index: number): boolean;
    removeSong(queue: object[], song: object): object[] | null;
    removeSong(guildId: string, song: object): boolean;
    removeSongs(guildId: string, indexes: number[]): boolean;
    removeSongs(guildId: string, songs: object[]): object[];
    nextSong(guildId: string): object | null;
}
