import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import './Auth.css'; 

const Auth = ({ onAuth }) => {
  const [token, setToken] = useState('');

  const handleLogin = () => {
    try {
      const decoded = jwtDecode(token);
      onAuth(decoded);
      setToken('');
    } catch (error) {
      alert('Invalid token');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Enter JWT token"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Auth;
