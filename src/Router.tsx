/*
 * @Author: ouxuesen
 * @Date: 2022-03-21 16:45:42
 * @LastEditTime: 2022-04-25 16:25:50
 * @LastEditors: ouxuesen
 * @Description: 
 * @FilePath: /react-typescript-demo/src/Router.tsx
 * 一路向前
 */
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Game from './component/Game'
import SGame from "./component/SaoLei/SGame";
import Test from './pages/Test'
import HolidayEle from './pages/holiday/holiday'
import App from './App';
import { Container } from 'react-bootstrap'
import MyNavigation from "./component/MyNavigation";
export default class Router extends React.Component {
  render(): React.ReactNode {
    return (
      <BrowserRouter>
        <MyNavigation />
        <Container >
        <Routes>
          <Route path="/" element={<Game />} />
          <Route path="/home" element={<Home />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/app" element={<App />} />
          <Route path="/game" element={<Game />} />
          <Route path="/sgame" element={<SGame />} />
          <Route path="/test" element={<Test />} />
          <Route path="/holidayEle" element={<HolidayEle/>}></Route>
        </Routes>
        </ Container>
      </BrowserRouter>
    )
  }
}