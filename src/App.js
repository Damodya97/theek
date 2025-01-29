// React Frontend (Client)
import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [number, setNumber] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, birthday, number }),
      });

      const data = await res.json();
      if (res.ok) {
        setResponse(data);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="app-container">
      <h1 className="title">User Info Form</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required
        />
        <button type="submit" className="submit-button">Submit</button>
      </form>

      {response && (
        <div className="response">
          <p>Username: <strong>{response.username}</strong></p>
          <p>Your age is: <strong>{response.age}</strong></p>
        </div>
      )}
    </div>
  );
};

export default App;