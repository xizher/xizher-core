"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-undef */
const number_ext_1 = __importDefault(require("./number.ext"));
test('divide() can run', () => {
    const num = 7;
    expect(number_ext_1.default(num).divide(3)).toBe(2);
});
test('floor() can run', () => {
    const num = 7.9;
    expect(number_ext_1.default(num).floor()).toBe(7);
});
test('ceil() can run', () => {
    const num = 7.1;
    expect(number_ext_1.default(num).ceil()).toBe(8);
});
test('abs() can run', () => {
    const num = -7.1;
    expect(number_ext_1.default(num).abs()).toBe(7.1);
});
test('round() can run', () => {
    expect(number_ext_1.default(7.4).round()).toBe(7);
    expect(number_ext_1.default(7.5).round()).toBe(8);
    expect(number_ext_1.default(7.5).round(-1)).toBe(10);
    expect(number_ext_1.default(7.54).round(1)).toBe(7.5);
});
test('toDate() can run', () => {
    expect(number_ext_1.default(0).toDate().getFullYear()).toBe(1970);
});
test('toDateFormat() can run', () => {
    expect(number_ext_1.default(0).toDateFormat('yyyy')).toBe('1970');
});
test('toCashString() can run', () => {
    expect(number_ext_1.default(100000000).toCashString()).toBe('100,000,000');
});
test('toDateFormat() can run', () => {
    expect(number_ext_1.default(100000000).toChineseString()).toBe('一亿');
});
