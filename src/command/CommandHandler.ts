import SymphonyClient from "~/SymphonyClient";
import CommandRegistry from "@command/CommandRegistry";
import {Message} from "discord.js";
import CommandEvent from "@command/CommandEvent";

export default class CommandHandler {
    private readonly client: SymphonyClient;
    private readonly mentions: string[];

    public constructor(client: SymphonyClient) {
        this.client = client;
        this.mentions = [`<@${this.client.user!.id}>`, `<@!${this.client.user!.id}>`];
        client.on("message", async (message) => {
            await this.handleMessage(message);
        });
    }

    private async handleMessage(message: Message): Promise<void> {
        const content = message.content;
        const prefix = this.client.getPrefix(message.guild!);

        if (content.startsWith(prefix)) {
            await this.handlePrefix(message, content.slice(prefix.length).trim());
        } else if (content.startsWith(this.mentions[0])) {
            await this.handleMention(message, content.slice(this.mentions![0].length).trim());
        } else if (content.startsWith(this.mentions[1])) {
            await this.handleMention(message, content.slice(this.mentions![1].length).trim());
        }
    }

    private async handlePrefix(message: Message, content: string): Promise<void> {
        if (content.length === 0) {
            return;
        }

        const [trigger, args = ""] = content.split(/\s+([\s\S]+)/);
        const command = CommandRegistry.getCommand(trigger);

        if (command === undefined) {
            return;
        }

        await command.execute(new CommandEvent(message, this.client, args));
    }

    private async handleMention(message: Message, content: string): Promise<void> {
        if (content.length === 0) {
            await message.reply(`My prefix here is \`${this.client.getPrefix(message.guild!)}\``);
            return;
        }
        await this.handlePrefix(message, content);
    }
}
