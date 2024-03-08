/** @format */

import React from 'react';
import './App.css'; // Import your CSS file
import ParentComponent from './Parent'; // Import your ParentComponent

function App() {
  return (
    <div className="container">
      {' '}
      {/* Apply the container class */}
      <h1>The Noise Machine</h1>
      <ParentComponent /> {/* Render your ParentComponent */}
    </div>
  );
}

export default App;
