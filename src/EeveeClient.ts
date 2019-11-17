import { Client, ClientOptions, User, Guild } from "discord.js";
import ConfigTemplate from "./Config";
import { IFunctionResult } from "./ConfigHandler";
import CommandHandler from "./command/CommandHandler";

export default class EeveeClient extends Client {
    readonly config: IFunctionResult<typeof ConfigTemplate>;

    constructor(config: IFunctionResult<typeof ConfigTemplate>, options?: ClientOptions) {
        super(options);
        this.config = config;
        this.once("ready", () => {
            new CommandHandler (this)
        });
    }

    isOwner(user: User): boolean {
        return this.config.owners.includes(user.id);
    }
    
    getPrefix(guild?: Guild): string {
        if (guild) {
            
        }
        return this.config.prefix;
    }
}