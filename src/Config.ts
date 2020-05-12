import { string, base, array, object, number, objectArray } from "~/ConfigHandler";

export default {
    token: string(""),
    prefix: string("!"),
    owners: array(base.string),
    database: object({
        user: string("Symphony"),
        password: string("Passw0rd!"),
        database: string("mongo"),
        authenticationDatabase: string("admin"),
        shards: objectArray({
            host: string("localhost"),
            port: number(27017)
        })
    }),
    lavalink: objectArray({
        auth: string("Passw0rd!"),
        name: string("Symphony"),
        host: string("localhost"),
        port: number(2333)
    })
}