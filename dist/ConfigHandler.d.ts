interface FunctionBase {
    (value: any, key: string): boolean | string[];
    readonly theName: string;
}
export interface Function<T> {
    (value: any, key: string): boolean | string[];
    trueName: string;
    defaultValue: T;
}
export declare type FunctionType<T> = T extends Function<infer U> ? U : never;
interface FunctionTemplate {
    [key: string]: Function<any>;
}
export declare type FunctionResult<T> = {
    [key in keyof T]: FunctionType<T[key]>;
};
export declare const base: {
    boolean: FunctionBase;
    number: FunctionBase;
    string: FunctionBase;
};
export declare function boolean(defaultValue: boolean): Function<boolean>;
export declare function number(defaultValue: number): Function<number>;
export declare function string(defaultValue: string): Function<string>;
export declare function object<T extends FunctionTemplate>(template: T): Function<FunctionResult<T>>;
export declare function optional<T>(type: FunctionBase, defaultValue?: T | null): Function<T | null | undefined>;
export declare function optionalObject<T extends FunctionTemplate>(template: T, defaultValue?: boolean): Function<T | null | undefined>;
export declare function arrayWithOptional<T>(type: FunctionBase, defaultValue: (T | null | undefined)[]): Function<(T | null | undefined)[]>;
export declare function arrayWithOptionalObject<T extends FunctionTemplate>(template: T, defaultValue?: boolean): Function<(FunctionResult<T> | null | undefined)[]>;
export declare function array<T>(type: FunctionBase, defaultValue?: T[]): Function<T[]>;
export declare function optionalArray<T>(type: FunctionBase, defaultValue?: T[] | null | undefined): Function<T | null | undefined>;
export declare function objectArray<T extends FunctionTemplate>(template: T, defaultValue?: boolean): Function<FunctionResult<T>[]>;
export declare function optionalObjectArray<T extends FunctionTemplate>(template: T, defaultValue?: boolean): Function<FunctionResult<T>[] | null | undefined>;
export declare function generateConfig(file: string, template: FunctionTemplate): void;
export declare function getConfig<T extends FunctionTemplate>(file: string, template: T): FunctionResult<T> | undefined;
export {};
