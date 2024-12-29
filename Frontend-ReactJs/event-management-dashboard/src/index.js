import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18+ import

import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // Create root for React 18+
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);