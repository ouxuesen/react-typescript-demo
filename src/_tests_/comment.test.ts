/*
 * @Author: ouxuesen
 * @Date: 2022-04-08 16:55:37
 * @LastEditTime: 2022-04-08 17:44:18
 * @LastEditors: ouxuesen
 * @Description: 
 * @FilePath: /react-typescript-demo/src/_tests_/comment.test.ts
 * 一路向前
 */
import {add,minnux}  from "../utils/myModules";
describe('测试common/index 文件相关代码', () => {
    // 测试用例
    it('调用 add方法执行 1+1=2', () => {
        // 测试调用后的预期值为2
        expect(add(1,1)).toBe(2)
    })
    it('调用 minnus方法 执行1-1=0', () => {
        // 测试调用后的预期值为0
        expect(minnux(1, 1)).toBe(0)
    })
  })