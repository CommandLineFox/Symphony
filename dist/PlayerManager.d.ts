import { Client, GuildMember } from "discord.js";
import ConfigTemplate from "./Config";
import { IFunctionResult } from "./ConfigHandler";
import { Shoukaku, ShoukakuTrackList, Source } from "shoukaku";
import TrackScheduler from "./TrackScheduler";
import CommandEvent from "./command/CommandEvent";
export default class PlayerManager {
    readonly shoukaku: Shoukaku;
    readonly trackScheduler: TrackScheduler;
    constructor(client: Client, config: IFunctionResult<typeof ConfigTemplate>);
    connect(event: CommandEvent): Promise<import("shoukaku").ShoukakuPlayer | undefined>;
    play(event: CommandEvent, trackList: ShoukakuTrackList): Promise<void>;
    skip(event: CommandEvent): Promise<void>;
    resume(event: CommandEvent): boolean;
    voiceChannelCheck(event: CommandEvent, member: GuildMember): boolean;
    getTracks(event: CommandEvent, search?: Source): Promise<ShoukakuTrackList | undefined>;
}
