// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import TodoList from './components/Todo/TodoList';
import AddTodo from './components/Todo/AddTodo';
import './App.scss';
import './components/Navbar/Navbar.scss';
import './components/Auth/Login.scss';
import './components/Auth/Signup.scss';
import './components/Todo/TodoList.scss';
import './components/Todo/AddTodo.scss';

const App = () => {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<TodoList className="todo-list" />} />
            <Route path="/login" element={<Login className="auth-container" />} />
            <Route path="/signup" element={<Signup className="auth-container" />} />
            <Route path="/add" element={<AddTodo className="add-todo" />} />
          </Routes>
        </main>
        <footer>
          &copy; {new Date().getFullYear()} Created by Daniel Llerena
        </footer>
      </Router>
    </div>
  );
};

export default App;