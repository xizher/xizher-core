import Observable from './observable';
interface Prop {
    'inc': {
        value: number;
    };
    'dev': {
        val: number;
    };
    'change': void;
}
export declare class TestClass<T extends Prop> extends Observable<T & Prop> {
    private _value;
    constructor();
    inc(): void;
    dec(): void;
}
export {};
