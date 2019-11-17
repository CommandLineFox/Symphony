import SymphonyClient from "../SymphonyClient";
export default class CommandHandler {
    private readonly client;
    private mentions;
    constructor(client: SymphonyClient);
    private handleMessage;
    private handlePrefix;
    private handleMention;
}
