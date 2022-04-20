/*
 * @Author: ouxuesen
 * @Date: 2022-03-22 15:52:01
 * @LastEditTime: 2022-04-07 18:06:45
 * @LastEditors: ouxuesen
 * @Description: 
 * @FilePath: /react-typescript-demo/src/component/SaoLei/SBoard.tsx
 * 一路向前
 */
import SUnite from "./SSquare";
import { SaoLeiPros, Point } from './interfacePros'
import { useEffect, useState } from "react";
import { Button } from 'react-bootstrap'

var tcopyArrayItem:Array<Array<SaoLeiPros>>=[]
var copySGameStatus :string
const SBoard: React.FC = () => {
    let leiNum: number = 10
    let rolLine: number = 10

    type gameStatus = 'init' | 'start' | 'win' | 'over'
    const [sGameStatus, setSGameStatus] = useState<gameStatus>('init');
    const [arrayItem, setArrayItem] = useState<Array<Array<SaoLeiPros>>>(resetData());
    
    function uniteClick(item: SaoLeiPros) {
        if (!item.status&&copySGameStatus==='init') {
            item.status = true
            blankDeail(item,tcopyArrayItem)
            judgeReslt(item,tcopyArrayItem)
            setArrayItem([...tcopyArrayItem])
        }
    }
    useEffect(() => {
        tcopyArrayItem = arrayItem
        copySGameStatus = sGameStatus
    }, [arrayItem,sGameStatus])
   
    //点击展示空白
    function blankDeail(item:SaoLeiPros,list:SaoLeiPros[][]){
        let  direction: Array<Point> = [{ x: -1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }, { x: 1, y: 0 }]
        if (!item.isLei&&item.number==0) {
            direction.forEach(diritem => {
                let x = item.x + diritem.x
                let y = item.y + diritem.y
                if (x > -1 && x < rolLine && y > -1 && y < rolLine) {
                    let dirItem = list[y][x]
                    if (!dirItem.isLei&&dirItem.number==0&&!dirItem.status){
                        dirItem.status = true
                        blankDeail(dirItem,list)
                    }else{
                        dirItem.status = true
                    }
                }
            })
            
        }
    }
    //判断结果
    function judgeReslt(item:SaoLeiPros,list:SaoLeiPros[][]){
        if(item.isLei){
            setSGameStatus('over')
        }else{
            let count = 0
            list.forEach((itemArray, yindex) => {
                itemArray.forEach((item, xindex) => {
                    if (!item.status) {
                        count+=1
                    }
                })
            })  
            console.log('count',count)
            if(count === leiNum){
                setSGameStatus('win')
            }
        }
    }
    //计算非雷的个数
    function getNumber(initArray: Array<Array<SaoLeiPros>>) {
        let  direction: Array<Point> = [{ x: -1, y: -1 }, { x: -1, y: 0 }, { x: -1, y: 1 }, { x: 0, y: -1 }, { x: 0, y: 1 }, { x: 1, y: -1 }, { x: 1, y: 0 }, { x: 1, y: 1 }]
        initArray.forEach((itemArray, yindex) => {
            itemArray.forEach((item, xindex) => {
                if (!item.isLei) {
                    let number = 0
                    direction.forEach(diritem => {
                        let x = xindex + diritem.x
                        let y = yindex + diritem.y
                        if (x > -1 && x < rolLine && y > -1 && y < rolLine) {
                            if (initArray[y][x].isLei) number += 1
                        }
                    })
                    item.number = number
                }

            })
        })
    }
    //创建雷并填充
    function createLei(initArray: Array<Array<SaoLeiPros>>) {
        // let rol = rol = rolLine
        var tempLei: Array<Point> = []
        let random = () => {
            return parseInt((Math.random() * rolLine).toString())
        }
        while (tempLei.length !== leiNum) {
            let item = { x: random(), y: random() }
            if (tempLei.every(itemT => {
                return `${itemT.x}*${itemT.y}` !== `${item.x}*${item.y}`
            })) {
                tempLei.push(item)
            }

        }
        tempLei.forEach(item => {
            initArray[item.y][item.x].isLei = true
        })
    }
    function resetData() {
        let initArray: Array<Array<SaoLeiPros>> = []
        Array(rolLine).fill(null).forEach((item: null, index: number) => {
            let rolArray: Array<SaoLeiPros> = []
            initArray.push(rolArray)
            Array(rolLine).fill(null).forEach((item: null, xindex: number) => {
                rolArray.push({
                    onClick: (item: SaoLeiPros) => uniteClick(item),
                    status: false,
                    flag: false,
                    number: 0,  //数量
                    isLei: false,//是否是雷
                    x: xindex,
                    y: index
                })
            })
        })
        createLei(initArray)
        getNumber(initArray)
        return initArray
    }

    return (
        <div className="col justify-content-center">
            <h3 className="text-center p-2">{sGameStatus}</h3>
            <div className="board-table">
                {arrayItem.map((itemArray: Array<SaoLeiPros>, yindex: number) => {
                    return <div className="line-class" key={yindex}>
                        {itemArray.map((item: SaoLeiPros, xindex) => {
                            return <SUnite key={xindex} item={item} ></SUnite>
                        })}
                    </div>
                })}
            </div>
            <div className="mt-2 text-center">
                <Button variant="primary" onClick={() => {
                    setSGameStatus('init')
                    setArrayItem(resetData())
                }}>reset</Button>
            </div>
        </div>
    )
}
export default SBoard