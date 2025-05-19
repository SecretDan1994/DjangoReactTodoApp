import { useState, useEffect, useContext } from 'react';
import api from '../../services/api';
import './TodoList.scss';
import {useNavigate} from "react-router-dom";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
      if (localStorage.getItem('email')){
          const fetchTodos = async () => {
              const response = await api.get('/todo/todo-list/');
              setTodos(response.data.data);
          };
          fetchTodos();
      } else {
          navigate('/login');
      }
  }, []);

  return (
    <div className="todo-list">
      <h2>Your Todos</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;