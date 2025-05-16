import { useState } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import './AddTodo.scss';

const AddTodo = () => {
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/todos/', { title });
    navigate('/');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <h2>Add Todo</h2>
      <input
        type="text"
        placeholder="Enter todo title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodo;