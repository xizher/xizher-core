import Evented from '../evented';
import { Watcher, IWatchHandle } from '../watcher';
export declare class Accessor<T> extends Evented<T> implements Watcher {
    static observe<T>(cls: T): T;
    readonly declareName = "Accessor";
    /** 观测处理器集合 */
    private _handles;
    get<T extends keyof this>(propName: T): this[T];
    set<T extends keyof this>(propName: T, propValue: this[T]): this;
    set(prop: {
        [P in keyof this]?: this[P];
    }): this;
    watch<T extends keyof this>(propName: T, callback: (value: this[T], oldValue: this[T], propertyName: T, target: this) => void): IWatchHandle;
    watch<T extends keyof this>(propNames: T[], callback: (value: this[T], oldValue: this[T], propertyName: T, target: this) => void): IWatchHandle;
}
declare const _default: typeof Accessor;
export default _default;
