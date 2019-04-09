import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Header from './components/layout/Header';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo'
import axios from 'axios';
import './App.css';

class App extends Component {

  state={
    todos: []
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos')
    .then(res => this.setState({todos: res.data})) 
  }
  // THINK ABOUT THE <TODOS/> AS A GATE WHERE STATE CAN BE PASSED DOWN AS 
  // PROPS AND FUNCTIONS CAN BE PASSED UP THROUGH PROPS


  // Togle Complete 
  

  markComplete = (id) => {
    this.setState({ todos: this.state.todos.map(todo => {
      if(todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo
    })})
  }

// Delete Todo
  
delTodo = (id) => {
  axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(res => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)]}))
} 

// Add Todo

addTodo = (title) => {
  axios.post('https://jsonplaceholder.typicode.com/todos', {
    title,
    completed: false
  })
    .then(res => this.setState({ todos: [...this.state.todos, res.data] }))
  
}
  render() {
    console.log(this.state.todos)
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <AddTodo addTodo={this.addTodo} />
            <Todos
              todos={this.state.todos}
              markComplete={this.markComplete}
              delTodo={this.delTodo}
            />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
