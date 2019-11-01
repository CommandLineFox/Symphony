import { Client, ClientOptions } from "discord.js";

export default class EeveeClient extends Client {
    constructor(options?: ClientOptions) {
        super(options);
    }
}