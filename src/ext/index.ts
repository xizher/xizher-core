import extArray, { IArrayExtension } from './extensions/array.ext'
import extDate, { IDateExtension } from './extensions/date.ext'
import extNumber, { INumberExtension } from './extensions/number.ext'
import extString, { IStringExtension } from './extensions/string.ext'

export {
  extArray,
  extDate,
  extNumber,
  extString,
  IArrayExtension,
  IDateExtension,
  INumberExtension,
  IStringExtension,
}

function ext (date: Date) : IDateExtension
function ext (str: string) : IStringExtension
function ext (num: number) : INumberExtension
function ext<T> (arr: T[]) : IArrayExtension<T>
function ext<T> (
  _this: Date | string | number | T[]
) : IDateExtension | IStringExtension | INumberExtension | IArrayExtension<T> {
  if (_this instanceof Date) {
    return extDate(_this)
  }
  if (typeof _this === 'string') {
    return extString(_this)
  }
  if (typeof _this === 'number') {
    return extNumber(_this)
  }
  if (Array.isArray(_this)) {
    return extArray(_this)
  }
}

export default ext
