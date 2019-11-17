interface IFunctionBase {
    (value: any, key: string): boolean | string[];
    readonly theName: string;
}
export interface IFunction<T> {
    (value: any, key: string): boolean | string[];
    readonly trueName: string;
    readonly defaultValue: T;
}
export declare type IFunctionType<T> = T extends IFunction<infer U> ? U : never;
declare type IFunctionTemplate = {
    [key: string]: IFunction<any>;
};
export declare type IFunctionResult<T> = {
    [key in keyof T]: IFunctionType<T[key]>;
};
export declare const base: {
    boolean: IFunctionBase;
    number: IFunctionBase;
    string: IFunctionBase;
};
export declare function boolean(defaultValue: boolean): IFunction<boolean>;
export declare function number(defaultValue: number): IFunction<number>;
export declare function string(defaultValue: string): IFunction<string>;
export declare function object<T extends IFunctionTemplate>(template: T): IFunction<IFunctionResult<T>>;
export declare function optional<T>(type: IFunctionBase, defaultValue?: T | null): IFunction<T | null | undefined>;
export declare function optionalObject<T extends IFunctionTemplate>(template: T, defaultValue?: boolean): IFunction<T | null | undefined>;
export declare function arrayWithOptional<T>(type: IFunctionBase, defaultValue: (T | null | undefined)[]): IFunction<(T | null | undefined)[]>;
export declare function arrayWithOptionalObject<T extends IFunctionTemplate>(template: T, defaultValue?: boolean): IFunction<(IFunctionResult<T> | null | undefined)[]>;
export declare function array<T>(type: IFunctionBase, defaultValue?: T[]): IFunction<T[]>;
export declare function optionalArray<T>(type: IFunctionBase, defaultValue?: T[] | null | undefined): IFunction<T | null | undefined>;
export declare function objectArray<T extends IFunctionTemplate>(template: T, defaultValue?: boolean): IFunction<IFunctionResult<T>[]>;
export declare function optionalObjectArray<T extends IFunctionTemplate>(template: T, defaultValue?: boolean): IFunction<IFunctionResult<T>[] | null | undefined>;
export declare function generateConfig(file: string, template: IFunctionTemplate): void;
export declare function getConfig<T extends IFunctionTemplate>(file: string, template: T): IFunctionResult<T> | undefined;
export {};
