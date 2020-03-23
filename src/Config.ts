import { string, base, array, object, number, objectArray} from "~/ConfigHandler";

export default {
    token: string(""),
    prefix: string("!"),
    owners: array(base.string),
    database: object({
        user: string("Symphony"),
        password: string("Passw0rd!"),
        database: string("Symphony"),
        authenticationDatabase: string("admin"),
        shards: objectArray({
            host: string("localhost"),
            port: number(27017)
        })
    })
}