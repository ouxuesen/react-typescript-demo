/*
 * @Author: ouxuesen
 * @Date: 2022-04-18 17:28:25
 * @LastEditTime: 2022-04-20 17:39:18
 * @LastEditors: ouxuesen
 * @Description: 
 * @FilePath: /react-typescript-demo/src/pages/elsfk/index.ts
 * 一路向前
 */
// //模型
// type ELsBaseSet = number[]
// type ElsBaseType = number[][]
// //模型1

import { ElsBaseClass, ElsModelClass } from './normal'
const createModel = (points: { x: number, y: number }[]) => {
    let model = new ElsModelClass(4, 4)
    model.setPoints(points)
    return model
}
export const ElsModel_1 = createModel([{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 2 }])
export const ElsModel_2 = createModel([{ x: 1, y: 1 }, { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }])
export const ElsModel_3 = createModel([{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }])
export const ElsModel_4 = createModel([{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 2 }])
export const ElsModel_5 = createModel([{ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 1 }])
export const rol_x = 10
export const rol_y = 20
export const ElsBoard = new ElsBaseClass(rol_x, rol_y)
//边界碰撞问题 目前x y只能是1或者0
export type stateType = 'start' | 'starting' | 'end'
export function move(x: number, y: number, model: ElsModelClass, callBack: (deleLines: number[], state?: stateType) => void) {
    let maxpoint = model.getMaxPoint()
    let minPoint = model.getMinPoint()
    if (minPoint.x + x < 0 || (rol_x - maxpoint.x - x) <= 0 || (rol_y - maxpoint.y - y) <= 0) {
        console.log('不符合规则被打断')
        return
    }

    let supPoints = model.getSupPoints()
    if (x!=0&&supPoints.some((point) => {
        return ElsBoard._matrixArray[(point.y + y) * rol_x + (point.x + x)] == 1
    })) {
        console.log('不符合规则被打断')
        return
    }
    //碰触其他黑块
    if (supPoints.some((point) => {
        return ElsBoard._matrixArray[(point.y + y) * rol_x + (point.x + x)] == 1
    })) {
        ElsBoard.setPoints(supPoints)
        //
        let deleArray = ElsBoard.cheakDele()
        if (deleArray.length) {
            console.log('消除了行数：', deleArray)
        }
        //判断输的条件
        if (model.getMinPoint().y <= 0) {
            callBack ? callBack(deleArray, 'end') : null
        } else {
            callBack ? callBack(deleArray) : null
        }
        model.reset()

        return
    }
    model.sup_x += x
    model.sup_y += y
    let maxpoint_1 = model.getMaxPoint()
    //停止move条件 1 边界到底了。 2 碰到了其他方块
    if (rol_y - maxpoint_1.y == 1) {
        ElsBoard.setPoints(model.getSupPoints())
        model.reset()
        let deleArray = ElsBoard.cheakDele()
        if (deleArray.length) {
            console.log('消除了行数：', deleArray)
        }
        callBack ? callBack(deleArray) : null
    }


}
export const onKeyDown = () => {
    document.onkeydown = function (event) {
        switch (event.code) {
            case 'ArrowLeft':
                console.log('左')
                break
            case 'ArrowUp':
                console.log('上')
                break
            case 'ArrowRight':
                console.log('右')
                break
            case 'ArrowDown':
                console.log('下')
                break
        }
    }
}
