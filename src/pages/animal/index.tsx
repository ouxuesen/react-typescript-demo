/*
 * @Author: ouxuesen
 * @Date: 2022-04-26 11:01:38
 * @LastEditTime: 2022-04-26 15:34:49
 * @LastEditors: ouxuesen
 * @Description: 
 * @FilePath: /react-typescript-demo/src/pages/animal/index.tsx
 * 一路向前
 */
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  Container,
  ListGroup,
  Button,
} from 'react-bootstrap';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import {v1} from 'uuid';

import './index.css';

function TodoList() {
  const [items, setItems] = useState([
    { id: v1(), text: 'Buy eggs' },
    { id: v1(), text: 'Pay bills' },
    { id: v1(), text: 'Invite friends over' },
    { id: v1(), text: 'Fix the TV' },
  ]);
  return (
    <Container style={{ marginTop: '2rem' }}>
      <ListGroup style={{ marginBottom: '1rem' }}>
        <TransitionGroup className="todo-list">
          {items.map(({ id, text }) => (
            <CSSTransition
              key={id}
              timeout={500}
              classNames="item"
            >
              <ListGroup.Item>
                <Button
                  className="remove-btn"
                  variant="danger"
                  size="sm"
                  onClick={() =>
                    {
                    let tempitems = items.filter(item => item.id !== id)
                    tempitems.push({ id: v1(), text:'11111' },)
                    setItems(tempitems)
                  }}
                >
                  &times;
                </Button>
                {text}
              </ListGroup.Item>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
      <Button
        onClick={() => {
          const text = prompt('Enter some text');
          if (text) {
            setItems(items => [
              ...items,
              { id: v1(), text },
            ]);
          }
        }}
      >
        Add Item
      </Button>
    </Container>
  );
}

export default TodoList