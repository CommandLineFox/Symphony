import EeveeClient from "../EeveeClient";
import { Message } from "discord.js";

export default class CommandHandler {
    private readonly client: EeveeClient;
    private mentions: string[];

    constructor (client: EeveeClient) {
        this.client = client;
        this.mentions = [ `<@${this.client.user.id}>`, `<@!${this.client.user.id}>` ];
        client.on("message", this.handleMessage);
    }

    private handleMessage(message: Message) {
        const content = message.content;
        const prefix = this.client.getPrefix(message.guild);

        if (content.startsWith(prefix)) {
            this.handlePrefix(message, content.slice(prefix.length).trim());
        }

        else if (content.startsWith(this.mentions[0])) {
            this.handleMention(message, content.slice(this.mentions![0].length).trim());
        }

        else if (content.startsWith(this.mentions[1])) {
            this.handleMention(message, content.slice(this.mentions![1].length).trim());
        }
    }

    private handlePrefix(message: Message, content: string) {
        
    }

    private handleMention(message: Message, content: string) {
        if (content.length === 0) {
            message.reply(`My prefix here is \`${this.client.getPrefix(message.guild)}>\``);
            return;
        }
        this.handlePrefix(message, content);
    }
}