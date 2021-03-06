import { IBaseClass } from '../interfaces'
import { ICallbackFunc, IHandle } from './observable.interface'

/**
 * 事件者类，用以观测监听对象实例产生的事件
 */
export class Observable <T> implements IBaseClass { // eslint-disable-line @typescript-eslint/no-explicit-any

  public readonly declareName = 'Observable'

  /** 监听处理函数存储池 */
  private _eventPool : Map<keyof T, ICallbackFunc<any, string, this>[]> = new Map() // eslint-disable-line @typescript-eslint/no-explicit-any

  /**
   * 绑定监听函数
   * @param name 监听类型名
   * @param callback 监听回调函数
   */
  public on <K extends keyof T> (
    name: K,
    callback: ICallbackFunc<T[K], K, this>
  ) : IHandle {
    const key = (name as string).toLowerCase() as K
    if (!this._eventPool.has(key)) {
      this._eventPool.set(name, [])
    }
    this._eventPool.get(key).push(callback)
    return {
      remove: () => this.off(name, callback)
    }
  }

  /**
   * 移除监听函数
   * @param name 监听类型名
   * @param callback 监听回调函数（不指定者移除所有）
   */
  public off <K extends keyof T> (
    name: K,
    callback?: ICallbackFunc<T[K], K, this>
  ) : void {
    const key = (name as string).toLowerCase() as K
    if (!this._eventPool.has(key)) {
      return
    }
    const eventList = this._eventPool.get(key)
    if (eventList.length === 0) {
      return
    }
    if (!callback) {
      eventList.splice(0, eventList.length)
      return
    }
    for (let i = 0; i < eventList.length; i++) {
      if (callback === eventList[i]) {
        eventList.splice(i--, 1) // i-- 预防遍历丢失情况
      }
    }
  }

  /**
   * 触发监听函数
   * @param name 监听函数名
   * @param data 数据
   */
  public fire <K extends keyof T> (
    name: K,
    data?: T[K]
  ) : void {
    const key = (name as string).toLowerCase() as K
    if (!this._eventPool.has(key)) {
      return
    }
    const eventList = this._eventPool.get(key)
    let len = eventList.length
    if (len === 0) {
      return
    }
    const params = Object.assign({
      name: key,
      origin: this
    }, data || {})
    for (let i = 0; i < len; i++) {
      const callback = eventList[i]
      callback(params)
      if (eventList.length < len) {
        i--
        len = eventList.length
      }
    }
  }

  /**
   * 绑定监听函数（仅监听一次）
   * @param name 监听类型名
   * @param callback 监听回调函数
   */
  public once <K extends keyof T> (
    name: K,
    callback: ICallbackFunc<T[K], K, this>
  ) : void {
    const key = (name as string).toLowerCase() as K
    const nfn = (...args: unknown[]) => {
      this.off(key, nfn)
      callback.apply(this, args)
    }
    this.on(key, nfn)
  }

}

export default Observable
