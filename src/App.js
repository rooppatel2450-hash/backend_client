import React from 'react';
import './App.css';
import InputTodo from './components/Inputtodo';
import ListTodo from './components/ListTodo';
import Login from './components/Login';


function App() {
  const token = localStorage.getItem('token');
  if (!token) return <Login />;
  return (
    <>
    <div>
      <InputTodo/>
      <ListTodo/>
    </div>
    
    </>
  );
}

export default App;
