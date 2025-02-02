import React from 'react';
import ReactDOM from 'react-dom';
import './app/styles/index.css';
import { QueryClientProvider } from 'react-query';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import queryClient from './app/configs/react-query/queryClient';

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
