import React from 'react';
import './Navbar.css'; // Import your CSS file

function Navbar() {
  return (
    <div className="navbar">
      <a href="/" className="nav-link home">Home</a>
      <a href="/add" className="nav-link">Add</a>
      <a href="/update" className="nav-link">Update</a>
      <a href="/delete" className="nav-link">Delete</a>
    </div>
  );
}

export default Navbar;
