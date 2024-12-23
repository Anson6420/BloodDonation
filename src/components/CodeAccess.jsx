import React, { useState } from 'react';
import DonatedList from './DonatedList';

const ACCESS_CODE = "12345"; // Replace with your desired access code

function CodeAccess() {
  const [code, setCode] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code === ACCESS_CODE) {
      setIsAuthorized(true);
    } else {
      setError('Invalid access code. Please try again.');
    }
  };

  if (isAuthorized) {
    return <DonatedList />;
  }

  return (
    <div
      className="container text-center"
      style={{ marginTop: '250px' }}
    >
      <h1 className="text-danger">Access Restricted</h1>
      <p className="text-muted">Please enter the access code to view the Donated List page.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          className="form-control my-3"
          placeholder="Enter access code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button type="submit" className="btn btn-danger">
          Submit
        </button>
      </form>
      {error && <p className="text-danger mt-3">{error}</p>}
    </div>
  );
}

export default CodeAccess;
