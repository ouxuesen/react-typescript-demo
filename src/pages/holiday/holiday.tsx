/*
 * @Author: ouxuesen
 * @Date: 2022-04-11 11:03:13
 * @LastEditTime: 2022-04-18 15:29:00
 * @LastEditors: ouxuesen
 * @Description: 
 * @FilePath: /react-typescript-demo/src/pages/holiday/holiday.tsx
 * 一路向前
 */
import React, { useState, useReducer, useLayoutEffect } from 'react'
import { getRecent, recentRes } from './services'
import { Button, Spinner, Table, Placeholder } from "react-bootstrap";
import { reducer, initState, initialRecentList,initialYearList } from './holidayReduce'
import { MonthRes,DayRes } from "./services";
import Calendar from './unite/calendar'
import * as _ from 'lodash'
import './index.css'
import moment from 'moment';
//  export type holidayProps = {}

function HolidayEle() {
  const [state, dispatch] = useReducer(reducer, initState);
  const [yearCurrent, setYearCurrent] = useState<number>(new Date().getFullYear());
  const getYearList = () => {
    let date = new Date()
    return Array(10).fill(null).map((item,index)=>{
      return date.getFullYear()-index
    }).sort((a:number,b:number)=>{return b-a})
  }
  useLayoutEffect(() => {
    if (state.loading) {
      initialRecentList().then(result => {
        dispatch({
          type: 'update', payload: {
            loading: false,
            recentList: result
          }
        })
      })
      // moment(yearCurrent,'yyyy').format('yyyyMMdd')
      initialYearList({date:yearCurrent+"",ignoreHoliday:true}).then(result => {
        dispatch({
          type: 'update', payload: {
            loading: false,
            yearList: result
          }
        })
      })
    }
    return () => {
      console.log('send load')
    };
  })
  return (
    <>
      {state.loading ?
        <div>
          <Spinner aria-label='loading' animation="border" variant='primary'></Spinner>
          {/* {Array(5).fill(null).map((item, index) => {
            return <Placeholder as="p" animation="glow" key={index}>{Array(4).fill(null).map((item, xindex) => {
              return < ><Placeholder key={xindex + 10} xs={parseInt((Math.random() * 6).toString())} /><span key={xindex + 100}>   </span></>
            })}</Placeholder>
          })} */}
        </div> :
        <div className='holiday-continer'>
          <div className='holiday-heard'>
            {getYearList().map(year=>{
              return <a href="" className={year==yearCurrent?'holiday-heard-a holiday-heard-a-active':'holiday-heard-a'} onClick={(e)=>{
               
                setYearCurrent(year)
                dispatch({
                  type: 'update', payload: {
                    loading: true,
                  }
                })
                initialYearList({date:year+"",ignoreHoliday:true}).then(result => {
                  dispatch({
                    type: 'update', payload: {
                      loading: false,
                      yearList: result
                    }
                  })
                })
                e.preventDefault()
              }}>{year}</a>
            })}
          </div>
          <div className='year-list'>
            <h3>{yearCurrent}放假安排时间表</h3>
            <table cellPadding={10} width="100%" cellSpacing={10}>
              <tbody>
               <tr>
                 <th>节日名称</th>
                 <th>节日日期</th>
                 <th>节日农历日期</th>
                 <th>距离天数</th>
               </tr>
               {state.recentList.map((item,index)=>{
                 return <tr key={index}>
                   <td>{item.holidayName+(item.lunarHoliday?'(农历)':"")}</td>
                   <td>{item.date}</td>
                   <td>{item.lunarDate}</td>
                   <td>{item.residueDays}</td>
                 </tr>
               })}
               </tbody>
            </table>
            <div className='calendar-list'>
              <h3>{yearCurrent}年日历表</h3>
              {/* {JSON.stringify(state.yearList)} */}
               {_.chunk(state.yearList,2).map(current=>{
                 return <div className='clearfix'>{current.map((item:MonthRes)=>{
                  return <Calendar list={item.days} month={item.month} key={item.month}></Calendar>
                })}</div>
               })}
            </div>
          </div>

        </div>
      }
    </>
  );
}

export default HolidayEle