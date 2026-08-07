import React from 'react';
import ReactDOM from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';
import Root from './router';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
    <Analytics />
  </React.StrictMode>
);
