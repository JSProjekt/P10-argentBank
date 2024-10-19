import React from 'react';
import ReactDOM from 'react-dom/client';
import RouterApp from './assets/Router/Router';
import { Provider } from 'react-redux';
import store from './redux/reduxStore';
import "../src/index.scss"

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <Provider store={store} >

    <RouterApp />
  </Provider>
);

