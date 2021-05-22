"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-undef */
const date_ext_1 = __importDefault(require("./date.ext"));
test('format() can run', () => {
    const date = new Date();
    const year = date_ext_1.default(date).format('yyyy');
    const month = date_ext_1.default(date).format('M');
    const d = date_ext_1.default(date).format('d');
    const h = date_ext_1.default(date).format('h');
    const m = date_ext_1.default(date).format('m');
    const s = date_ext_1.default(date).format('s');
    const s2 = date_ext_1.default(date).format('ss');
    expect(year).toBe(date.getFullYear().toString());
    expect(month).toBe((date.getMonth() + 1).toString());
    expect(d).toBe(date.getDate().toString());
    expect(h).toBe(date.getHours().toString());
    expect(m).toBe(date.getMinutes().toString());
    expect(s).toBe(date.getSeconds().toString());
    expect(s2.length).toBe(2);
});
test('getMonth() can run', () => {
    const date = new Date();
    const month = date_ext_1.default(date).getMonth();
    expect(month).toBe(date.getMonth() + 1);
});
test('getNextDate() can run', () => {
    const date = new Date('2021/2/28');
    const dateExt = date_ext_1.default(date);
    expect(dateExt.getNextDate(1).getMonth() + 1).toBe(3);
    expect(dateExt.getNextDate(-1).getDate()).toBe(27);
});
