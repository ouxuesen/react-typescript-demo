/*
 * @Author: ouxuesen
 * @Date: 2022-04-19 15:45:55
 * @LastEditTime: 2022-04-20 14:33:33
 * @LastEditors: ouxuesen
 * @Description: 
 * @FilePath: /react-typescript-demo/src/pages/elsfk/elsfk.tsx
 * 一路向前
 */
import React, { useEffect, useReducer, useState } from 'react'
import './index.css'
import { Button } from "react-bootstrap";
import NormalBoard, { boardStyle } from './elsfkBoard'
import { ElsBaseClass, ElsModelClass } from './normal'
import { ElsBoard, ElsModel_0, ElsModel_1, ElsModel_2, ElsModel_3, ElsModel_4, ElsModel_5, move, stateType } from "./index";

type actiontype = 'update'
// type stateType = 'start' | 'starting' | 'end'
function reducer(state: { sPoints: { x: number, y: number }[], cPoints: { x: number, y: number }[], mPoints: { x: number, y: number }[], statues: stateType }, action: { type: actiontype, payload: {} }) {
  switch (action.type) {
    case 'update':
      return {
        ...state,
        ...action.payload
      };
    default:
      throw new Error()
  }
}

export default function Elsfk() {
  let currentModel: ElsModelClass = getRandomModel()
  let nextModel: ElsModelClass = getRandomModel()

  const [state, dispatch] = useReducer(reducer, { sPoints: ElsBoard.getPoints(), cPoints: currentModel.getSupPoints(), mPoints: nextModel.getPoints(), statues: 'start' });
  const [scoceFen, setScoceFen] = useState<number>(0)
  let currentScoce = 0
  let interVal: NodeJS.Timer | null = null;
  //更新view
  const updateView = () => {
    dispatch({
      type: 'update', payload: {
        cPoints: currentModel.getSupPoints(),
        sPoints: ElsBoard.getPoints(),
        mPoints: nextModel.getPoints(),
      }
    })
  }
  function rest() {
    ElsBoard.reset()
    setScoceFen(0)
  }
  function callBack(deleLines: number[], state?: stateType) {
    if (state && (state as stateType) === 'end') {
      console.log('game over')
      clearInterval(interVal as NodeJS.Timer)
      dispatch({
        type: 'update', payload: {
          statues: 'end'
        }
      })
    } else {
      nextModelFN()
      if (deleLines.length > 0) {
        currentScoce = currentScoce + Math.pow(deleLines.length, 2) * 100
        setScoceFen(currentScoce)
        // console.log('恭喜您得分', scoce * 100)
      }
    }
  }
  const onKeyDown = () => {
    document.onkeydown = function (event) {
      switch (event.code) {
        case 'ArrowLeft':
          console.log('左')
          move(-1, 0, currentModel, callBack)
          updateView()
          break
        case 'ArrowUp':
          currentModel.rotate90()
          updateView()
          console.log('上')
          break
        case 'ArrowRight':
          move(1, 0, currentModel, callBack)
          updateView()
          console.log('右')
          break
        case 'ArrowDown':
          console.log('下')
          move(0, 1, currentModel, callBack)
          updateView()
          break
      }
    }
  }
  //随机下一个
  function getRandomModel() {
    return [ElsModel_1, ElsModel_2, ElsModel_3, ElsModel_4, ElsModel_5][Math.floor(Math.random() * 5)]
  }
  const nextModelFN = () => {
    currentModel = nextModel
    nextModel = getRandomModel()
    updateView()
  }
  useEffect(() => {
    // prototype
    return () => {
      clearInterval(interVal as NodeJS.Timer)
      ElsBoard.reset()
    }
  }, [])
  const timeFly = () => {
    console.log('这是计时器')
    move(0, 1, currentModel, callBack)
    updateView()

  }
  return (
    < >
      <div className='elsfk-continer'>
        <div>{state.statues}</div>
        <div>moveblock绝对坐标：{JSON.stringify(state.cPoints)}</div>
        <div>nextModel坐标：{JSON.stringify(state.mPoints)}</div>
        <div className='elsfk-continer-board'>
          <div className='score-board'>
            <h6 style={{ textAlign: 'center' }}>看分版</h6>
            <div className='score-div'>分数：{scoceFen}</div>
            <div className='score-board-point'>
              <NormalBoard styleBord='overlayScore' list={state.mPoints}></NormalBoard>
              <NormalBoard styleBord='score' list={state.mPoints}></NormalBoard>
            </div>
          </div>
          <div className='els-board'>
            <NormalBoard styleBord='overlay' list={[]}></NormalBoard>
            {state.statues != 'start' && [
              <NormalBoard styleBord='block' list={state.sPoints}></NormalBoard>,
              <NormalBoard styleBord='moveBlock' list={state.cPoints}></NormalBoard>
            ]}
          </div>
        </div>

      </div>
      <div className='btn-Contienr'>{state.statues != 'starting' && (<Button className='starBtn' onClick={() => {
        rest()
        onKeyDown()
        interVal = setInterval(timeFly, 1000)
        dispatch({
          type: 'update', payload: {
            statues: 'starting'
          }
        })
      }}>{state.statues == 'end' ? '重新开始' : '开始'}</Button>)}</div>
    </>
  )
}