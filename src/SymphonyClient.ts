import {Client, ClientOptions, User, Guild} from "discord.js";
import ConfigTemplate from "~/Config";
import {FunctionResult} from "~/ConfigHandler";
import CommandHandler from "@command/CommandHandler";
import {Database} from "@database/Database";
import PlayerManager from "~/PlayerManager";

export default class SymphonyClient extends Client {
    public readonly config: FunctionResult<typeof ConfigTemplate>;
    public readonly database: Database;
    public readonly playerManager: PlayerManager;

    public constructor(config: FunctionResult<typeof ConfigTemplate>, database: Database, options?: ClientOptions) {
        super(options);
        this.config = config;
        this.database = database;
        this.playerManager = new PlayerManager(this, config);
        this.once("ready", () => {
            new CommandHandler(this);
        });
    }

    public isOwner(user: User): boolean {
        return this.config.owners.includes(user.id);
    }

    public getPrefix(guild?: Guild): string {
        if (guild) {
            return this.config.prefix;
        }
        return this.config.prefix;
    }
}
