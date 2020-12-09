import { Message, StringResolvable, MessageOptions, TextChannel, DMChannel, User, Guild, GuildMember, NewsChannel, MessageEmbed } from "discord.js";
import BotClient from "../BotClient";
export default class CommandEvent {
    readonly message: Message;
    readonly client: BotClient;
    readonly author: User;
    readonly argument: string;
    readonly channel: TextChannel | DMChannel | NewsChannel;
    readonly isFromGuild: boolean;
    readonly textChannel: TextChannel | undefined;
    readonly guild: Guild;
    readonly member: GuildMember;
    constructor(message: Message, client: BotClient, argument: string);
    send(content: StringResolvable, options?: MessageOptions | MessageEmbed): Promise<Message | Message[]>;
    reply(content: StringResolvable, options?: MessageOptions): Promise<Message | Message[]>;
}
