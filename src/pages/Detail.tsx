/*
 * @Author: ouxuesen
 * @Date: 2022-03-21 16:43:03
 * @LastEditTime: 2022-03-30 14:45:09
 * @LastEditors: ouxuesen
 * @Description: 
 * @FilePath: /react-typescript-demo/src/pages/Detail.tsx
 * 一路向前
 */
import React from 'react'
import { Button } from "react-bootstrap";
import { createSlice, configureStore } from '@reduxjs/toolkit'
type Props = {
    value: number
}
 const Detail: React.FC = () => {

    const counterSlice = createSlice({
        name: 'counter',
        initialState: {
            value: 0
        },
        reducers: {
            incremented: (state: Props) => {
                state.value += 1
            },
            decremented: (state: Props) => {
                state.value -= 1
            }
        }
    })
    const { incremented, decremented } = counterSlice.actions
    const store = configureStore({
        reducer: counterSlice.reducer
    })
    store.subscribe(() => console.log(store.getState()))

    return (
        <div className='d-grid gap-2 mt-3'>
            <Button variant='secondary' onClick={() => {
                store.dispatch(decremented())
            }}>+1</Button>
            <Button variant='primary' onClick={() => {
                store.dispatch(incremented())
            }}>-1</Button>
            <div>{store.getState().value}</div>
        </div>
    );
}
export default Detail