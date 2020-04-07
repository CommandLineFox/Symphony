import { Client, ClientOptions, User, Guild } from "discord.js";
import ConfigTemplate from "./Config";
import { IFunctionResult } from "./ConfigHandler";
import Database from "./database/Database";
export default class SymphonyClient extends Client {
    readonly config: IFunctionResult<typeof ConfigTemplate>;
    constructor(config: IFunctionResult<typeof ConfigTemplate>, _database: Database, options?: ClientOptions);
    isOwner(user: User): boolean;
    getPrefix(guild?: Guild): string;
}
