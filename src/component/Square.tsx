/*
 * @Author: ouxuesen
 * @Date: 2022-03-18 18:31:48
 * @LastEditTime: 2022-03-21 16:33:17
 * @LastEditors: ouxuesen
 * @Description: 
 * @FilePath: /react-typescript-demo/src/component/Square.tsx
 * 一路向前
 */
import React from "react";
import IProps from "./face";
class Square extends React.Component<IProps>{
    render(): React.ReactNode {
        return (
            <button className="square" onClick={
                ()=>this.props.onClick()
            }>
                {this.props.value}
            </button>
        )
    }
}
export default Square