import { Client, ClientOptions, User, Guild } from "discord.js";
import ConfigTemplate from "./Config";
import { IFunctionResult } from "./ConfigHandler";
export default class SymphonyClient extends Client {
    readonly config: IFunctionResult<typeof ConfigTemplate>;
    constructor(config: IFunctionResult<typeof ConfigTemplate>, options?: ClientOptions);
    isOwner(user: User): boolean;
    getPrefix(guild?: Guild): string;
}
