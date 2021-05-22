"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-undef */
const string_ext_1 = __importDefault(require("./string.ext"));
test('trimAll() can run', () => {
    const str = '  tes  test  ';
    const newStr = string_ext_1.default(str).trimAll();
    expect(newStr).toBe('testest');
});
test('toDate() can run', () => {
    const dateStr = '2020/1/1';
    const date = string_ext_1.default(dateStr).toDate();
    expect(date.getFullYear()).toBe(2020);
});
test('toDateFormat() can run', () => {
    const dateStr = '2020/1/1';
    const year = string_ext_1.default(dateStr).toDateFormat('yyyy');
    expect(year).toBe('2020');
});
