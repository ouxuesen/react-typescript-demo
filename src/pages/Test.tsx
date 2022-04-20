/*
 * @Author: ouxuesen
 * @Date: 2022-04-07 17:43:29
 * @LastEditTime: 2022-04-18 16:54:47
 * @LastEditors: ouxuesen
 * @Description: 
 * @FilePath: /react-typescript-demo/src/pages/Test.tsx
 * 一路向前
 */
import React from 'react'
import './test.css'
import GridCss from './grid/gridCss'
type Props = {}
const params = {
    alist: ['链接A', '链接b', '链接c'],
    right: ['右边'],
    cotent: [{
        title: '标题',
        img: 'https:sss',
        subTitle: '副标题',
        des: '描述'
    }, {
        title: '标题',
        img: 'https:sss',
        subTitle: '副标题',
        des: '描述'
    }, {
        title: '标题',
        img: 'https:sss',
        subTitle: '副标题',
        des: '描述'
    }],
    tips: [{
        title: 'tips标题',
        img: 'https:sss',
        subTitle: '副tips标题',
        des: '描述'
    }, {
        title: 'tips标题',
        img: 'https:sss',
        subTitle: '副tips标题',
        des: '描述'
    }, {
        title: 'tips标题',
        img: 'https:sss',
        subTitle: '副tips标题',
        des: '描述'
    }]
}
const Test = (props: Props) => {
    return (
        <div>
            {/* <div className="grid-container">
                <div className="item1" >头部</div>
                <div className="item2">菜单</div>
                <div className="item3">主要内容区域</div>
                <div className="item4">右侧</div>
                <div className="item5">底部</div>
            </div>
            <div className="grid-container-1">
                <div className="grid-item">1</div>
                <div className="grid-item">2</div>
                <div className="grid-item">3</div>
                <div className="grid-item">4</div>
                <div className="grid-item">5</div>
                <div className="grid-item">6</div>
                <div className="grid-item">7</div>
                <div className="grid-item">8</div>
            </div>
            <div className='splite-dev'></div>
            <div className='content-root'>
                <div className='root-herad'>

                </div>
                <div className='root-navi' aria-label='导航栏'>
                    {params.alist.map(a => {
                        return <a className='navi-link' key={a} ><span>{a}</span></a>
                    })}
                    <a href="" className='navi-link navi-link-right'>{params.right}</a>
                </div>
                <div className='root-row'>
                    <div className='root-body' aria-label='body'>
                        {params.cotent.map((item, index) => {
                            return <div className='root-body-card' key={index}>
                                <h3 className='card-top'>{item.title + index}</h3>
                                <img src={item.img} alt="" className='card-img' />
                                <div className='card-sub'>{item.subTitle}</div>
                                <div className='card-des'>{item.des}</div>
                            </div>
                        })}
                    </div>
                    <div className='root-tips'>
                        {params.tips.map((item, index) => {
                            return <div className='root-body-card' key={index}>
                                <h3 className='card-top'>{item.title + index}</h3>
                                <img src={item.img} alt="" className='card-img' />
                                <div className='card-sub'>{item.subTitle}</div>
                                <div className='card-des'>{item.des}</div>
                            </div>
                        })}
                    </div>
                </div>
                <div className='root-foot'></div>
            </div>
            <div className='splite-dev'></div> */}
            <GridCss></GridCss>
        </div>
    )
}

export default Test