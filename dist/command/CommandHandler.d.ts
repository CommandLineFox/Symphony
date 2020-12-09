import BotClient from "../BotClient";
export default class CommandHandler {
    private readonly client;
    private readonly mentions;
    constructor(client: BotClient);
    private handleMessage;
    private handlePrefix;
    private handleMention;
}
