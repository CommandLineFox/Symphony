import { Client, GuildMember } from "discord.js";
import ConfigTemplate from "./Config";
import { FunctionResult } from "./ConfigHandler";
import { Shoukaku, ShoukakuPlayer, ShoukakuTrackList, Source } from "shoukaku";
import TrackScheduler from "./TrackScheduler";
import CommandEvent from "./command/CommandEvent";
export default class PlayerManager {
    readonly shoukaku: Shoukaku;
    readonly trackScheduler: TrackScheduler;
    constructor(client: Client, config: FunctionResult<typeof ConfigTemplate>);
    connect(event: CommandEvent): Promise<ShoukakuPlayer | undefined>;
    play(event: CommandEvent, trackList: ShoukakuTrackList): Promise<void>;
    skip(event: CommandEvent): Promise<void>;
    resume(event: CommandEvent): Promise<boolean>;
    voiceChannelCheck(event: CommandEvent, member: GuildMember): Promise<boolean>;
    getTracks(event: CommandEvent, search?: Source): Promise<ShoukakuTrackList | undefined>;
}
