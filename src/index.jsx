import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from './ErrorBoundary';
import Counter from './Component/Counter';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
        <Counter />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
