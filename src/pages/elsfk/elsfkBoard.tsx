/*
 * @Author: ouxuesen
 * @Date: 2022-04-19 15:47:19
 * @LastEditTime: 2022-04-20 13:32:17
 * @LastEditors: ouxuesen
 * @Description: 
 * @FilePath: /react-typescript-demo/src/pages/elsfk/elsfkBoard.tsx
 * 一路向前
 */
import React from 'react'
import {rol_x,rol_y} from './index'
export type BoardProps ={x:number,y:number}[]
let style = {
    gridTemplateColumns:Array(rol_x).fill('10%').join(' '),
    gridTemplateRows:Array(rol_y).fill('5%').join(' '),
}
const OverlayBoard = () => {
    return (
        <div className='els-overlay' style={style}>
            {Array(rol_x*rol_y).fill(0).map((item, index) => {
                return <span key={index} className='els-plot'></span>
            })}
        </div>
    )
}
const BlockBoard = ({ list }: { list: BoardProps }) => {
    return (
        <div className='block' style={style}>
              {list.filter(({x,y})=>{return y>=0}).map(({x,y}, index) => {
                return <span key={y*rol_x+x} className='els-plot' style={{gridColumnStart:x+1,gridColumnEnd:x+2,gridRowStart:y+1,gridRowEnd:y+2}}></span>
            })}
        </div>
    )
}
const BlockMBoard = ({ list }: { list: BoardProps }) => {
    return (
        <div className='move-block' style={style}>
            {list.filter(({x,y})=>{return y>=0}).map(({x,y}, index) => {
                return <span key={y*rol_x+x} className='els-plot' style={{gridColumnStart:x+1,gridColumnEnd:x+2,gridRowStart:y+1,gridRowEnd:y+2}}></span>
            })}
        </ div>
    )
}
const OverlayScoreBoard = () => {
    return (
        <div className='els-overlay-score' >
            {Array(4*4).fill(0).map((item, index) => {
                return <span key={index} className='score-plot'></span>
            })}
        </div>
    )
}
const ScoreBoard = ({ list }: { list: BoardProps }) => {
    return (
        <div className='score-block' >
            {list.map(({x,y}, index) => {
                return <span key={y*rol_x+x} className='score-plot' style={{gridColumnStart:x+1,gridColumnEnd:x+2,gridRowStart:y+1,gridRowEnd:y+2}}></span>
            })}
        </ div>
    )
}
export type boardStyle = 'overlay' | 'block' | 'moveBlock' | 'score' |'overlayScore'
// export default gridBoard
const NormalBoard = ({ styleBord, list }: { styleBord: boardStyle, list: BoardProps }) => {
    return (
        <>
            {styleBord === 'overlay' && (<OverlayBoard ></OverlayBoard>)}
            {styleBord === 'block' && (<BlockBoard list={list}></BlockBoard>)}
            {styleBord === 'moveBlock' && (<BlockMBoard list={list}></BlockMBoard>)}
            {styleBord === 'score' && (<ScoreBoard list={list}></ScoreBoard>)}
            {styleBord === 'overlayScore' && (<OverlayScoreBoard ></OverlayScoreBoard>)}
        </>
    )
}
export default NormalBoard