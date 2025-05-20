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
              let respData = response.data.data;
              respData = respData.map((data) => (
                  {...data, expanded:false}
              ));
              setTodos(respData);
          };
          fetchTodos();
      } else {
          navigate('/login');
      }
  }, []);

  const toggleExpand = (id) => {
    setTodos(todos =>
      todos.map(todo =>
        todo.id === id ? { ...todo, expanded: !todo.expanded} : todo
      )
    );
  };

  return (
    <div className="todo-list">
      <h2>Your Todos</h2>
      {todos.length === 0 ? (
        <p>No todos available.</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className="todo-item">
              <div
                className="todo-title interactive"
                onClick={() => toggleExpand(todo.id)}
              >
                {todo.title}
              </div>
              <div
                className={`todo-description-wrapper${todo.expanded ? ' expanded' : ''}`}
              >
                <div className="todo-description">
                  {todo.description || 'No description'}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;