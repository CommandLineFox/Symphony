import configTemplate from "../Config";
import { IFunctionResult } from "../ConfigHandler";
export default class Database {
    private readonly database;
    private constructor();
    getAll(collection: string): Promise<object[]>;
    getOne(collection: string, id: string): Promise<object | null>;
    remove(collection: string, id: string): void;
    save(collection: string, data: {
        [key: string]: any;
        id: string;
    }): void;
    static getDatabase(config: IFunctionResult<typeof configTemplate>): Promise<Database>;
}
