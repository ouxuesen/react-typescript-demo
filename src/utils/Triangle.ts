/*
 * @Author: ouxuesen
 * @Date: 2022-04-21 12:01:04
 * @LastEditTime: 2022-04-21 14:55:32
 * @LastEditors: ouxuesen
 * @Description: 
 * @FilePath: /react-typescript-demo/src/utils/Triangle.ts
 * 一路向前
 */
/// <reference path = "IShape.ts" /> 
namespace Drawing {
    export class Triangle implements IShape {
        public draw() {
            return "Triangle is drawn";
        }
    }
}