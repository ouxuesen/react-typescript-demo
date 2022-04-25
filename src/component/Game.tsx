/*
 * @Author: ouxuesen
 * @Date: 2022-03-18 18:33:27
 * @LastEditTime: 2022-04-25 14:25:14
 * @LastEditors: ouxuesen
 * @Description: 
 * @FilePath: /react-typescript-demo/src/component/Game.tsx
 * 一路向前
 */
import './index.css'
import Board from './Board'
import React, { useState } from "react";
import SGame from './SaoLei/SGame';
import Elsfk from '../pages/elsfk/elsfk';
import SDGame from '../pages/shudu/suGame'
import DefaultGame from '../pages/1024/game'
interface GameInterFace {
  title: string,
  render: JSX.Element
}
function Game() {
  const [gameIndex, setGameIndex] = useState<number>(0)
  const gameList: GameInterFace[] = [
    { title: '1024', render: <DefaultGame></DefaultGame> },
    { title: '数独', render: <SDGame></SDGame> },
    { title: '扫雷', render: <SGame></SGame> },
    { title: '俄罗斯方块', render: <Elsfk></Elsfk> },
  ]
  return (
    <>
      <div className='game-heard'>{gameList.map((gameItem,index)=>{
        return <a key={index} onClick={()=>{
          setGameIndex(index)
        }} className={index==gameIndex?'game-heard-a game-heard-active':'game-heard-a'} >{gameItem.title}</a>
      })}</div>
      <div className='game-content'>{gameList[gameIndex].render}</div>
    </>
  )
}

export default Game