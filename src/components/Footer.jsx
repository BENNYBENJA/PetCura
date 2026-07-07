import { Link } from 'react-router-dom'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="custom-footer-premium mt-auto">
      <div className="container">
        <div className="row gy-5">

          {/* Columna 1: Marca */}
          <div className="col-lg-4">
            <div className="d-flex align-items-center gap-2 mb-3">
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: 'linear-gradient(135deg,#2ecc71,#00ff88)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.1rem'
              }}>🐾</div>
              <span className="navbar-brand-premium fs-4">Pet<span>Cura</span></span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.8, maxWidth: 300 }}>
              Clínica y tienda veterinaria moderna. Cuidamos a tu mascota con
              amor, experiencia y tecnología médica de vanguardia.
            </p>
            <div className="d-flex gap-2 mt-3">
              {[
                { icon: 'bi-facebook',  href: '#', label: 'Facebook' },
                { icon: 'bi-instagram', href: '#', label: 'Instagram' },
                { icon: 'bi-whatsapp',  href: '#', label: 'WhatsApp' },
                { icon: 'bi-twitter-x', href: '#', label: 'Twitter X' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="footer-social-btn"
                  aria-label={s.label}
                  title={s.label}
                >
                  <i className={`bi ${s.icon}`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Columna 2: Navegación rápida */}
          <div className="col-6 col-lg-2">
            <h6 style={{ color: 'var(--text-light)', fontWeight: 700, fontSize: '0.85rem', letterSpacing: 1, textTransform: 'uppercase', marginBottom: '1.2rem' }}>
              Navegación
            </h6>
            <ul className="list-unstyled" style={{ fontSize: '0.9rem' }}>
              {[
                { to: '/',         label: 'Inicio' },
                { to: '/nosotros', label: 'Nosotros' },
                { to: '/adopcion', label: 'Adopción' },
                { to: '/contacto', label: 'Contacto' },
              ].map((item) => (
                <li key={item.to} className="mb-2">
                  <Link
                    to={item.to}
                    style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.25s' }}
                    onMouseEnter={e => e.target.style.color = 'var(--primary-accent)'}
                    onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Contacto rápido */}
          <div className="col-6 col-lg-3">
            <h6 style={{ color: 'var(--text-light)', fontWeight: 700, fontSize: '0.85rem', letterSpacing: 1, textTransform: 'uppercase', marginBottom: '1.2rem' }}>
              Contacto
            </h6>
            <ul className="list-unstyled" style={{ fontSize: '0.9rem' }}>
              {[
                { icon: 'bi-geo-alt-fill',   text: 'Av. Las Condes 9180, Santiago' },
                { icon: 'bi-telephone-fill', text: '+56 2 2345 6789' },
                { icon: 'bi-whatsapp',       text: '+56 9 8765 4321' },
                { icon: 'bi-envelope-fill',  text: 'contacto@petcura.cl' },
              ].map((item, i) => (
                <li key={i} className="d-flex gap-2 align-items-start mb-2">
                  <i className={`bi ${item.icon} mt-1 flex-shrink-0`} style={{ color: 'var(--primary-accent)', fontSize: '0.9rem' }}></i>
                  <span style={{ color: 'var(--text-muted)' }}>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 4: Horario */}
          <div className="col-lg-3">
            <h6 style={{ color: 'var(--text-light)', fontWeight: 700, fontSize: '0.85rem', letterSpacing: 1, textTransform: 'uppercase', marginBottom: '1.2rem' }}>
              Horario
            </h6>
            <ul className="list-unstyled" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <li className="mb-2"><span style={{ color: 'var(--primary-accent)' }}>Lun – Vie</span> · 09:00 – 20:00</li>
              <li className="mb-3"><span style={{ color: 'var(--primary-accent)' }}>Sáb – Dom</span> · 10:00 – 15:00</li>
            </ul>
            <Link to="/contacto" className="btn btn-glow-outline rounded-pill px-4 py-2 w-100 text-center" style={{ fontSize: '0.9rem' }}>
              Agendar Cita
            </Link>
          </div>

        </div>

        {/* Footer bottom */}
        <div style={{ borderTop: '1px solid var(--glass-border)', marginTop: '3rem', paddingTop: '1.5rem' }}
             className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
          <p className="mb-0" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            © {year} PetCura. Todos los derechos reservados.
          </p>
          <p className="mb-0" style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            Hecho con <span style={{ color: 'var(--primary-accent)' }}>♥</span> para las mascotas de Santiago
          </p>
        </div>

      </div>
    </footer>
  )
}

export default Footer
