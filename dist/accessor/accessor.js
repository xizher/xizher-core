"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Accessor = void 0;
const evented_1 = __importDefault(require("../evented"));
class Accessor extends evented_1.default {
    constructor() {
        super(...arguments);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.declareName = 'Accessor';
        /** 观测处理器集合 */
        this._handles = new Set();
    }
    static observe(cls) {
        return new Proxy(cls, {
            construct(target, args) {
                const obj = new target(...args);
                return new Proxy(obj, {
                    set: (target, key, value, receiver) => {
                        const oldValue = target[key];
                        target._handles.forEach((handle) => {
                            if (handle.propName === key) {
                                handle.callback(value, oldValue, key, target);
                            }
                        });
                        return Reflect.set(target, key, value, receiver);
                    },
                });
            },
        });
    }
    get(propName) {
        return this[propName];
    }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    set(arg0, propValue) {
        if (typeof arg0 !== 'string') {
            for (const key in arg0) {
                this.set(key, arg0[key]); // eslint-disable-line @typescript-eslint/no-explicit-any
            }
            return this;
        }
        this[arg0] = propValue;
        return this;
    }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    watch(arg0, callback) {
        const handles = [];
        const propNames = Array.isArray(arg0) ? [...arg0] : [arg0];
        propNames.forEach(propName => {
            const handle = { propName, callback };
            handles.push(handle);
            this._handles.add(handle);
        });
        const remove = () => {
            handles.forEach(h => {
                this._handles.delete(h);
            });
        };
        return { remove };
    }
}
exports.Accessor = Accessor;
exports.default = Accessor.observe(Accessor);
