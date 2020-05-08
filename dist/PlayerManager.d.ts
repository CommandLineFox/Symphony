import { Client, Message } from "discord.js";
import ConfigTemplate from "./Config";
import { IFunctionResult } from "./ConfigHandler";
import { Shoukaku } from "shoukaku";
import TrackScheduler from "./TrackScheduler";
export default class PlayerManager {
    readonly shoukaku: Shoukaku;
    readonly trackScheduler: TrackScheduler;
    constructor(client: Client, config: IFunctionResult<typeof ConfigTemplate>);
    connect(message: Message): Promise<void>;
}
