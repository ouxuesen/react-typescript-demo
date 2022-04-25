/*
 * @Author: ouxuesen
 * @Date: 2022-04-22 17:54:21
 * @LastEditTime: 2022-04-24 11:22:38
 * @LastEditors: ouxuesen
 * @Description: 
 * @FilePath: /react-typescript-demo/src/pages/shudu/sdBoard.tsx
 * 一路向前
 */
import { type } from '@testing-library/user-event/dist/type'
import React from 'react'

export type sdProp = {
    onClick?:(index:number)=>{},
    eideIndex:number
}
export type sdShowProps = number

const SdUnite = ({item,index,onClick,eideIndex}:{item:sdShowProps,index:number}&sdProp) => {
    return (
        <a className={eideIndex == index?'es-plot es-plot-active':'es-plot'} onClick={()=>{
            if(item==0){
                onClick?onClick(index):null
            }
        }}>
            <span >{item!=0?item:''}</span>
        </a>
    )
}

export default function SdBoard({ list,eideIndex,onClick}: { list: sdShowProps[]}&sdProp) {
    return (
        <div className='sd-overlay' >
            {list.map((item, index) => {
                return <SdUnite key={index} item={item} onClick={onClick} index={index} eideIndex={eideIndex}></SdUnite>
            })}
        </div>
    )
}