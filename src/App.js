import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import Todos from './components/Todos';
import Header from './components/layout/Header';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
import TryFMA from './components/tryFMA';
import ProcessStatus from './components/processStatus';
import axios from 'axios';
import uuid from 'uuid';


class App extends Component {

  //-----hard-coded data for todo list
  // state = {
  //   todos:[
  //     {
  //       id: uuid.v4(),
  //       title: 'Take out trash',
  //       completed: false
  //     },
  //     {
  //       id: uuid.v4(),
  //       title: 'Dinner with family',
  //       completed: false
  //     },
  //     {
  //       id: uuid.v4(),
  //       title: 'Meeting with boos',
  //       completed: false
  //     },
  //     {
  //       id: uuid.v4(),
  //       title: 'Do exercise',
  //       completed: false
  //     },
  //   ]
  // }


  //---gona call public API 
  state = {
    todos: []
  }

  componentDidMount() {
    axios.get('http://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(res => this.setState({todos: res.data}))
  }


  // Toggle completed
  markComplete = (id) => {
    console.log(id)
    this.setState({ todos: this.state.todos.map(todo => {
      if(todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo;
    }) });

  }

  delTodo = (id) => {
    //this.setState({ todos: [...this.state.todos.filter(todo => todo.id !==id)]});
    axios.delete(`http://jsonplaceholder.typicode.com/todos/${id}`)
      .then(res => this.setState({ 
          todos: [...this.state.todos.filter(todo => todo.id !==id)]}));
  }

  // Add Todo
  addTodo = (title) => {
    axios.post('http://jsonplaceholder.typicode.com/todos',{
      title,
      completed: false
    }).then(res => this.setState({todos: 
        [...this.state.todos, res.data]}));
  }

  // addTodo = (title) => {
  //   const newTodo = {
  //     id: uuid.v4(),
  //     title,
  //     completed: false
  //   }
  //   this.setState({todos: [...this.state.todos, newTodo]});
  // }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            {/* <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo}/>
                <Todos todos={this.state.todos} 
                  markComplete={this.markComplete} 
                  delTodo={this.delTodo}/>
              </React.Fragment>
            )}/> */}
            <Route path="/process" component={ProcessStatus} /> 
            <Route path="/fma" component={TryFMA} />
            
          </div>
        </div>
      </Router>
  );
  }


}


// function App() {
//   return (
//     <div className="App">
//       <Todos />
//     </div>
//   );
// }

export default App;
