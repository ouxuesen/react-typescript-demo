/*
 * @Author: ouxuesen
 * @Date: 2022-04-18 15:47:47
 * @LastEditTime: 2022-04-18 17:26:17
 * @LastEditors: ouxuesen
 * @Description: 
 * @FilePath: /react-typescript-demo/src/pages/grid/gridCss.tsx
 * 一路向前
 */
import React from 'react'
import  NormalBoard ,{boardStyle} from './gridBoard'
import './index.css'
export default function GridCss() {
  return (
    <div style={{marginTop:'10px'}}  className='board' >
        <NormalBoard  styleBord='overlay'></NormalBoard>
        <NormalBoard styleBord='garden'></NormalBoard>
        <NormalBoard styleBord='plants'></NormalBoard>
    </div>
  )
}
