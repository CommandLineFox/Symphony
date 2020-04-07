import { Client, ClientOptions, User, Guild } from "discord.js";
import ConfigTemplate from "~/Config";
import { IFunctionResult } from "~/ConfigHandler";
import CommandHandler from "@command/CommandHandler";
import Database from "@database/Database";
import { Shoukaku, ShoukakuNodeOptions } from "shoukaku";

export default class SymphonyClient extends Client {
    readonly config: IFunctionResult<typeof ConfigTemplate>;
    readonly database: Database;
    readonly shoukaku: Shoukaku;

    constructor(config: IFunctionResult<typeof ConfigTemplate>, database: Database, options?: ClientOptions) {
        super(options);
        this.config = config;
        this.database = database;
        this.shoukaku = new Shoukaku(this, config.lavalink as ShoukakuNodeOptions[], { moveOnDisconnect: true, resumable: false, reconnectTries: 2, restTimeout: 10000 });
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