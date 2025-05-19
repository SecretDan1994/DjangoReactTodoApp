import { useState } from 'react';
import api from '../../services/api'
import { useNavigate } from 'react-router-dom';
import './Signup.scss';

const Signup = () => {
  const [formData, setFormData] = useState({ first_name: '', last_name: '', email: '', password: '' });
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
        placeholder="First Name"
        value={formData.first_name}
        required={true}
        onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={formData.last_name}
        required={true}
        onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Email"
        value={formData.email}
        required={true}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        required={true}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;