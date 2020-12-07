declare const _default: {
    token: import("./ConfigHandler").Function<string>;
    prefix: import("./ConfigHandler").Function<string>;
    owners: import("./ConfigHandler").Function<unknown[]>;
    database: import("./ConfigHandler").Function<import("./ConfigHandler").FunctionResult<{
        name: import("./ConfigHandler").Function<string>;
        url: import("./ConfigHandler").Function<string>;
        mongoOptions: import("./ConfigHandler").Function<import("./ConfigHandler").FunctionResult<{
            useUnifiedTopology: import("./ConfigHandler").Function<boolean>;
        }>>;
    }>>;
    lavalink: import("./ConfigHandler").Function<import("./ConfigHandler").FunctionResult<{
        auth: import("./ConfigHandler").Function<string>;
        name: import("./ConfigHandler").Function<string>;
        host: import("./ConfigHandler").Function<string>;
        port: import("./ConfigHandler").Function<number>;
    }>[]>;
};
export default _default;
