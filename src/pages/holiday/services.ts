/*
 * @Author: ouxuesen
 * @Date: 2022-04-11 11:22:15
 * @LastEditTime: 2022-04-29 14:54:01
 * @LastEditors: ouxuesen
 * @Description: 
 * @FilePath: /react-typescript-demo/src/pages/holiday/services.ts
 * 一路向前
 */
import { type } from "os";
import axios from "../../request/myAxios";
const requestParams = {
    app_id: 'poxfi8kdgsnkdxew',
    app_secret: 'VkhOdlhzOXMyUDlXYnJMR0tSQ0JrZz09'
}
interface responseBase<T>{
    code: number;
    msg: string;
    data:T[]
}
export interface recentRes {
    date: string;
    lunarDate: string;
    holidayName: string;
    residueDays: number;
    lunarHoliday: boolean
} 

//获取最近假日
export async function getRecent() {
    return axios.get<responseBase<recentRes>>('/api/holiday/recent/list', { params: requestParams })
}
export interface yearParms {
    date: string; //yyyyMMdd
    ignoreHoliday: boolean;
}
export interface DayRes {
    month: number;
    year: number;
    date: string;
    weekDay: number;
    yearTips: string;
    type: number;
    typeDes: string;
    chineseZodiac: string;
    solarTerms: string;
    lunarCalendar: string;
    suit: string;
    dayOfYear: number;
    weekOfYear: number;
    constellation: string;
    indexWorkDayOfMonth: string;
}
export interface MonthRes{
    month:number,
    year:number,
    days:DayRes[]
}
export interface YearRes{
    data:MonthRes[]
}

//获取一年内的假日信息
export async function getYearList(params: yearParms) {
    return axios.get<responseBase<MonthRes>>(`/api/holiday/list/year/${params.date}`, {
        params: {
            // ...params,
            ...requestParams
        }
    })
}