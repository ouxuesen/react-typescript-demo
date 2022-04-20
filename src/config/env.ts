/*
 * @Author: ouxuesen
 * @Date: 2022-04-11 10:49:46
 * @LastEditTime: 2022-04-11 13:08:30
 * @LastEditors: ouxuesen
 * @Description: 
 * @FilePath: /react-typescript-demo/src/config/env.ts
 * 一路向前
 */
let baseUrl = ''
if(process.env.NODE_ENV === 'development'){
    baseUrl = 'https://www.mxnzp.com/'
}else if(process.env.NODE_ENV === 'production'){
    baseUrl = 'https://www.mxnzp.com/'
}
export {
    baseUrl
}