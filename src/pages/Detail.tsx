/*
 * @Author: ouxuesen
 * @Date: 2022-03-21 16:43:03
 * @LastEditTime: 2022-04-07 16:01:56
 * @LastEditors: ouxuesen
 * @Description: 
 * @FilePath: /react-typescript-demo/src/pages/Detail.tsx
 * 一路向前
 */
import React, { useReducer, useState } from 'react'
import { Button } from "react-bootstrap";
import PagInation from "../component/Pagination/PagInation";
type Props = {
    value: number
}
const initialState = {count: 0};

type actiontype = 'increment'|'decrement'|'reset'
function reducer(state: { count: number}, action: { type: actiontype,payload?:number}) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    case 'reset':
      return {count:action.payload||0}
    default:
     let error = new Error()
     error.message = 'sss';
     throw error
  }
}
 const Detail: React.FC = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    type btnType = 'next' | 'pre' | number;
    const getPages = (start:number,range:number)=>{
        return Array(range).fill(null).map((item:null,index:number)=>{
            return index + start
        })
    }
    const [pages, setPages] = useState<number[]>(getPages(1,10));
    const [active, setactive] = useState<number>(1);
    return (
        <div className='d-grid gap-2 mt-3'>
            <Button variant='secondary' onClick={() => {
                dispatch({type:'increment'})
            }}>+1</Button>
            <Button variant='primary' onClick={() => {
                dispatch({type:'decrement'})
            }}>-1</Button>
            <div>{state.count}</div>
            <PagInation pages={pages} active={active} onClick={(btnType:btnType)=>{
                if(typeof btnType === 'number'){
                    console.log('点击了',btnType)
                    setactive(btnType as number)
                }else{
                    let currentPages = []
                    if(btnType === 'next'){
                        currentPages = getPages(pages[0]+10,10)
                        setPages(currentPages)
                        setactive(currentPages[0])
                    }else{
                        if(pages[0]>10){
                            
                            currentPages = getPages(pages[0]-10,10)
                            setPages(currentPages)
                            setactive(currentPages[0])
                        }
                    }
                    
                    console.log('点击了上下页',btnType)
                }
            }}></PagInation>
        </div>
    );
}
export default Detail