declare const _default: {
    token: import("./ConfigHandler").IFunction<string>;
    prefix: import("./ConfigHandler").IFunction<string>;
    owners: import("./ConfigHandler").IFunction<unknown[]>;
    database: import("./ConfigHandler").IFunction<import("./ConfigHandler").IFunctionResult<{
        username: import("./ConfigHandler").IFunction<string>;
        password: import("./ConfigHandler").IFunction<string>;
        database: import("./ConfigHandler").IFunction<string>;
        authenticationDatabase: import("./ConfigHandler").IFunction<string>;
        shards: import("./ConfigHandler").IFunction<import("./ConfigHandler").IFunctionResult<{
            host: import("./ConfigHandler").IFunction<string>;
            port: import("./ConfigHandler").IFunction<number>;
        }>[]>;
    }>>;
};
export default _default;