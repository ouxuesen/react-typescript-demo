/*
 * @Author: ouxuesen
 * @Date: 2022-04-27 14:39:51
 * @LastEditTime: 2022-04-27 15:26:02
 * @LastEditors: ouxuesen
 * @Description: 
 * @FilePath: /react-typescript-demo/src/pages/animal/springAnimal.tsx
 * 一路向前
 */
import React, { useEffect, useState } from 'react'
import { useSpring, animated, config } from "react-spring";
type Props = {}

function BackwardsCompatability() {
    const [styles, api] = useSpring(() => ({
        from: { x: -50, opacity: 1 }
    }))
    useEffect(() => {
        api({
            x: 50,
            opacity: 1,
            loop: { reverse: true },
        })
    }, [])
    return (
        <animated.div
            style={{
                width: 80,
                height: 80,
                backgroundColor: '#46e891',
                borderRadius: 16,
                ...styles,
            }}
        />
    )
}
function Number() {
    const [flip, set] = useState(false)
    const { number } = useSpring({
        reset: true,
        reverse: flip,
        from: { number: 0 },
        number: 1,
        delay: 200,
        config: config.molasses,
        onRest: () => set(!flip),
    })

    return <animated.div>{number.to(n => n.toFixed(2))}</animated.div>
}
// function SVG() {
//     const [flip, set] = useState(false)
//     const { x } = useSpring({
//       reset: true,
//       reverse: flip,
//       from: { x: 0 },
//       x: 1,
//       delay: 200,
//       config: config.molasses,
//       onRest: () => set(!flip),
//     })
  
//     return (
//       <animated.svg
//         style={{ margin: 20, width: 80, height: 80 }}
//         viewBox="0 0 45 44"
//         strokeWidth="2"
//         fill="white"
//         stroke="rgb(45, 55, 71)"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeDasharray={156}
//         strokeDashoffset={x.to(x => (1 - x) * 156)}>
//         <polygon points={POINTS} />
//       </animated.svg>
//     )
//   }
function SpringAnimal({ }: Props) {
    return (
        <>
            <BackwardsCompatability></BackwardsCompatability>
            <Number></Number>
        </>
    )
}

export default SpringAnimal
