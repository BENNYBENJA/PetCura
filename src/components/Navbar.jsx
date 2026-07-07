import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`custom-navbar navbar navbar-expand-lg sticky-top ${scrolled ? 'shadow-lg' : ''}`}>
      <div className="container">

        {/* Brand */}
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg,#2ecc71,#00ff88)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.2rem', flexShrink: 0
          }}>🐾</div>
          <span className="navbar-brand-premium">Pet<span>Cura</span></span>
        </Link>

        {/* Hamburger */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navPetCura"
          aria-controls="navPetCura"
          aria-expanded={menuOpen}
          aria-label="Menú"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ color: 'var(--primary-accent)' }}
        >
          <i className={`bi ${menuOpen ? 'bi-x-lg' : 'bi-list'} fs-4`}></i>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse" id="navPetCura">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center gap-1">
            {[
              { to: '/',          label: 'Inicio',       end: true },
              { to: '/nosotros',  label: 'Nosotros',     end: false },
              { to: '/adopcion',  label: '🐾 Adopción',  end: false },
              { to: '/contacto',  label: 'Contacto',     end: false },
            ].map(({ to, label, end }) => (
              <li className="nav-item" key={to}>
                <NavLink
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    `nav-link-premium nav-link${isActive ? ' active' : ''}`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
            <li className="nav-item ms-lg-2">
              <Link
                to="/contacto"
                className="btn btn-glow-primary rounded-pill px-4 py-2 ms-lg-1"
              >
                Agendar Cita
              </Link>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  )
}

export default Navbar
