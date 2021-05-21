# @xizher/core
## 介绍

JavaScript核心库

## 安装

```bash
npm install --save @xizher/core
```

## 目录

- `Evented` 事件者类
- `Watcher` 观测者类

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

### 观测者类 Watcher

观测者类，用以观测对象实例的成员值变化

| 类成员  | 描述           |
| ------- | -------------- |
| get()   | 获取类成员值   |
| set()   | 设置类成员值   |
| watch() | 监听类成员变化 |

使用案例

```typescript
import { Watcher } from '@xizher/core'

class TestClass extends Watcher {
  public num = 0
  public str = 'a'
  public bool = true
}

test('通过watch方法对类成员进行监听', () => {
  const testObj = new TestClass()
  let count = 0
  testObj.watch('num', () => count++)
  testObj.num = 1
  testObj.set('num', 2)
  testObj.set({ num: -1 })
  expect(count).toBe(3)
})

test('通过remove方法接触对类成员的监听', () => {
  const testObj = new TestClass()
  let count = 0
  const handle = testObj.watch('str', () => count++)
  testObj.str = '1'
  testObj.set('str', 'feawf')
  testObj.set({ str: '  ' })
  handle.remove()
  testObj.set('str', 'feawf')
  testObj.str = '1'
  expect(count).toBe(3)
})

test('通过watch方法对多个类成员进行监听', () => {
  const testObj = new TestClass()
  let count = 0
  testObj.watch(['num', 'str', 'bool'], () => count++)
  testObj.set('str', 'feawf')
  testObj.num = 3
  testObj.set({ bool: false })
  testObj.set({ bool: false })
  expect(count).toBe(4)
})

test('watch监听回调函数的参数对象值', () => {
  const testObj = new TestClass()
  const oldStr = testObj.str
  const newStr = 'testObj.str'
  let newVal, olVal, propName, target
  testObj.watch('str', (...args) => {
    newVal = args[0]
    olVal = args[1]
    propName = args[2]
    target = args[3]
  })
  testObj.str = newStr
  expect(newVal).toBe(newStr)
  expect(olVal).toBe(oldStr)
  expect(propName).toBe('str')
  expect(target === testObj).toBe(false) // proxy代理对象不等于源对象
})

test('watch回调函数的target参数问题', () => {
  const testObj = new TestClass()
  let target, count = 0
  testObj.watch('num', (...args) => {
    count++
    target = args[3]
  })
  testObj.num = 3 // 触发监听
  target.num = 2 // 不触发监听
  expect(count).toBe(1)
  expect(testObj.num).toBe(2)
})
```

