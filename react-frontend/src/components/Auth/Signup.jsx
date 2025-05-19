import { useState } from 'react';
import axios from 'axios';
import api from '../../services/api'
import { useNavigate } from 'react-router-dom';
import './Signup.scss';

const Signup = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/userauth/signup/', formData);
    navigate('/login');
  };

  return (
    <form className="auth-container" onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <input
        type="text"
        placeholder="Username"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;