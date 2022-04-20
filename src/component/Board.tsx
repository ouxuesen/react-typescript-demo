/*
 * @Author: ouxuesen
 * @Date: 2022-03-18 18:33:21
 * @LastEditTime: 2022-04-07 10:39:12
 * @LastEditors: ouxuesen
 * @Description: 
 * @FilePath: /react-typescript-demo/src/component/Board.tsx
 * 一路向前
 */
import React from "react";
import Square from "./Square";
const rowLines: number = 3
class Board extends React.Component {
    // constructor(props:any) {
    //     super(props)
    //     this.state= {
    //         squares: Array(9).fill(null)
    //     }
    // }

    state = {
        squares: Array(rowLines * rowLines).fill(null),
        xIsNext: true,
        status: 'Next player :X'
    }
    reset() {
        this.setState({
            squares: Array(rowLines * rowLines).fill(null),
            xIsNext: true,
            status: 'Next player :X',
        })
    }
    // xIsNext true 红 蓝
    calculateWinner(squares: Array<string | null>, xIsNext: boolean): boolean {
        let totalIndex = squares.reduce((total: number, item: string | null, index: number) => {
            if (xIsNext) {
                return item as string === 'X' ? total + index : total + 0
            } else {
                return item as string === 'O' ? total + index : total + 0
            }
        }, 0)
        return totalIndex !== 0 && (totalIndex as number) % 3 === 0
    }
    handleClick(i: number) {
        const squares = this.state.squares.slice()
        if (squares[i]) {
            return
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O'
        this.setState({
            xIsNext: !this.state.xIsNext,
            status: `Next player : ${!this.state.xIsNext ? 'X' : 'O'}`
        })

        this.setState({ squares: squares })
        if (this.calculateWinner(squares, this.state.xIsNext)) {
            this.setState({
                status: `${this.state.xIsNext ? '红色方' : '蓝色方'} 赢了`
            })
        }
    }
    renderSquare(i: number): React.ReactNode {
        return <Square key={i} onClick={() => {
            this.handleClick(i)
        }} value={this.state.squares[i]} />
    }

    render(): React.ReactNode {
        const status = this.state.status
        return (
            <div>
                <div className="status">
                    {status}
                </div>
                {Array(rowLines).fill(null).map((item, row) => {
                    return <div key={row} className="board-row">
                        {Array(rowLines).fill(null).map((item, index) => {
                            return this.renderSquare(row * rowLines + index)
                        })}
                    </div>

                })}
                <div>
                    <button className="btnCenter" onClick={() => {
                        this.reset()
                    }}>重置</button>
                </div>
            </div>
        )
    }
}
export default Board