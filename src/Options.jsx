import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Options = () => {
  const navigate = useNavigate(); // Allows for navigation programmatically

  return (
    <div style={{ padding: '20px', textAlign: 'center', height: '100vh', backgroundColor: '#fff' }}>
      <button
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'none',
          border: 'none',
          fontSize: '1.5rem',
          cursor: 'pointer'
        }}
        onClick={() => navigate('/')}
      >
        X
      </button>

      <h1>Options</h1>

      <Link to="/" style={styles.link}>
        <button style={styles.button}>Home</button>
      </Link>
      <Link to="/events" style={styles.link}>
        <button style={styles.button}>Events</button>
      </Link>
      <button style={styles.button}>About Us</button>
      <button style={styles.button}>Officers</button>
    </div>
  );
};

// Styles for buttons
const styles = {
  button: {
    display: 'block',
    margin: '10px auto',
    padding: '10px 20px',
    fontSize: '1.2rem',
    backgroundColor: '#4f661a',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  link: {
    textDecoration: 'none',
  }
};

export default Options;
