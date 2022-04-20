/*
 * @Author: ouxuesen
 * @Date: 2022-04-18 17:29:18
 * @LastEditTime: 2022-04-20 14:17:09
 * @LastEditors: ouxuesen
 * @Description: 
 * @FilePath: /react-typescript-demo/src/pages/elsfk/normal.ts
 * 一路向前
 */
import * as _ from 'lodash'
import { rol_x } from '.';
export class ElsBaseClass {
    _degre_x: number;
    _degre_y:number;
    _matrix: number[][] = [];
    _matrixArray: number[];
    constructor(degree_x: number,degree_y: number) {
        this._degre_x = degree_x
        this._degre_y = degree_y
        this._matrixArray = Array(degree_x*degree_y).fill(0)
        this.asyncMatrix()
    }
    //同步矩阵
    asyncMatrix() {
        this._matrix = _.chunk(this._matrixArray, this._degre_x)
    }
    //同步容器
    asyncMatrixArray() {
        this._matrixArray = this._matrix.reduce((total, current) => {
            return total.concat(current)
        })
    }
    setPoints(points: { x: number, y: number }[]) {
        points.forEach((point) => {
            this._matrixArray[point.y * this._degre_x + point.x] = 1
        })
        this.asyncMatrix()
    }
    //获取有标识的坐标点
    getPoints(): { x: number, y: number }[] {
        let tempPoints: { x: number, y: number }[] = []
        let degredd = this._degre_x
        this._matrixArray.forEach((item, index) => {
            if (item === 1) {
                let x = index % degredd
                let y = parseInt(`${index / degredd}`)
                tempPoints.push({ x, y })
            }
        })
        return tempPoints
    }

    //检查消除行 返回消除的行数
    cheakDele(): number[] {
        let tempDele: number[] = []
        this._matrix.forEach((children: number[], index_y: number) => {
            if (children.every(item => { return item === 1 })) {
                tempDele.push(index_y)
            }
        })
        tempDele.forEach(y => {
            this._matrix.splice(y,1)
            this._matrix.splice(0,0,Array(this._degre_x).fill(0))
        })
        this.asyncMatrixArray()
        return tempDele
    }
    reset(){
        this._matrixArray = Array(this._degre_x*this._degre_y).fill(0)
        this.asyncMatrix()
    }

}

const reset_x = (10-4)/2
const reset_y = -2
//模型
export class ElsModelClass extends ElsBaseClass {
    sup_x: number = reset_x
    sup_y: number = reset_y
    //矩阵置换
    matrixDisplace(): number[] {
        let points = this.getPoints()
        let degredd = this._degre_x
        let tempArray = Array(Math.pow(degredd, 2)).fill(0)
        points.forEach((point) => {
            tempArray[point.x * degredd + point.y] = 1
        })
        return tempArray
    }
    //反转
    matrixReverse(matrixArray: number[]): number[] {
        let chunkArray: number[][] = _.chunk(matrixArray, this._degre_x)
        chunkArray.forEach(children => {
            children.reverse()
        })
        return chunkArray.reduce((total, current) => {
            return total.concat(current)
        })
    }
    //90route
    rotate90() {
        this._matrixArray = this.matrixReverse(this.matrixDisplace())
        this.asyncMatrix()
        let maxPoint = this.getMaxPoint()
        //防止反转出边界
        if(maxPoint.x>rol_x-1){
            this.sup_x = this.sup_x - (maxPoint.x-rol_x+1)
        }
        return this
    }
    //转换坐标点的
    getSupPoints():{x:number,y:number}[]{
        return this.getPoints().map(({x,y})=>{
            return {x:x+this.sup_x,y:y+this.sup_y}
        })
    }
    getMaxPoint():{x:number,y:number}{
        let points = this.getSupPoints()
        let max_x = 0
        let max_y = 0
        points.forEach(point=>{
            if(point.x>max_x){
                max_x = point.x
            }
            if(point.y>max_y){
                max_y = point.y
            }
        })
        return {x:max_x,y:max_y}
    }
    getMinPoint():{x:number,y:number}{
        let points = this.getSupPoints()
        let min_x = points[0].x
        let min_y = points[0].y
        points.forEach(point=>{
            if(point.x<min_x){
                min_x = point.x
            }
            if(point.y<min_y){
                min_y = point.y
            }
        })
        return {x:min_x,y:min_y}
    }
    reset(){
        this.sup_x = reset_x
        this.sup_y = reset_y
    }

}




