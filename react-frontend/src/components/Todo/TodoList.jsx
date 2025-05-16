import { useState, useEffect, useContext } from 'react';
import api from '../../services/api';
import './TodoList.scss';

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await api.get('/api/todo/todo-list');
      setTodos(response.data);
    };
    fetchTodos();
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