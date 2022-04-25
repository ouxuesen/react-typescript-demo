/*
 * @Author: ouxuesen
 * @Date: 2022-04-08 16:55:37
 * @LastEditTime: 2022-04-22 12:15:36
 * @LastEditors: ouxuesen
 * @Description: 
 * @FilePath: /react-typescript-demo/src/_tests_/comment.test.ts
 * 一路向前
 */
import _ from 'lodash'

var abc = function <T>(a: T, b: T, c: T) {
    return [a, b, c];
};
import { add, minnux } from "../utils/myModules";
describe('测试common/index 文件相关代码', () => {
    // 测试用例
    it('调用 add方法执行 1+1=2', () => {
        // 测试调用后的预期值为2
        expect(add(1, 1)).toBe(2)
    })
    it('调用 minnus方法 执行1-1=0', () => {
        // 测试调用后的预期值为0
        expect(minnux(1, 1)).toBe(0)
    })
})

test('柯里化方法', () => {
    var curried = _.curry(abc);
    expect(curried(1)(2)(3)).toEqual([1, 2, 3])
    expect(curried(1, 2)(3)).toEqual([1, 2, 3])
})