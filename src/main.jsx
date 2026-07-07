import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Bootstrap CSS, JS (con Popper.js) e Iconos — importados a nivel global
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
