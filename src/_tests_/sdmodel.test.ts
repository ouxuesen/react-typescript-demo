/*
 * @Author: ouxuesen
 * @Date: 2022-04-22 10:54:24
 * @LastEditTime: 2022-04-28 13:53:36
 * @LastEditors: ouxuesen
 * @Description: 
 * @FilePath: /react-typescript-demo/src/_tests_/sdmodel.test.ts
 * 一路向前
 */
import { map } from 'lodash'
import {SDModel,SDuniteInterface} from '../pages/shudu/sdmodel'
test('数独modle测试',()=>{
    let model = new SDModel()
    function mapTpe(arrays:number[]):SDuniteInterface[]{
        return arrays.map(item=>{
            return {
                num:item,
                type:'init',
                index:-1
            }
        })
    }
    expect(model.intersection(mapTpe([1,2]),mapTpe([1,3])).sort()).toEqual(mapTpe([1]))
    expect(model.xor(mapTpe([1,2]),mapTpe([1,3])).sort()).toEqual(mapTpe([2,3]))
    expect(model.coordinates(0)).toEqual({x:0,y:0,b:0})
    expect(model.coordinates(9)).toEqual({x:0,y:1,b:0})
    expect(model.coordinates(80)).toEqual({x:8,y:8,b:8})
    expect(model.getFillArray(0).map(item=>item.num)).toEqual([1,2,3,4,5,6,7,8,9])
})
test('数独填充数字',()=>{
    let model = new SDModel()
    model.fullRandom()
    debugger
    expect(model._matrixArray.every(item=>{return item.num!=0})).toBeTruthy()
    expect(model.fillVerification().sucess).toBeTruthy()
})