import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isRegister ? '/register' : '/login';
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    try {
      const res = await fetch(API_URL + endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        window.location = '/';
      } else {
        alert(data.error || 'Authentication failed');
      }
    } catch (err) {
      console.error(err);
      alert('Network error');
    }
  };

  return (
    <div className="container mt-5">
      <h3>{isRegister ? 'Register' : 'Login'}</h3>
      <form onSubmit={handleSubmit} className="col-md-4">
        <div className="mb-2">
          <input className="form-control" placeholder="username" value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div className="mb-2">
          <input type="password" className="form-control" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button className="btn btn-primary me-2" type="submit">{isRegister ? 'Register' : 'Login'}</button>
        <button type="button" className="btn btn-secondary" onClick={() => setIsRegister(!isRegister)}>{isRegister ? 'Have an account? Login' : 'Create account'}</button>
      </form>
    </div>
  );
};

export default Login;
