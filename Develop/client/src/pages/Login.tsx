import React, { useState } from 'react';
import AuthService from '../utils/auth'; // Adjust path as necessary

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission
  
    try {
      const idToken = 'your-id-token'; // Replace with actual token retrieval logic
      await AuthService.login(idToken);
      // Redirect to the Kanban board or perform any other necessary action
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      {error && <div>{error}</div>}
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
