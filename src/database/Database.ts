import configTemplate from "../Config";
import { IFunctionResult } from "../ConfigHandler";

export default class Database {
    username: any;
    password: any;
    shards: any;
    database: any;
    authenticationDatabase: any;
    constructor (config: IFunctionResult<typeof configTemplate>) {
        const { username, password, database, authenticationDatabase, shards } = config.database;

        console.log(`mongodb://${username}:${password}@${shards.map(({host, port}) => host + ":" + port).join(",")}/${database}?authSource=${authenticationDatabase}`);
    }
}