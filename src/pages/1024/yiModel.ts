/*
 * @Author: ouxuesen
 * @Date: 2022-04-24 14:39:49
 * @LastEditTime: 2022-04-25 15:21:30
 * @LastEditors: ouxuesen
 * @Description: 
 * @FilePath: /react-typescript-demo/src/pages/1024/yiModel.ts
 * 一路向前
 */
import _ from 'lodash'
export interface boardModel {
    num: number,
    type: 'none' | 'init' | 'add',
}
export type pointType = {
    x: number,
    y: number
}
export type directionType = 'left' | 'right' | 'top' | 'bottom'
class DefulatModel {
    _degre: number;
    _matrixArray: boardModel[];
    constructor(degre: number) {
        this._degre = degre
        this._matrixArray = Array(degre * degre).fill(null).map(() => {
            return this.initDefaultBoardModel()
        })
    }
    initDefaultBoardModel(): boardModel {
        return {
            num: 0,
            type: 'none',
        }
    }
    //换算坐标
    coordinates(index: number): pointType {
        let x, y, b = 0
        x = index % this._degre
        y = Math.floor(index / this._degre)
        return { x, y }
    }
    acoordinates(point: pointType): number {
        return point.y * this._degre + point.x
    }

    matrix() {
        return _.chunk(this._matrixArray.map(item => { return item.num }), this._degre)
    }
    setPoint(point: pointType, num: number) {
        this._matrixArray[this.acoordinates(point)].num = num
        this._matrixArray[this.acoordinates(point)].type = 'init'
    }
    setPointNone(point: pointType) {
        this._matrixArray[this.acoordinates(point)].num = 0
        this._matrixArray[this.acoordinates(point)].type = 'none'
    }

    reset() {
        this._matrixArray = Array(this._degre * this._degre).fill(null).map(() => {
            return this.initDefaultBoardModel()
        })
    }
    //move
    //获取有标识的坐标点
    getPoints(): pointType[] {
        let tempPoints: pointType[] = []
        let degredd = this._degre
        this._matrixArray.forEach((item, index) => {
            if (item.type !== 'none') {
                tempPoints.push(this.coordinates(index))
            }
        })
        return tempPoints
    }

    //mover right 
    //can move 
    getDirentPoint(direction: directionType){
        let tempMap:{
            [K in directionType]: pointType;
        } = {'top':{x:0,y:-1},'bottom':{x:0,y:1},'left':{x:-1,y:0},'right':{x:1,y:0}}
        return  tempMap[direction]
    }
    pointAdd(...points:pointType[]){
        return points.reduce((result:pointType,current:pointType): pointType=>{
            return {x:result.x+current.x,y:result.y+current.y}
        })
    }
    canmoveAll(){
        return this.canmove('left')||this.canmove('right')||this.canmove('top')||this.canmove('bottom')
    }
    canmove(direction: directionType) {
        let points = this.getPoints()
        let directionPoint:pointType = this.getDirentPoint(direction)
        return points.some((point: pointType) => {
            let result = false
            let canflag = true
            let currentPoint = point
            let cmodel = this._matrixArray[this.acoordinates(currentPoint)]
            if(cmodel.type === 'none' ){
                return result
            }
            while(!result&&canflag){
                let movePoint = this.pointAdd(currentPoint,directionPoint)
                if(movePoint.x>=0&&movePoint.x<this._degre&&movePoint.y>=0&&movePoint.y<this._degre){
                    let lmodel = this._matrixArray[this.acoordinates(movePoint)]
                    let omodel = this._matrixArray[this.acoordinates(point)]
                    if(lmodel.type === 'none' || lmodel.num === omodel.num){
                        result = true
                    }
                }else{
                    canflag = false
                    result = false
                }
                currentPoint = movePoint
            }
            return result

        })

    }
    //返回分数
    move(direction: directionType):number{
        let score = 0
        if(this.canmove(direction)){
            let points = this.getPoints()
            if(direction === 'right'||direction === 'bottom'){
                points = points.reverse()
            }
            let directionPoint:pointType = this.getDirentPoint(direction)
            points.forEach((point: pointType) => {
                let canflag = true
                let currentPoint = point
                while(canflag){
                    let movePoint = this.pointAdd(currentPoint,directionPoint)
                    if(movePoint.x>=0&&movePoint.x<this._degre&&movePoint.y>=0&&movePoint.y<this._degre){
                        let omodel = this._matrixArray[this.acoordinates(currentPoint)]
                        let lmodel = this._matrixArray[this.acoordinates(movePoint)]
                        if(lmodel.type === 'none'){
                            this.setPoint(movePoint,omodel.num)
                            this.setPointNone(currentPoint)
                        }else if(lmodel.num === omodel.num){
                            lmodel.num = lmodel.num+omodel.num
                            score += lmodel.num 
                            this.setPointNone(currentPoint)
                        }

                    }else{
                        canflag = false
                    }
                    currentPoint = movePoint
                }
    
            })
           
        }
        return score
    }
    //random 不闭合
    random(max: number) {
        return Math.floor(Math.random() * max)
    }
    
    getRandom() {
        // return 2
        let blackIndexs = this.getBlackIndexs()
        let index = blackIndexs[this.random(blackIndexs.length)]
        let indexModel = this._matrixArray[index]
        indexModel.type = 'add'
        indexModel.num = 2
    }
    //获取空白的数组
    getBlackIndexs(): number[] {
        var indexs: number[] = []
        this._matrixArray.forEach((item: boardModel, index) => {
            if (item.type === 'none') {
                indexs.push(index)
            }
        })
        return indexs
    }

}
export default DefulatModel