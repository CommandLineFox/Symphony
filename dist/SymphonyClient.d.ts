import { Client, ClientOptions, User, Guild } from "discord.js";
import ConfigTemplate from "./Config";
import { IFunctionResult } from "./ConfigHandler";
import Database from "./database/Database";
import PlayerManager from "./PlayerManager";
export default class SymphonyClient extends Client {
    readonly config: IFunctionResult<typeof ConfigTemplate>;
    readonly database: Database;
    readonly playerManager: PlayerManager;
    constructor(config: IFunctionResult<typeof ConfigTemplate>, database: Database, options?: ClientOptions);
    isOwner(user: User): boolean;
    getPrefix(guild?: Guild): string;
}
