# @xizher/core

[TOC]

## 介绍

`@xizher/core`，使用模块化的方式集成、封装各种JavaScript通用的、可复用的函数。

## 安装

```shell
npm install --save @xizher/core
```

## 调用方式

```javascript
import { ... } from '@xizher/core'
// or
import ... from '@xizher/core/...path'
```

## 接口文档

### `Observable` 监听者类

事件者类，用以观测监听对象实例产生的事件，参考[leaflet的Evented类](https://leafletjs.com/reference-1.7.1.html#evented)以及openlayers的Observable类

| 类成员 | 描述                     |
| ------ | ------------------------ |
| on()   | 绑定监听函数             |
| off()  | 移除监听函数             |
| fire() | 触发监听函数             |
| once() | 绑定监听函数（仅监听一次 |

#### `on()`

绑定监听函数

```js
import Observation from '@xizher/core/observable'



```

