/*
 * @Author: ouxuesen
 * @Date: 2022-04-22 10:54:24
 * @LastEditTime: 2022-04-24 16:23:53
 * @LastEditors: ouxuesen
 * @Description: 
 * @FilePath: /react-typescript-demo/src/_tests_/sdmodel.test.ts
 * 一路向前
 */
import {SDModel} from '../pages/shudu/sdmodel'
test('数独modle测试',()=>{
    let model = new SDModel()
    expect(model.union([0,2],[1,3]).sort()).toEqual([0,1,2,3])
    expect(model.intersection([1,2],[1,3]).sort()).toEqual([1])
    expect(model.xor([1,2],[1,3]).sort()).toEqual([2,3])
    expect(model.coordinates(0)).toEqual({x:0,y:0,b:0})
    expect(model.coordinates(9)).toEqual({x:0,y:1,b:0})
    expect(model.coordinates(80)).toEqual({x:8,y:8,b:8})
    expect(model.getFillArray(0)).toEqual([1,2,3,4,5,6,7,8,9])
})
test('数独填充数字',()=>{
    let model = new SDModel()
    model.fullRandom()
    expect(model._matrixArray.every(item=>{return item!=0&&item!=undefined})).toBeTruthy()
    expect(model.fillVerification().sucess).toBeTruthy()
})