/*
 * @Author: ouxuesen
 * @Date: 2022-03-29 17:42:20
 * @LastEditTime: 2022-03-30 17:56:45
 * @LastEditors: ouxuesen
 * @Description: 
 * @FilePath: /react-typescript-demo/src/component/SaoLei/interfacePros.ts
 * 一路向前
 */
import React from "react";

export interface Point{
    x:number;
    y:number;
}
export interface SaoLeiPros extends Point{
    onClick?:(item:SaoLeiPros)=>void;
    status:boolean;//当前状态
    flag:boolean; //标记
    number:number;  //数量
    isLei:boolean;//是否是雷
} 