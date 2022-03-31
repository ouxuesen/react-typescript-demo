/*
 * @Author: ouxuesen
 * @Date: 2022-03-21 16:45:42
 * @LastEditTime: 2022-03-30 16:48:08
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
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/app" element={<App />} />
          <Route path="/game" element={<Game />} />
          <Route path="/sgame" element={<SGame />} />
        </Routes>
        </ Container>
      </BrowserRouter>
    )
  }
}