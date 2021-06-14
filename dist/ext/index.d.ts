import extArray, { IArrayExtension } from './extensions/array.ext';
import extDate, { IDateExtension } from './extensions/date.ext';
import extNumber, { INumberExtension } from './extensions/number.ext';
import extString, { IStringExtension } from './extensions/string.ext';
export { extArray, extDate, extNumber, extString, IArrayExtension, IDateExtension, INumberExtension, IStringExtension, };
export declare function ext(date: Date): IDateExtension;
export declare function ext(str: string): IStringExtension;
export declare function ext(num: number): INumberExtension;
export declare function ext<T>(arr: T[]): IArrayExtension<T>;
export default ext;