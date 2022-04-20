/*
 * @Author: ouxuesen
 * @Date: 2022-04-18 15:48:20
 * @LastEditTime: 2022-04-18 17:25:04
 * @LastEditors: ouxuesen
 * @Description: 
 * @FilePath: /react-typescript-demo/src/pages/grid/gridBoard.tsx
 * 一路向前
 */
import { type } from '@testing-library/user-event/dist/type'
import React from 'react'

type Props = {}
const girlnNumber: number = 25
const OverlayBoard = () => {
    return (
        <div className='overlay'>
            {Array(girlnNumber).fill(null).map((item, index) => {
                return <span key={index} className='plot'></span>
            })}
        </div>
    )
}
const PlantsBoard = () => {
    return (
        <div className='plants'>
            <div className="plant carrot" ><div className="bg"></div></div>
        </div>
    )
}
const GardenBoard = () => {
    return (
        <div className='garden'>
            <div className="treatment carrot" ><div className="bg"></div></div>
        </ div>
    )
}
export type boardStyle = 'overlay' | 'plants' | 'garden'
// export default gridBoard
const NormalBoard = ({ styleBord }: { styleBord: boardStyle }) => {
    return (
        <>
            {styleBord === 'overlay' && (<OverlayBoard></OverlayBoard>)}
            {styleBord === 'garden' && (<GardenBoard></GardenBoard>)}
            {styleBord === 'plants' && (<PlantsBoard></PlantsBoard>)}
        </>
    )
}
export default NormalBoard