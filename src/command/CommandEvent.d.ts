import { Message, StringResolvable, MessageOptions, Attachment, RichEmbed, TextChannel, DMChannel, GroupDMChannel, User, Guild, GuildMember } from "discord.js";
import EeveeClient from "../EeveeClient";
export default class CommandEvent {
    readonly message: Message;
    readonly client: EeveeClient;
    readonly author: User;
    readonly argument: string;
    readonly channel: TextChannel | DMChannel | GroupDMChannel;
    readonly isFromGuild: boolean;
    readonly textChannel: TextChannel | undefined;
    readonly guild: Guild;
    readonly member: GuildMember;
    constructor(message: Message, client: EeveeClient, argument: string);
    send(content?: StringResolvable, options?: MessageOptions | Attachment | RichEmbed): Promise<Message | Message[]>;
    reply(content?: StringResolvable, options?: MessageOptions): Promise<Message | Message[]>;
}
