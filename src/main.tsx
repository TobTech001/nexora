// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// CSS is handled by the bundler and has no TypeScript module declarations.
// @ts-expect-error -- intentional side-effect import of a stylesheet
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);