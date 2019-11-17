import configTemplate from "../Config";
import { IFunctionResult } from "../ConfigHandler";
import { MongoClient, Db } from "mongodb";
export default class Database {
    private readonly client;
    private readonly database;
    constructor(client: MongoClient, database: Db);
    static getClient(config: IFunctionResult<typeof configTemplate>): Promise<{
        client: MongoClient;
        database: Db;
    }>;
}
