"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-undef */
const array_ext_1 = __importDefault(require("./array.ext"));
test('insert() can run', () => {
    const arr = [1, 0, 2];
    array_ext_1.default(arr).insert(3, 9);
    expect(arr[3]).toBe(9);
    array_ext_1.default(arr).insert(0, -1);
    expect(arr[0]).toBe(-1);
});
test('removeIndex() can run', () => {
    const arr = [1, 0, 2];
    array_ext_1.default(arr).removeIndex(2);
    expect(arr.length).toBe(2);
    const v = array_ext_1.default(arr).removeIndex(0, true);
    expect(v).toBe(1);
});
test('clear() can run', () => {
    const arr = [1, 0, 2];
    array_ext_1.default(arr).clear();
    expect(arr.length).toBe(0);
});
test('reset() can run', () => {
    const arr = [1, 0, 2];
    array_ext_1.default(arr).reset(3, 3, 3, 3);
    expect(arr.length).toBe(4);
});
test('removeValue() can run', () => {
    const arr = [1, 0, 2, 0, 2];
    array_ext_1.default(arr).removeValue(0);
    expect(arr.length).toBe(4);
    array_ext_1.default(arr).removeValue(2, true);
    expect(arr.length).toBe(2);
});
test('unique() can run', () => {
    const arr = [1, 0, 2, 0, 2];
    array_ext_1.default(arr).unique();
    expect(arr.length).toBe(3);
});
test('getUnique() can run', () => {
    const arr = [1, 0, 2, 0, 2];
    const newArr = array_ext_1.default(arr).getUnique();
    expect(arr.length).toBe(5);
    expect(newArr.length).toBe(3);
});
test('unique() can run', () => {
    const arr = [1, 0, 2, 0, 2];
    const arr2 = [1, 0, 2, 0, 2];
    const b = array_ext_1.default(arr).equal(arr2);
    expect(b).toBe(true);
    expect(array_ext_1.default(arr).equal([1, 0, 2, 0, '2'])).toBe(false);
    expect(array_ext_1.default(arr).equal([1, 0, 2, '0'])).toBe(false);
});
test('findItem() can run', () => {
    const arr = [{ a: 1, b: 2 }, { a: 2, b: 3 }];
    const ret = array_ext_1.default(arr).findItem('a', 1);
    expect(ret.a).toBe(1);
    expect(ret.b).toBe(2);
    expect(array_ext_1.default(arr).findItem('a', 3)).toBe(null);
});
test('findItems() can run', () => {
    const arr = [{ a: 1, b: 2 }, { a: 2, b: 3 }, { a: 2, b: 4 }];
    const ret = array_ext_1.default(arr).findItems('a', 2);
    expect(ret.length).toBe(2);
    expect(ret[0].b).toBe(3);
    expect(ret[1].b).toBe(4);
});
test('propToArr() can run', () => {
    const arr = [{ a: 1, b: 2 }, { a: 2, b: 3 }, { a: 2, b: 4 }];
    const ret = array_ext_1.default(arr).propToArr('a');
    expect(ret.length).toBe(3);
    expect(ret[0]).toBe(1);
    expect(ret[1]).toBe(2);
    expect(ret[2]).toBe(2);
});
test('last() can run', () => {
    const arr = [1, 0, 2, 0, 2];
    const last = array_ext_1.default(arr).last();
    expect(last).toBe(2);
});
