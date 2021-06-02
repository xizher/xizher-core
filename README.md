# @xizher/core
## 介绍

JavaScript核心库

## 安装

```bash
npm install --save @xizher/core
```

## 目录

- `Observable` 事件者类
- `Watcher` 观测者类
- `Accessor` 先辈类
- `baseUtils` 基础工具集
- `ext` js原生对象扩展函数
- `axios` axios二次集成

## 使用

### 事件者类 Observable

事件者类，用以观测监听对象实例产生的事件，参考[leaflet的Observable类](https://leafletjs.com/reference-1.7.1.html#Observable)

| 类成员 | 描述                     |
| ------ | ------------------------ |
| on()   | 绑定监听函数             |
| off()  | 移除监听函数             |
| fire() | 触发监听函数             |
| once() | 绑定监听函数（仅监听一次 |

使用案例

```typescript
import { Observable } from '@xizher/core'
// import { Observable } from '@xizher/es' // in es
// import Observable from '@xizher/es/Observable'
// import { Observable } from '@xizher/dist' // in cmj
// import Observable from '@xizher/dist/Observable'

interface Prop {
  'inc': { value: number },
  'dev': { val: number },
  'change': void
}

export class TestClass<T extends Prop> extends Observable<T & Prop> {
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

### 先辈类 Accessor

实现`Watcher`类的方法，并集成`Observable`类

### 基础工具集 baseUtils

```javascript
import { ... } from '@xizher/core/utils'
```

| 成员                   | 说明                                 |
| ---------------------- | ------------------------------------ |
| deepCopyJSON ()        | 深度复制（采用JSON解析方式）         |
| deepCopy ()            | 深度复制（采用递归式）               |
| createGuid ()          | 创建GUID                             |
| createIntRandom ()     | 创建指定范围的随机整数               |
| isFromMobileBrowser () | 判断网页是否通过移动端设备打开       |
| copyText ()            | 复制文本                             |
| $extend ()             | 对象扩展（JQuery $.extend 实现代码） |
| debounce ()            | 防抖                                 |
| throttle ()            | 节流                                 |
| loadCss ()             | 加载css                              |
| loadJs ()              | 加载js                               |
| getArrayItemRandom ()  | 随机获取数组中的一个子集             |

#### cookieUtils

| 成员          | 说明                                 |
| ------------- | ------------------------------------ |
| set ()        | 设置Cookie                           |
| del ()        | 删除Cookie                           |
| get ()        | 获取Cookie                           |
| getUseJSON () | 取Cookie（结果为经过JSON解析的对象） |

#### storageUtils

| 成员                  | 说明                           |
| --------------------- | ------------------------------ |
| local.set ()          | 设置LocalStorage               |
| local.get ()          | 获取LocalStorage               |
| local.getUseJSON ()   | 获取经过JSON解析的LocalStorage |
| local.remove()        | 移除指定LocalStorage           |
| local.clear ()        | 清空LocalStorage               |
| session.set ()        | 设置SessionStorage             |
| session.get ()        | 获取SessionStorage             |
| session.getUseJSON () | 获取经过JSON解析的LocalStorage |
| session.remove ()     | 移除指定SessionStorage         |
| session.clear ()      | 清空SessionStorage             |

#### descriptoUtils

| 成员        | 说明                     |
| ----------- | ------------------------ |
| AutoBind () | 自动绑定this上下文装饰器 |
| Debounce () | 防抖                     |
| Throttle () | 节流                     |

#### cryptoUtils

| 成员            | 说明        |
| --------------- | ----------- |
| setGlobelKey () | 设置全局Key |
| setGlobelIV ()  | 设置全局IV  |
| encrypto ()     | 加密字符串  |
| decrypto ()     | 解密字符串  |

### JS原生对象扩展函数 ext

```javascript
import ext from '@xizher/core/ext'
```

| 成员                                | 说明                     |
| ----------------------------------- | ------------------------ |
| ext(arg0: number).divide()          | 整除                     |
| ext(arg0: number).floor()           | 向下取整                 |
| ext(arg0: number).ceil()            | 向上取整                 |
| ext(arg0: number).abs()             | 绝对值                   |
| ext(arg0: number).round()           | 保留位                   |
| ext(arg0: number).toDate()          | 转化为日期对象           |
| ext(arg0: number).toDateFormat()    | 转化为日期格式化字符串   |
| ext(arg0: number).toCashString()    | 转化为现金字符串         |
| ext(arg0: number).toChineseString() | 转化为中文数字字符串     |
| ext(arg0: Date).format()            | 日期格式化字符串         |
| ext(arg0: Date).getNextDate()       | 获取前后日期             |
| ext(arg0: Date).getMonth()          | 获取月份                 |
| ext(arg0: string).trimAll()         | 清空所有空格             |
| ext(arg0: string).toDate()          | 转化为日期对象           |
| ext(arg0: string).toDateFormat()    | 转化为日期格式化字符串   |
| ext(arg0: Array).insert()           | 插入对象                 |
| ext(arg0: Array).removeIndex()      | 移除指定位置的对象       |
| ext(arg0: Array).removeValue()      | 移除指定的对象           |
| ext(arg0: Array).unique()           | 去重处理                 |
| ext(arg0: Array).getUnique()        | 获取唯一值               |
| ext(arg0: Array).equal()            | 数组间是否相等           |
| ext(arg0: Array).findItem()         | 查找符合条件的第一个对象 |
| ext(arg0: Array).findItems()        | 查找符合条件的所有对象   |
| ext(arg0: Array).propToArr()        | 对象属性转数组           |
| ext(arg0: Array).last()             | 数据的最后一位           |

