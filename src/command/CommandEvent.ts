import { Message, Client, StringResolvable, MessageOptions, Attachment, RichEmbed, TextChannel, DMChannel, GroupDMChannel } from "discord.js";
import EeveeClient from "../EeveeClient";

export default class CommandEvent {
    readonly message: Message;
    readonly client: EeveeClient;
    readonly argument: string;
    readonly channel: TextChannel | DMChannel | GroupDMChannel;
    readonly isFromGuild: boolean;

    constructor (message: Message, client: Client, argument: string) {
        this.message = message;
        this.client = client;
        this.argument = argument;
        this.channel = message.channel;
        this.isFromGuild = this.channel.type === "text";
    }

    send(content?: StringResolvable, options?: MessageOptions | Attachment | RichEmbed): Promise <Message | Message[]> {
        return this.channel.send(content, options);
    }
}