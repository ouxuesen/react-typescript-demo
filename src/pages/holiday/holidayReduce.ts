/*
 * @Author: ouxuesen
 * @Date: 2022-04-11 18:28:31
 * @LastEditTime: 2022-04-18 12:15:09
 * @LastEditors: ouxuesen
 * @Description: 
 * @FilePath: /react-typescript-demo/src/pages/holiday/holidayReduce.ts
 * 一路向前
 */
import  { useReducer} from 'react'
import { getRecent,getYearList,recentRes,YearRes,yearParms, MonthRes} from './services'

export const initialRecentList = async ()=>{
    let result = await getRecent()
    if(result.data.code ==1){
        return result.data.data
    }else{
        return []
    }
};
//获取一年的
export const initialYearList = async (params:yearParms)=>{
    let result = await getYearList(params)
    if(result.data.code ==1){
        return result.data.data
    }else{
        return []
    }
};
export const initState = {
    recentList:[],
    yearList:[],
    loading:true,
}
type actiontype = 'update' | 'clear' 
export function reducer(state:{recentList:recentRes[],yearList:MonthRes[],loading:boolean}, action: { type: actiontype, payload: {} }) {
    switch (action.type) {
        case 'update':
            return {
                ...state,
                ...action.payload
            };
        case 'clear':
            return initState;
        default:
            throw new Error()
    }
}

