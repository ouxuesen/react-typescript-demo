/*
 * @Author: ouxuesen
 * @Date: 2022-03-30 16:45:26
 * @LastEditTime: 2022-04-07 18:18:43
 * @LastEditors: ouxuesen
 * @Description: 
 * @FilePath: /react-typescript-demo/src/component/SaoLei/SGame.tsx
 * 一路向前
 */
import React from 'react'
import './index.css'
import SBoard from "./SBoard";
const SGame = () => {
  return (
    <div onContextMenu={(e)=>{
      e.preventDefault()
      return false}} >
        <SBoard></SBoard>
    </div>
  )
}

export default SGame