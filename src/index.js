import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './assets/Router/Router';
import "../src/assets/scss/Footer.scss"
import "../src/assets/scss/Header.scss"
import "../src/index.scss"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <Router />
  </React.StrictMode>
);

