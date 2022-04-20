/*
 * @Author: ouxuesen
 * @Date: 2022-04-08 17:49:57
 * @LastEditTime: 2022-04-11 11:01:53
 * @LastEditors: ouxuesen
 * @Description: 
 * @FilePath: /react-typescript-demo/src/request/myAxios.ts
 * 一路向前
 */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosPromise, AxiosResponse } from "axios";
import { baseUrl } from "../config/env";

axios.defaults.baseURL = baseUrl
axios.interceptors.request.use((config: AxiosRequestConfig) => {
    return config
})
axios.interceptors.response.use((response: AxiosResponse) => {
    return response
})
export default axios