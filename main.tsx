import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/globals.css'

// Disable StrictMode in dev to prevent double toast (React 18 behavior)
ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
)
