import React from 'react';
import ReactDom from 'react-dom/client';
import AppRoutes from './app/routes';
import { AuthProvider } from './context/authContext';

ReactDom.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <AppRoutes />
    </AuthProvider>
  </React.StrictMode>,
);
