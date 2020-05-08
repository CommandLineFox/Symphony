import { Message, StringResolvable, MessageOptions, TextChannel, DMChannel, User, Guild, GuildMember, NewsChannel, MessageAttachment, MessageEmbed } from "discord.js";
import SymphonyClient from "~/SymphonyClient";

export default class CommandEvent {
    readonly message: Message;
    readonly client: SymphonyClient;
    readonly author: User;
    readonly argument: string;
    readonly channel: TextChannel | DMChannel | NewsChannel;
    readonly isFromGuild: boolean;
    readonly textChannel: TextChannel | undefined;
    readonly guild: Guild;
    readonly member: GuildMember;

    constructor (message: Message, client: SymphonyClient, argument: string) {
        this.message = message;
        this.client = client;
        this.author = message.author;
        this.argument = argument;
        this.channel = message.channel!;
        this.isFromGuild = this.channel.type === "text";
        this.textChannel = this.channel instanceof TextChannel ? this.channel : undefined;
        this.guild = message.guild!;
        this.member = message.member!;
    }

    send(content?: StringResolvable, options?: MessageOptions | MessageAttachment | MessageEmbed): Promise <Message | Message[]> {
        return this.channel.send(content, options);
    }

    reply(content?: StringResolvable, options?: MessageOptions) {
        return this.message.reply(content, options);
    }
}