import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, ButtonGroup, Card } from "react-bootstrap";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <input type="text" placeholder='我门都是好孩子' data-testid='input-fouce' />
          <Card.Title>Card Title</Card.Title>
          <Card.Text data-testid='empty'>
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
          </Card.Text>
          <Button data-testid='button' disabled variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default App;
