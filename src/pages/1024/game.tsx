/*
 * @Author: ouxuesen
 * @Date: 2022-04-24 14:40:06
 * @LastEditTime: 2022-04-25 16:07:58
 * @LastEditors: ouxuesen
 * @Description: 
 * @FilePath: /react-typescript-demo/src/pages/1024/game.tsx
 * 一路向前
 */
import React, { Reducer, useEffect, useReducer, useState } from 'react'
import DefulatModel, { pointType, directionType, boardModel } from './yiModel'
import { Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap'
import OverlayBoard from './gameBoard'
import './index.css'
type Props = {}
import moment from 'moment'
type actiontype = 'update'
type stateType = 'start' | 'starting' | 'end'
// type 
function reducer(state: { points: boardModel[], statues: stateType, time: string, degre: number ,score:number}, action: { type: actiontype, payload: {} }) {
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

let timeflycount: number | null
let interVal: NodeJS.Timer | null = null;
let model = new DefulatModel(3)
model.getRandom()
model.getRandom()
const DefaultGame = (props: Props) => {
  let btnList = [{
    lable: '3*3',
    degee: 3
  }, {
    lable: '4*4',
    degee: 4
  }, {
    lable: '5*5',
    degee: 5
  }]
  const [Degre, setDegre] = useState(3)
  const [state, dispatch] = useReducer(reducer, { points: model._matrixArray, statues: 'start', time: '00:00:00', degre: model._degre ,score:0});
  useEffect(() => {
    // prototype
    return () => {
      clearInterval(interVal as NodeJS.Timer)
    }
  }, [])
  function timeFly() {
    if (timeflycount == undefined) {
      timeflycount = 0
    }
    (timeflycount as number)++
    let gaps = moment.duration(timeflycount, "seconds")
    dispatch({
      type: 'update',
      payload: {
        time: moment({ h: gaps.hours(), m: gaps.minutes(), s: gaps.seconds() }).format('HH:mm:ss') || '00:00:00'
      }
    })

  }
  function clickDiren(direction: directionType) {
    if (!interVal) {
      interVal = setInterval(timeFly, 1000)
    }
    if (model.canmove(direction)) {
       let curetns = model.move(direction)
       curetns = state.score + curetns
       
      if (model.canmoveAll()) {
        model.getRandom()
        dispatch({
          type: 'update',
          payload: {
            points: model._matrixArray,
            score:curetns
          }
        })
      } else {
        dispatch({
          type: 'update',
          payload: {
            state: 'end'
          }
        })
        alert('游戏结束')
      }

    } else {
      console.log('不能发生移动')
    }

  }
  return (
    <div>
      <div className='default-heard'>
        <div>
          {btnList.map((item) => {
            return <a key={item.degee} onClick={() => {
              setDegre(item.degee)
              timeflycount = 0
              if (interVal) {
                clearInterval(interVal as NodeJS.Timer)
              }
              interVal = null;
              model = new DefulatModel(item.degee)
              model.getRandom()
              model.getRandom()
              dispatch({
                type: 'update',
                payload: {
                  points: model._matrixArray,
                  statues: 'start', time: '00:00:00', degre: model._degre
                }
              })
            }} className={Degre == item.degee ? 'game-heard-a game-heard-active' : 'game-heard-a'} >{item.lable}</a>
          })}
        </div>
        <h5>1024</h5>
        <div><span>得分：{state.score}</span></div>
        <div><span>状态：{state.statues}</span>{'  '}<span> 时间：{state.time}</span></div>
      </div>
      <div className='default-content'>
        <OverlayBoard list={state.points} degre={state.degre}></OverlayBoard>
      </div>
      <div className='btn-continer'>
        <ButtonGroup aria-label="Basic example">
          <Button size='sm' onClick={() => {
            clickDiren('left')
          }}>Left</Button>{<span style={{}}>&ensp;</span>}
          <Button size='sm' onClick={() => {
            clickDiren('right')
          }}>right</Button>{<span style={{}}>&ensp;</span>}
          <Button size='sm' onClick={() => {
            clickDiren('top')
          }}>Top</Button>{<span style={{}}>&ensp;</span>}
          <Button size='sm' onClick={() => {
            clickDiren('bottom')
          }}>botoom</Button>{<span style={{}}>&ensp;</span>}
        </ButtonGroup>
      </div>
      <div className='btn-continer'><Button variant="outline-primary" size='sm' onClick={() => {
        if (interVal) {
          clearInterval(interVal as NodeJS.Timer)
        }
        interVal = null;
        model.reset()
        model.getRandom()
        model.getRandom()
        dispatch({
          type: 'update',
          payload: {
            points: model._matrixArray,
            statues: 'start', time: '00:00:00', degre: model._degre
          }
        })

      }}>重新开始</Button></div>
    </div>
  )
}

export default DefaultGame