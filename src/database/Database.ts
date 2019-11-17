import configTemplate from "../Config";
import { IFunctionResult } from "../ConfigHandler";
import { MongoClient, Db } from "mongodb";

export default class Database {
    private readonly client: MongoClient;
    private readonly database: Db;
    
    constructor (client: MongoClient, database: Db) {
        this.client = client;
        this.database = database;
    }
    
    public static async getClient(config: IFunctionResult<typeof configTemplate>) {
        const { username, password, authenticationDatabase, shards } = config.database;

        function mongoUrlEncoder(str: string) {
            return str.replace(/@/g, "%40")
                      .replace(/:/g, "%3A")
                      .replace(/\//g, "%2F")
                      .replace(/%/g, "%25")
        }
        
        const client = await MongoClient.connect(`mongodb://${mongoUrlEncoder(username)}:${mongoUrlEncoder(password)}@${shards.map(({host, port}) => host + ":" + port).join(",")}/${authenticationDatabase}`);
        const database = client.db(config.database.database);
        
        return { client: client, database: database };
    }
}