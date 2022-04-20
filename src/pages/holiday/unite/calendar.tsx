/*
 * @Author: ouxuesen
 * @Date: 2022-04-12 14:36:36
 * @LastEditTime: 2022-04-18 15:36:21
 * @LastEditors: ouxuesen
 * @Description: 
 * @FilePath: /react-typescript-demo/src/pages/holiday/unite/calendar.tsx
 * 一路向前
 */
import React, { useEffect, useState } from 'react'
import { DayRes } from '../services'
import * as _ from 'lodash'
import moment from 'moment'
function CalendarUnite({ item }: { item: DayRes | null }) {
  return (
    <td className={item&&(item as DayRes).type!=0?'calen-unite calen-unite-active':'calen-unite'}>
      {
        item != null && (
          <>
            <sup>{['班', '休', '休'][(item as DayRes).type]}</sup>
            <var>{moment((item as DayRes).date,'YYYY-MM-DD').format('D')}</var>
            {/* <span>{(item as DayRes).solarTerms}</span> */}
            <span>{(item as DayRes).type ===2?(item as DayRes).typeDes:(item as DayRes).solarTerms}</span>
          </>
        )
      }
    </td>
  )
}


function Calendar({ list, month }: { list: DayRes[], month: number }) {
  const getDealYears = () => {
    let tempArray: DayRes[] = []
    //获取第一个周几
    if (list.length < 2) {
      return []
    }
    let firstDay: DayRes = list[0]
    let lastDay: DayRes = list[list.length - 1]
    if(firstDay.weekDay<7){
      Array(firstDay.weekDay).fill(null).forEach((unite: null) => {
        tempArray.push(unite as unknown as DayRes)
      })
    }
    tempArray = tempArray.concat(list)
    if(7-lastDay.weekDay%7-1>0){
      Array(7-lastDay.weekDay%7-1).fill(null).forEach((unite: null) => {
        tempArray.push(unite as unknown as DayRes)
      })
    }

    return tempArray
  }
  useEffect(() => {
    setYearsCurrent(getDealYears())
  }, [list])
  
  const [yearsCurrent, setYearsCurrent] = useState<DayRes[]>(getDealYears());
  
  return (
    <div className='calen-table'>
      <h3 className='calen-title'>第{month}月份</h3>
      <table >
        <tbody>
          <tr>{['周日', '周一', '周二', '周三', '周四', '周五', '周六'].map(item => {
            return <th key={item}>{item}</th>
          })}</tr>
          <>{_.chunk(yearsCurrent, 7).map(curren => {
            return <tr>{curren.map((day: DayRes | null, index: number) => {
              return <CalendarUnite item={day} key={index}></CalendarUnite>
            })}</tr>
          })}</>
        </tbody>

      </table>
    </div>
  )
}

export default Calendar