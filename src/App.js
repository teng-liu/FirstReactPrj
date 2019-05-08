import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import Todos from './components/Todos';

class App extends Component {
  state = {
    todos:[
      {
        id:1,
        title: 'Take out trash',
        completed: false
      },
      {
        id:2,
        title: 'Dinner with family',
        completed: false
      },
      {
        id:3,
        title: 'Meeting with boos',
        completed: false
      },
      {
        id:4,
        title: 'Do exercise',
        completed: true
      },
    ]

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


  render() {
    return (
      <div className="App">
      {/* following: pass the data from App.state, to the Todos.js */}
        <Todos todos={this.state.todos} markComplete={this.markComplete}/>


      </div>
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
