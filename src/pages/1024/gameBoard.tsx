/*
 * @Author: ouxuesen
 * @Date: 2022-04-24 14:40:19
 * @LastEditTime: 2022-04-26 16:07:41
 * @LastEditors: ouxuesen
 * @Description: 
 * @FilePath: /react-typescript-demo/src/pages/1024/gameBoard.tsx
 * 一路向前
 */
import { type } from '@testing-library/user-event/dist/type'
import React from 'react'
import { pointType, boardModel, directionType } from './yiModel'
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';
export interface OverlayType {
    list: boardModel[],
    degre: number
}

let custStyle = (degre: number) => {
    return {
        gridTemplateColumns: Array(degre).fill(`${1.0 / degre * 100}%`).join(' '),
        gridTemplateRows: Array(degre).fill(`${1.0 / degre * 100}%`).join(' '),
    }
}
const OverlayBoard = ({list,degre}:OverlayType) => {
    return (
        <div className='default-overlay' style={custStyle(degre)}>
            {list.map((item, index) => {
                return <div key={index} className='default-plot'>
                    <div className={item.type==='add'?'default-plot-span  default-plot-span-animal':'default-plot-span '}>{item.num!==0?item.num:''}</div>
                </div>
            })}
        </div>
    )
}

export default OverlayBoard