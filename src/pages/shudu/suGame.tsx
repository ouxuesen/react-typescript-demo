/*
 * @Author: ouxuesen
 * @Date: 2022-04-22 17:54:37
 * @LastEditTime: 2022-04-24 14:38:23
 * @LastEditors: ouxuesen
 * @Description: 
 * @FilePath: /react-typescript-demo/src/pages/shudu/suGame.tsx
 * 一路向前
 */
import SdBoard, { sdProp, sdShowProps } from './sdBoard'
import React, { Reducer, useEffect, useReducer, useState } from 'react'
import { SDModel } from './sdmodel'
import { Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap'
import './index.css'
import moment from 'moment'
type actiontype = 'update'
type stateType = 'start' | 'starting' | 'end'
function reducer(state: { points: sdShowProps[], statues: stateType, time: string } & sdProp, action: { type: actiontype, payload: {} }) {
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
const model = new SDModel()
let timeflycount: number | null
let interVal: NodeJS.Timer | null = null;
// model.fillRaodm()
function SDGame() {
    function onClick(index: number) {
        dispatch({
            type: 'update', payload: {
                eideIndex: index
            }
        })
    }

    const [state, dispatch] = useReducer(reducer, { points: model._matrixArray, statues: 'start', eideIndex: -1, time: '00:00:00' });
    useEffect(() => {
        // prototype
        return () => {
            clearInterval(interVal as NodeJS.Timer)
        }
    }, [])
   
    return (
        <div className='sd-main'>
            <div className='sugame-heard'>
                <h5>数独</h5>moment
                <div><span>状态：{state.statues}</span>{'  '}<span> 时间：{state.time}</span></div>
            </div>
            <div className='btn-continer'>
                <ButtonToolbar aria-label="Toolbar with button groups">
                    {Array(10).fill(0).map((ssm, index) => {
                        return (<ButtonGroup key={index} className="me-2" aria-label="First group">
                            <Button onClick={(e) => {
                                //替换数字
                                if (model.verificationSingerNum(state.eideIndex, index)) {
                                    model.setIndexNum(state.eideIndex, index)
                                    if (model.fillVerification().sucess) {
                                        clearInterval(interVal as NodeJS.Timer)
                                        interVal = null
                                        dispatch({
                                            type: 'update', payload: {
                                                points: model._matrixArray,
                                                statues: 'end',
                                                eideIndex: -1
                                            }
                                        })
                                        // alert('you win!')
                                    } else {
                                        dispatch({
                                            type: 'update', payload: {
                                                points: model._matrixArray
                                            }
                                        })
                                    }
                                } else {
                                    alert('选入数字不符合数独规则')
                                }
                                e.preventDefault()
                            }}>{index}</Button>
                        </ButtonGroup>)
                    })}
                </ButtonToolbar>
            </div>
            <div className=''>
                {state.statues != 'start' && <SdBoard list={state.points} onClick={onClick as (index: number) => {}} eideIndex={state.eideIndex}></SdBoard>}
            </div>
            <div><Button variant="outline-primary" size='sm' onClick={() => {
                model.fillRaodm()
                if (interVal == null) {
                    interVal = setInterval(() => {
                        if (interVal === null) {
                            return
                        }
                        if (timeflycount != null) {
                            timeflycount++
                            let gaps = moment.duration(timeflycount, "seconds")
                            dispatch({
                                type: 'update', payload: {
                                    time: moment({ h: gaps.hours(), m: gaps.minutes(), s: gaps.seconds() }).format('HH:mm:ss') || '00:00:00'
                                }
                            })
                        }

                    }, 1000)
                }
                timeflycount = 0
                dispatch({
                    type: 'update', payload: {
                        points: model._matrixArray,
                        time: 0,
                        statues: 'starting'
                    }
                })
            }}>{state.statues == 'start' ? '点击开始' : '重新开始'}</Button></div>
        </div >
    )
}

export default SDGame