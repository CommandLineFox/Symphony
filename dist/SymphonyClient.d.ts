import { Client, ClientOptions, User, Guild } from "discord.js";
import ConfigTemplate from "./Config";
import { FunctionResult } from "./ConfigHandler";
import { Database } from "./database/Database";
import PlayerManager from "./PlayerManager";
export default class SymphonyClient extends Client {
    readonly config: FunctionResult<typeof ConfigTemplate>;
    readonly database: Database;
    readonly playerManager: PlayerManager;
    constructor(config: FunctionResult<typeof ConfigTemplate>, database: Database, options?: ClientOptions);
    isOwner(user: User): boolean;
    getPrefix(guild?: Guild): string;
}
