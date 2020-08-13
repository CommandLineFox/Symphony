import { connect, Db, MongoClientOptions } from 'mongodb';

interface DatabaseConfig {
    url: string;
    name: string;
    mongoOptions?: MongoClientOptions;
}

export class Database {
    db!: Db;
    constructor(protected config: DatabaseConfig) { }

    async connect() {
        const client = await connect(this.config.url, this.config.mongoOptions)
            .catch(err => {
                throw err;
            });
        this.db = client.db(this.config.name);
        console.log("Connected to database");
    }
}