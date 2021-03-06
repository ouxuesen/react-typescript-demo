/*
 * @Author: ouxuesen
 * @Date: 2022-03-21 17:06:53
 * @LastEditTime: 2022-04-18 15:40:57
 * @LastEditors: ouxuesen
 * @Description: 
 * @FilePath: /react-typescript-demo/src/component/MyNavigation.tsx
 * 一路向前
 */
import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
const MyNavigation: React.FC<{}> = () => {
    return (
        <>
            <Navbar bg="primary" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="/home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/game">Game</Nav.Link>
                            <Nav.Link href="/detail">details</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/sgame">Action</NavDropdown.Item>
                                <NavDropdown.Item href="/test">test</NavDropdown.Item>
                                <NavDropdown.Item href="/app">app</NavDropdown.Item>
                                <NavDropdown.Item href="/holidayEle">日历</NavDropdown.Item>
                                
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
export default MyNavigation