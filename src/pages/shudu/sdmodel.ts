/*
 * @Author: ouxuesen
 * @Date: 2022-04-22 10:24:38
 * @LastEditTime: 2022-04-25 16:12:00
 * @LastEditors: ouxuesen
 * @Description: 
 * @FilePath: /react-typescript-demo/src/pages/shudu/sdmodel.ts
 * 一路向前
 */
//板块model
import _, { List, max } from 'lodash'
const rolNum = 9
const bNum = 3
const allNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9]

export class SDModel {
    _matrixArray: number[];
    _xArray: number[][];
    _yArray: number[][];
    _bArray: number[][];
    _resultArray: number[] = []
    _currentIndex: number = 0
    _logs:{[index:number]:number[]} ={ }
    constructor(_rolNum: number = rolNum) {
        this._matrixArray = Array(Math.pow(_rolNum, 2)).fill(0)
        this._xArray = Array(rolNum)
        this._yArray = Array(rolNum)
        this._bArray = Array(rolNum)
        Array(rolNum).fill(null).forEach((ele, index) => {
            this._xArray[index] = []
            this._yArray[index] = []
            this._bArray[index] = []
        });

    }
    //board添加值更新
    update(index: number, num: number, dele: boolean = false) {
        let { x, y, b } = this.coordinates(index)
        if (!dele) {
            if(num>0){
                this._xArray[x].push(num)
                this._yArray[y].push(num)
                this._bArray[b].push(num)
            }
        } else {
            if(num==-1){
                if (this._xArray[x].length) {
                    this._xArray[x].pop()
                }
                if (this._yArray[y].length) {
                    this._yArray[y].pop()
                }
                if (this._bArray[b].length) {
                    this._bArray[b].pop()
                }
            }else{
                let findex = this._xArray[x].indexOf(num)
                if(findex!=-1){
                    this._xArray[x].splice(findex,1)
                }
                let findex_y = this._yArray[y].indexOf(num)
                if(findex_y!=-1){
                    this._yArray[y].splice(findex_y,1)
                }
                let findex_b = this._bArray[b].indexOf(num)
                if(findex_b!=-1){
                    this._bArray[b].splice(findex_b,1)
                }

            }
        }
    }

    coordinates(index: number): { x: number, y: number, b: number } {
        let x, y, b = 0
        x = index % rolNum
        y = Math.floor(index / rolNum)

        b = Math.floor(x / bNum) % bNum + Math.floor(y / bNum) * bNum
        return { x, y, b }
    }
    matrix(): number[][] {
        return _.chunk(this._matrixArray, rolNum)
    }
    getFillArray(index: number): number[] {
        let { x, y, b } = this.coordinates(index)
        return this.xor(this.union(this._xArray[x], this._yArray[y], this._bArray[b]), allNumber)
    }

    //并集
    union(...arrays: Array<List<number>>): number[] {
        return _.union(...arrays)
    }
    //交集
    intersection(...arrays: Array<List<number>>): number[] {
        return _.intersection(...arrays)
    }
    //补集
    xor(...arrays: Array<List<number>>): number[] {
        return _.xor(...arrays)
    }
    // -------------   创建操作

    //填充一
    //随机数
    random(max: number) {
        return Math.floor(Math.random() * max)
    }
    createRandomsingle(index: number): number {
        let fillArray = this.xor(this.getFillArray(index), this._logs[index]||[])

        if (fillArray.length == 0) {
            //回溯
            this._logs[index] = []
            return -1
        }
        let resultNm = fillArray[this.random(fillArray.length)]
        if(this._logs[index]){
            this._logs[index].push(resultNm)
        }else{
            this._logs = {...this._logs,[index]:[resultNm]}
        }
        return resultNm
    }
 
    //填充数字
    fillRaodm() {
        this.fullRandom()
        this._resultArray = _.clone(this._matrixArray)
        let tempArray: number[] = []
        while(tempArray.length<20){
            let randomnum = this.random(this._matrixArray.length)
            if(tempArray.indexOf(randomnum)==-1){
                tempArray.push(randomnum)
                // let { x, y, b } = this.coordinates(randomnum)
                this.update(randomnum,this._matrixArray[randomnum],true)
                this._matrixArray[randomnum] = 0
            }
          
        }
    }
    fullRandom(){
        this.reset()
        this.next()
    }
    next() {
        if (this._currentIndex < this._matrixArray.length) {
            let num = this.createRandomsingle(this._currentIndex)
            if (num == -1) {
                this._currentIndex = this._currentIndex - 1
                this.update(this._currentIndex, num, true)
                // this._matrixArray[this._currentIndex] = num
                // this.update(this._currentIndex, num)
            } else {
                this._matrixArray[this._currentIndex] = num
                this.update(this._currentIndex, num)
                this._currentIndex++
            }
            this.next()
        }
    }
    setIndexNum(index:number,num:number){
        this._matrixArray[index] = num
        this.update(index, num)
    }
    //填充二
    //验证填充数字是否合法
    fillVerification(): { sucess: boolean, index: number, error?: string } {
        let tempindex = -1
        if (this._matrixArray.every((item, index) => {
            if (item == 0) {
                tempindex = index
            }
            return item != 0
        })) {
            let sucess = this._matrixArray.every((item, index) => {
                let s_sucess = this.verificationSinger(index)
                if (!s_sucess) {
                    tempindex = index
                }
                return s_sucess
            })
            return { sucess: sucess, index: tempindex, error: sucess ? '填充不合法' : '' }
        } else {
            return { sucess: false, index: tempindex, error: '还没有填充' }
        }
        
    }
    //结果验证
    verificationSinger(index: number) {
        let tempArray = this.getFillArray(index)
        return tempArray.length == 0 
    }
    //填入验证
    verificationSingerNum(index: number,num:number) {
        let tempArray = this.getFillArray(index)
        return tempArray.length > 0 && tempArray.indexOf(num)!=-1
    }
    reset() {
        this._matrixArray.fill(0)
        this._xArray.forEach(chirden => {
            chirden.splice(0, chirden.length)
        })
        this._yArray.forEach(chirden => {
            chirden.splice(0, chirden.length)
        })
        this._bArray.forEach(chirden => {
            chirden.splice(0, chirden.length)
        })
        this._currentIndex = 0
        this._logs = {}
    }
    //解值
    

}