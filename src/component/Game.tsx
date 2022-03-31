/*
 * @Author: ouxuesen
 * @Date: 2022-03-18 18:33:27
 * @LastEditTime: 2022-03-21 17:03:09
 * @LastEditors: ouxuesen
 * @Description: 
 * @FilePath: /react-typescript-demo/src/component/Game.tsx
 * 一路向前
 */
import './index.css'
import Board from './Board'
import React from "react";
class Game extends React.Component{
    render(): React.ReactNode {
        return (
            <div className="game">
              <div className="game-board">
                <Board></Board>
              </div>
              <div className="game-info">
                <div>{/* status */}</div>
                <ol>{/* TODO */}</ol>
              </div>
            </div>
          );
    }
}
export default Game