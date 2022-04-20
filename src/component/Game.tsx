/*
 * @Author: ouxuesen
 * @Date: 2022-03-18 18:33:27
 * @LastEditTime: 2022-04-20 14:30:43
 * @LastEditors: ouxuesen
 * @Description: 
 * @FilePath: /react-typescript-demo/src/component/Game.tsx
 * 一路向前
 */
import './index.css'
import Board from './Board'
import React from "react";
import SGame from './SaoLei/SGame';
import Elsfk from '../pages/elsfk/elsfk';
class Game extends React.Component {
  render(): React.ReactNode {
    return (
      <>
        {/* <div className="game">
          <div className="game-board">
            <Board ></Board>
          </div>
        </div> */}
        <div>
          <SGame></SGame>
        </div>
        <div>
          <Elsfk></Elsfk>
        </div>
      </>
    );
  }
}
export default Game