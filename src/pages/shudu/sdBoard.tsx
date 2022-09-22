/*
 * @Author: ouxuesen
 * @Date: 2022-04-22 17:54:21
 * @LastEditTime: 2022-04-28 18:26:52
 * @LastEditors: ouxuesen
 * @Description: 
 * @FilePath: /react-typescript-demo/src/pages/shudu/sdBoard.tsx
 * 一路向前
 */
import { SDuniteInterface } from './sdmodel'
import React, { useState, useEffect } from "react";
import { Flipper, Flipped } from "react-flip-toolkit";
import _ from "lodash";
export type sdProp = {
    onClick?: (index: number) => {},
    eideIndex: number
}

const SdUnite = ({ item, index, onClick, eideIndex }: { item: SDuniteInterface, index: number } & sdProp) => {
    return (
        <a className={`es-plot ${eideIndex == index ? 'es-plot-active' : ''} ${item.type == 'eide' ? 'es-plat-eide' : ''}`} onClick={() => {
            if (item.num == 0) {
                onClick ? onClick(index) : null
            }
        }}>
            <span >{item.num != 0 ? item.num : ''}</span>
        </a>
    )
}

export default function SdBoard({ points, eideIndex, onClick }: { points: SDuniteInterface[] } & sdProp) {
    const [data, setData] = useState(Array(81).fill(0).map((_, index) => index));
    return (
        <Flipper flipKey={points.map(item => item.num).join('')} className='sd-overlay'>
            {points.map(item => {
                return <Flipped key={item.index} flipId={`item-${item.id}`}>
                    {/* <div>{`${data[item.index]}-${item.num}`}</div> */}
                    {/* <SdUnite item={item} onClick={onClick} index={item.index} eideIndex={eideIndex}></SdUnite> */}
                    <a className={`es-plot ${eideIndex == item.index ? 'es-plot-active' : item.type == 'blank' ? 'es-plot-eide' : ''}  `} onClick={() => {
                        if (item.type === 'blank') {
                            onClick ? onClick(item.index) : null
                        }
                    }}>
                        <span >{item.type != 'blank' ?item.num: ''}</span>
                    </a>
                </Flipped>
            })}
        </Flipper>
    )
}
