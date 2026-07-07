import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Inicio from './pages/Inicio'
import Nosotros from './pages/Nosotros'
import Contacto from './pages/Contacto'
import Adopcion from './pages/Adopcion'

function App() {
  return (
    <BrowserRouter>
      {/* Layout principal: columna que ocupa al menos toda la pantalla */}
      <div className="d-flex flex-column min-vh-100">

        {/* Componente global de navegación */}
        <Navbar />

        {/* Contenido de páginas — crece para empujar el footer hacia abajo */}
        <main className="flex-grow-1">
          <Routes>
            <Route path="/"          element={<Inicio />} />
            <Route path="/nosotros"  element={<Nosotros />} />
            <Route path="/contacto"  element={<Contacto />} />
            <Route path="/adopcion"  element={<Adopcion />} />
          </Routes>
        </main>

        {/* Componente global de pie de página */}
        <Footer />

      </div>
    </BrowserRouter>
  )
}

export default App
