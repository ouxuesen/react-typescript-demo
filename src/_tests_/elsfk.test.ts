/*
 * @Author: ouxuesen
 * @Date: 2022-04-19 12:11:11
 * @LastEditTime: 2022-04-19 15:58:42
 * @LastEditors: ouxuesen
 * @Description: 
 * @FilePath: /react-typescript-demo/src/_tests_/elsfk.test.ts
 * 一路向前
 */
import _ from 'lodash'
import  { ElsModel_1,ElsModel_2,ElsModel_3,ElsModel_4,ElsModel_5,ElsBoard ,rol_x,rol_y} from "../pages/elsfk/index";
test('模型测试',()=>{
    expect(ElsModel_1._matrixArray).toEqual([0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0])
    expect(ElsModel_2._matrixArray).toEqual([1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0])
    expect(ElsModel_3._matrixArray).toEqual([1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    expect(ElsModel_4._matrixArray).toEqual([0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0])
    expect(ElsModel_5._matrixArray).toEqual([0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0])
    expect(ElsModel_1.getPoints()).toEqual([{x:1,y:1},{x:2,y:1},{x:2,y:2},{x:3,y:2}])


})
test('转90度测试',()=>{
    ElsModel_1.rotate90()
    expect(ElsModel_1.getPoints()).toEqual([{x:2,y:1},{x:1,y:2},{x:2,y:2},{x:1,y:3}])
})
test('容器测试',()=>{
    expect(ElsBoard._matrix).toEqual(_.chunk(Array(rol_x*rol_y).fill(0),rol_x))
    
})