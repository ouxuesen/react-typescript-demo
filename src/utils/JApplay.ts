/*
 * @Author: ouxuesen
 * @Date: 2022-04-21 11:48:33
 * @LastEditTime: 2022-04-21 18:13:28
 * @LastEditors: ouxuesen
 * @Description: 
 * @FilePath: /react-typescript-demo/src/utils/JApplay.ts
 * 一路向前
 */
// import _ from 'lodash'

import { type } from "os"

// var abc = function <T>(a: T, b: T, c: T) {
//     return [a, b, c];
// };
// interface fuctionface{
//     (...args: any[]): any;
// }
// interface curryFact {
//     (func: (...args: any[]) => any, arity?: number): (...args: any[]) => any;
// }
// const mycurry:curryFact = (func1:fuctionface)=>{
//     const next = (...args:any[])=>{
//         let params: any[] = []
//         return func1.apply(func1,params)
//     }
//     return next
// }
// mycurry(abc)
// export interface {

// }

type mypors<T> = T[]
/**
 * @description: 
 * @param {mypors} a
 * @param {mypors} b
 * @return {*}
 */
// 并集
export const union = (a:mypors<number>,b:mypors<number>)=>{
    let temp = [...a]
     b.forEach((item:number)=>{
        if(temp.indexOf(item)!=-1){
            temp.push(item)
        }
    })
    return temp.sort()
}
// 交集
