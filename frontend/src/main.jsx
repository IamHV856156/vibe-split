import React from 'react'
import ReactDom from 'react-dom/client'
import AppRoutes from './app/routes'
import { supabase } from './services/supabaseClient'
import { AuthProvider } from './context/authContext';

supabase.auth.getSession().then(({data})=>{
  console.log("Session:",data.session);
});
ReactDom.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <AppRoutes />
    </AuthProvider>
  </React.StrictMode>,
)
