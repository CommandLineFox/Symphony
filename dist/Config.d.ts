declare const _default: {
    token: import("./ConfigHandler").IFunction<string>;
    prefix: import("./ConfigHandler").IFunction<string>;
    owners: import("./ConfigHandler").IFunction<unknown[]>;
    database: import("./ConfigHandler").IFunction<import("./ConfigHandler").IFunctionResult<{
        name: import("./ConfigHandler").IFunction<string>;
        url: import("./ConfigHandler").IFunction<string>;
        mongoOptions: import("./ConfigHandler").IFunction<import("./ConfigHandler").IFunctionResult<{
            useUnifiedTopology: import("./ConfigHandler").IFunction<boolean>;
        }>>;
    }>>;
    lavalink: import("./ConfigHandler").IFunction<import("./ConfigHandler").IFunctionResult<{
        auth: import("./ConfigHandler").IFunction<string>;
        name: import("./ConfigHandler").IFunction<string>;
        host: import("./ConfigHandler").IFunction<string>;
        port: import("./ConfigHandler").IFunction<number>;
    }>[]>;
};
export default _default;
