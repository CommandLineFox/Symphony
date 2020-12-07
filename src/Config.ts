import {string, base, array, object, number, objectArray, boolean} from "~/ConfigHandler";

export default {
    token: string(""),
    prefix: string("!"),
    owners: array(base.string),
    database: object({
        name: string(""),
        url: string(""),
        mongoOptions: object({
            useUnifiedTopology: boolean(true)
        })
    }),
    lavalink: objectArray({
        auth: string("Passw0rd!"),
        name: string("Symphony"),
        host: string("localhost"),
        port: number(2333)
    })
};
