# @xizher/core
## 介绍

JavaScript核心库

## 安装

```bash
npm install --save @xizher/core
```

## 使用

### 事件者类 Evented

事件者类，用以观测监听对象实例产生的事件，参考[leaflet的Evented类](https://leafletjs.com/reference-1.7.1.html#evented)

| 类成员 | 描述                     |
| ------ | ------------------------ |
| on()   | 绑定监听函数             |
| off()  | 移除监听函数             |
| fire() | 触发监听函数             |
| once() | 绑定监听函数（仅监听一次 |

使用案例

```typescript
import { Evented } from '@xizher/core'
// import { Evented } from '@xizher/es' // in es
// import Evented from '@xizher/es/Evented'
// import { Evented } from '@xizher/dist' // in cmj
// import Evented from '@xizher/dist/Evented'

interface Prop {
  'inc': { value: number },
  'dev': { val: number },
  'change': void
}

export class TestClass<T extends Prop> extends Evented<T & Prop> {
  private _value = 1
  constructor () {
    super()
  }
  public inc () : void {
    this._value++
    this.fire('inc', { value: this._value })
    this.fire('change')
  }
  public dec () : void {
    this._value--
    this.fire('dev', { val: this._value })
    this.fire('change')
  }
}

const testObj = new TestClass()

let count = 0
function func (e) {
  console.log(e.name) // output: inc
  console.log(e.origin === testObj) // output: true
  console.log(e.value) // output: 2
  count++
}
const handle = testObj.on('inc', func)
testObj.inc() // count will be 1

handle.remove()
// or testObj.off('inc', func)
// or test.off('inc') // 将移除“inc”事件的所有监听函数
testObj.inc() // count still 1

const handle = testObj.once('inc', func)
testObj.inc() // count will be 2
testObj.inc() // count still 2

```

