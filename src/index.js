import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './assets/pages/HomePage';
import "../src/assets/scss/Footer.scss"
import "../src/assets/scss/Header.scss"
import "../src/index.scss"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <Home />
  </React.StrictMode>
);

