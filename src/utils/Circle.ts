/*
 * @Author: ouxuesen
 * @Date: 2022-04-21 11:58:21
 * @LastEditTime: 2022-04-21 14:55:04
 * @LastEditors: ouxuesen
 * @Description: 
 * @FilePath: /react-typescript-demo/src/utils/Circle.ts
 * 一路向前
 */
/// <reference path = "IShape.ts" /> 
namespace Drawing { 
    export class Circle implements IShape { 
        public draw() { 
            return 'Circle is drawn'
        }  
    }
}