import { IBaseClass } from '../interfaces';
import { ICallbackFunc, IHandle } from './evented.interface';
/**
 * 事件者类，用以观测监听对象实例产生的事件
 */
export declare class Evented<T> implements IBaseClass {
    readonly declareName = "Evented";
    /** 监听处理函数存储池 */
    private _eventPool;
    /**
     * 绑定监听函数
     * @param name 监听类型名
     * @param callback 监听回调函数
     */
    on<K extends keyof T>(name: K, callback: ICallbackFunc<T[K], K, this>): IHandle;
    /**
     * 移除监听函数
     * @param name 监听类型名
     * @param callback 监听回调函数（不指定者移除所有）
     */
    off<K extends keyof T>(name: K, callback?: ICallbackFunc<T[K], K, this>): void;
    /**
     * 触发监听函数
     * @param name 监听函数名
     * @param data 数据
     */
    fire<K extends keyof T>(name: K, data?: T[K]): void;
    /**
     * 绑定监听函数（仅监听一次）
     * @param name 监听类型名
     * @param callback 监听回调函数
     */
    once<K extends keyof T>(name: K, callback: ICallbackFunc<T[K], K, this>): void;
}
export default Evented;
