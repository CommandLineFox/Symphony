interface IFunctionBase<T> {
    (value: any, key: string): boolean | string[];
    readonly trueName: string;
}
export interface IFunction<T> extends IFunctionBase<T> {
    readonly defaultValue: T;
}
export declare type IFunctionType<T> = T extends IFunction<infer U> ? U : never;
export declare const base: {
    boolean: IFunctionBase<unknown>;
    number: IFunctionBase<unknown>;
    string: IFunctionBase<unknown>;
};
export declare function boolean(defaultValue: boolean): IFunction<boolean>;
export declare function number(defaultValue: number): IFunction<number>;
export declare function string(defaultValue: string): IFunction<string>;
export declare function optional<T>(type: IFunctionBase<T>, defaultValue?: T | null): IFunction<T | null | undefined>;
export declare function array<T>(type: IFunctionBase<T>, defaultValue?: T[]): IFunction<T[]>;
export declare function object(template: {
    [key: string]: IFunction<any>;
}): IFunction<{
    [key: string]: any;
}>;
export declare function generateConfig(file: string, template: {
    [key: string]: IFunction<any>;
}): void;
export declare function getConfig<T extends {
    [key: string]: IFunction<any>;
}>(file: string, template: T): { [key in keyof T]: IFunctionType<T[key]>; } | undefined;
export {};
