"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-undef */
const crypto_utils_1 = __importDefault(require("./crypto.utils"));
test('encrypto and decrypto: can run true', () => {
    const str = 'hello world';
    const enStr = crypto_utils_1.default.encrypto(str);
    const deStr = crypto_utils_1.default.decrypto(enStr);
    expect(deStr).toBe(str);
});
test('encrypto and decrypto: can run true with seted config', () => {
    const str = 'hello world';
    crypto_utils_1.default.setGlobelIV('1234567890123456');
    crypto_utils_1.default.setGlobelKey('12345678901234561234567890123456');
    const enStr = crypto_utils_1.default.encrypto(str);
    const deStr = crypto_utils_1.default.decrypto(enStr);
    expect(deStr).toBe(str);
});
