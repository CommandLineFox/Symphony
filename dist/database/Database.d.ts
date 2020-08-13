import { Db, MongoClientOptions } from 'mongodb';
interface DatabaseConfig {
    url: string;
    name: string;
    mongoOptions?: MongoClientOptions;
}
export declare class Database {
    protected config: DatabaseConfig;
    db: Db;
    constructor(config: DatabaseConfig);
    connect(): Promise<void>;
}
export {};
