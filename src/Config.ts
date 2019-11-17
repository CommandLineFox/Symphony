import { string, base, array, object, number, objectArray} from "./ConfigHandler";

export default {
    token: string(""),
    prefix: string("!"),
    owners: array(base.string),
    database: object({
        username: string("Eevee"),
        password: string("Passw0rd!"),
        database: string("Eevee"),
        authenticationDatabase: string("admin"),
        shards: objectArray({
            host: string("localhost"),
            port: number(27017)
        })
    })
}