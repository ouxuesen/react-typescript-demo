/*
 * @Author: ouxuesen
 * @Date: 2022-04-22 10:24:38
 * @LastEditTime: 2022-04-28 18:44:41
 * @LastEditors: ouxuesen
 * @Description: 
 * @FilePath: /react-typescript-demo/src/pages/shudu/sdmodel.ts
 * 一路向前
 */
//板块model
import _, { List, max } from 'lodash'
const rolNum = 9
const bNum = 3
const allNumber: SDuniteInterface[] = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => {
    return {
        num: item,
        type: 'init',
        index: -1,
        id:index
    }
})
export interface SDuniteInterface {
    num: number,
    type: 'init' | 'blank' | 'eide',
    index: number,
    id?:number
}
export interface pointInterface {
    x: number,
    y: number,
    b: number,
}
export class SDModel {
    _matrixArray: SDuniteInterface[];
    _resultArray: SDuniteInterface[] = []
    _currentIndex: number = 0
    _countss:number =0
    _shuffleArray:number[]= []
    _logs: { [index: number]: SDuniteInterface[] } = {}
    constructor(_rolNum: number = rolNum) {
        this._matrixArray = Array(Math.pow(_rolNum, 2)).fill(0).map((item, index) => {
            return {
                num: 0,
                type: 'init',
                index: index,
                id:index,
            }
        })
    }
    //board添加值更新
    getBlockArray({ _x, _y, _b}: { _x?: number, _y?: number, _b?: number }): SDuniteInterface[] {
        return this._matrixArray.filter((item: SDuniteInterface, index: number) => {
            let { x, y, b } = this.coordinates(index)
            let result = true
            if (_x != undefined) {
                result = _x === x && result
            }
            if (_y != undefined) {
                result = _y === y && result
            }
            if (_b != undefined) {
                result = _b === b && result
            }
            return result && item.num != 0 && item.type!='blank'
        })

    }

    coordinates(index: number): pointInterface {
        let x, y, b = 0
        x = index % rolNum
        y = Math.floor(index / rolNum)

        b = Math.floor(x / bNum) % bNum + Math.floor(y / bNum) * bNum
        return { x, y, b }
    }
    matrix(): number[][] {
        return _.chunk(this._matrixArray.map(item => item.num), rolNum)
    }
    matrixLog(): { [index: number]: number[] } {
        return _.mapValues(this._logs, (o) => o.map(item => item.num))
    }
    getFillArray(index: number): SDuniteInterface[] {
        let { x, y, b } = this.coordinates(index)
        // debugger
        return this.xor(this.union(this.getBlockArray({ _x: x }), this.getBlockArray({ _y: y }), this.getBlockArray({ _b: b })), allNumber)
    }

    //并集
    union(...arrays: Array<Array<SDuniteInterface>>): SDuniteInterface[] {
        // unionBy<T>(...arrays: Array<List<T> | null | undefined>,iteratee?: ValueIteratee<T>): T[];
        let ss = [...arrays||null]
        return _.unionBy(ss[0]||null,ss[1]||null,ss[2]||null,ss[3]||null, 'num')
        // return _.unionBy(, 'num')
    }
    //交集
    intersection(...arrays: Array<List<SDuniteInterface>>): SDuniteInterface[] {
        return _.intersectionBy(...arrays, 'num')
    }
    //补集
    xor(...arrays: Array<List<SDuniteInterface>>): SDuniteInterface[] {
        let ss = [...arrays||null]
        return _.xorBy(ss[0]||null,ss[1]||null,ss[2]||null,ss[3]||null, 'num')
    }
    // -------------   创建操作

    //填充一
    //随机数
    random(max: number) {
        return Math.floor(Math.random() * max)
    }
    createRandomsingle(index: number): number {
        let fillArray = this.xor(this.getFillArray(index),this._logs[index]||[])
        if (fillArray.length == 0) {
            this._logs[index] = []
            return -1
        }
        let resultNm = fillArray[this.random(fillArray.length)]
        if (this._logs[index] != undefined) {
            this._logs[index].push(resultNm)
        } else {
            this._logs = { ...this._logs, [index]: [resultNm] }
        }
        return resultNm.num
    }

    //填充数字 等级0-5 
    fillRaodm(level:number) {
        this.fullRandom()
        this._resultArray = _.cloneDeep(this._matrixArray)
        let tempArray: number[] = []
        while (tempArray.length < 10+level*5) {
            let randomnum = this.random(this._matrixArray.length)
            if (tempArray.indexOf(randomnum) == -1) {
                tempArray.push(randomnum)
                this._matrixArray[randomnum].type = 'blank'
            }
        }
    }
    fullRandom() {
        this._countss++
        this._shuffleArray = _.shuffle(Array(Math.pow(rolNum,2)).fill(0).map((_,index)=>index))
        this.reset()
        this.next()
    }
    next() {
        if (this._currentIndex < this._matrixArray.length) {
            let num = this.createRandomsingle(this._currentIndex)
            if (num === -1) {
                this._currentIndex = this._currentIndex - 1
                this._matrixArray[this._currentIndex].num = 0
            } else {
                this._matrixArray[this._currentIndex].num = num
                let { x, y, b } = this.coordinates(this._currentIndex) 
                //动画id 对称
                this._matrixArray[this._currentIndex].id = [ y*rolNum+x, x*rolNum+y][this._countss%2]
                //随机
                this._matrixArray[this._currentIndex].id = this._shuffleArray[this._currentIndex]
                this._matrixArray[this._currentIndex].id 
                this._currentIndex = this._currentIndex + 1
            }
            this.next()
        }
    }
    setIndexNum(index: number, num: number) {
        this._matrixArray[index].num = num
        this._matrixArray[index].type = 'eide'
    }
    //填充二
    //验证填充数字是否合法
    fillVerification(): { sucess: boolean, index: number, error?: string } {
        let tempindex = -1
        if (this._matrixArray.every((item, index) => {
            if (item.num == 0) {
                tempindex = index
            }
            return item.num != 0
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
    verificationSingerNum(index: number, num: number) {
        let tempArray = this.getFillArray(index)
        return tempArray.length > 0 && tempArray.findIndex(item => { return item.num === num}) != -1
    }
    reset() {
        this._matrixArray.forEach(item => {
            item.num = 0
            item.type = 'init'
        });
        this._currentIndex = 0
        this._logs = {}
    }
    //解值


}