import { Client, ClientOptions, User, Guild } from "discord.js";

export default class EeveeClient extends Client {
    constructor(options?: ClientOptions) {
        super(options);
    }

    isOwner(user: User) {
        return user.id === '399624330268508162';
    }
    
    getPrefix(guild?: Guild): string {
        const prefix = "";
        return prefix;
    }
}