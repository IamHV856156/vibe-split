import React from 'react';
import ReactDom from 'react-dom/client';
import AppRoutes from './app/routes';
import Providers from './app/providers';
import "./style/index.css";

ReactDom.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Providers>
    <AppRoutes />
    </Providers>
  </React.StrictMode>,
);
