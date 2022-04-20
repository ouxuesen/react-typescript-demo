/*
 * @Author: ouxuesen
 * @Date: 2022-04-07 12:24:33
 * @LastEditTime: 2022-04-07 16:03:56
 * @LastEditors: ouxuesen
 * @Description: 
 * @FilePath: /react-typescript-demo/src/component/Pagination/PagInation.tsx
 * 一路向前
 */
import React, { useState } from 'react'
import './page.css'
type btnType = 'next' | 'pre' | number;
type pageProp = {
    onClick?: (type: btnType) => void;
    pages: number[];
    active: number;
}

const PagInation = (props: pageProp) => {
    const clickAction  = (btntype:btnType)=>{
        props.onClick ? props.onClick(btntype) : null 
    }
    return (
        <>
            <ul className="pagination">
                <li><a href="#" onClick={() => { clickAction('pre') }}>«</a></li>
                {props.pages.map((page: number) => {
                    return <li key={page}><a className={props.active===page?'active':''} onClick={() => { clickAction(page) }}>{page}</a></li>
                })}
                <li><a onClick={() => { clickAction('next')}}>»</a></li>
            </ul>
        </>
    )
}
export default PagInation