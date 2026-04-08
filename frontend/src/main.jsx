import React from 'react'
import ReactDom from 'react-dom/client'
import AppRoutes from './app/routes'
ReactDom.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>,
)
