import { Client, ClientOptions, User, Guild } from "discord.js";
import configTemplate from "./Config";
import { IFunctionType } from "./ConfigHandler";
declare type configTemplate = typeof configTemplate;
export default class EeveeClient extends Client {
    readonly config: {
        [key in keyof configTemplate]: IFunctionType<configTemplate[key]>;
    };
    constructor(config: {
        [key in keyof configTemplate]: IFunctionType<configTemplate[key]>;
    }, options?: ClientOptions);
    isOwner(user: User): boolean;
    getPrefix(guild?: Guild): string;
}
export {};
