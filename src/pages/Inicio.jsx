import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

function useCountUp(target, duration = 1800, shouldStart = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!shouldStart) return
    let start = null
    const step = (ts) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      setCount(Math.floor(p * target))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [shouldStart, target, duration])
  return count
}

const servicios = [
  { id: 1, icono: 'bi-clipboard2-pulse-fill', titulo: 'Consulta General', desc: 'Diagnóstico profesional y seguimiento personalizado para la salud de tu mascota.' },
  { id: 2, icono: 'bi-capsule-pill',           titulo: 'Vacunación',       desc: 'Planes de vacunación completos y actualizados para perros, gatos y más.' },
  { id: 3, icono: 'bi-scissors',               titulo: 'Peluquería',       desc: 'Servicio de estética y grooming profesional para que tu mascota luzca increíble.' },
  { id: 4, icono: 'bi-bag-heart-fill',          titulo: 'Tienda',           desc: 'Alimentos premium, accesorios y medicamentos seleccionados por nuestros veterinarios.' },
]

function Inicio() {
  const statsRef = useRef(null)
  const [statsVisible, setStatsVisible] = useState(false)

  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true) }, { threshold: 0.4 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const c1 = useCountUp(5000, 1800, statsVisible)
  const c2 = useCountUp(10,   1200, statsVisible)
  const c3 = useCountUp(6,    1000, statsVisible)
  const c4 = useCountUp(99,   1600, statsVisible)

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero-premium position-relative overflow-hidden" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center' }}>
        <div className="bg-grid-effect"></div>
        <div className="hero-glow-spot d-none d-lg-block"></div>

        <div className="container py-5 position-relative" style={{ zIndex: 2 }}>
          <div className="row align-items-center gy-5">

            <div className="col-lg-6 animate-slide-up">
              <span className="badge-premium mb-4 d-inline-flex">
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--primary-green)', display: 'inline-block' }}></span>
                Abiertos 7 días · Urgencias 24/7
              </span>

              <h1 className="fw-bold mb-4" style={{ fontSize: 'clamp(2.2rem,5vw,3.8rem)', lineHeight: 1.1, color: 'var(--text-dark)' }}>
                El mejor cuidado<br />para tu mascota<br />
                <span className="text-gradient-premium">con tecnología 🐾</span>
              </h1>

              <p style={{ color: 'var(--text-body)', fontSize: '1.1rem', lineHeight: 1.85, maxWidth: 500 }} className="mb-4">
                En PetCura combinamos experiencia médica veterinaria y amor genuino por los animales.
                Más de 5.000 familias ya confían en nosotros.
              </p>

              <div className="d-flex gap-3 flex-wrap">
                <Link to="/contacto" className="btn btn-glow-primary rounded-pill px-5 py-3 fs-6 fw-bold">
                  Agendar Consulta <i className="bi bi-arrow-right ms-2"></i>
                </Link>
                <Link to="/adopcion" className="btn btn-glow-outline rounded-pill px-5 py-3 fs-6">
                  Ver Adopciones
                </Link>
              </div>
            </div>

            <div className="col-lg-6 d-none d-lg-block animate-fade-in">
              <div className="hero-image-premium-wrapper ps-3">
                <img
                  src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=700&q=80"
                  alt="Mascota PetCura"
                  className="hero-image-premium w-100"
                  style={{ objectFit: 'cover', height: 470 }}
                />
                <div className="hero-floating-card" style={{ minWidth: 210 }}>
                  <div className="d-flex align-items-center gap-3">
                    <div style={{ width: 46, height: 46, borderRadius: 12, background: 'var(--primary-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <i className="bi bi-shield-check-fill fs-5 text-white"></i>
                    </div>
                    <div>
                      <div className="fw-bold" style={{ color: 'var(--text-dark)', fontSize: '0.95rem' }}>+5.000 mascotas</div>
                      <div style={{ color: 'var(--primary-green)', fontSize: '0.8rem', fontWeight: 600 }}>atendidas este año</div>
                    </div>
                  </div>
                  <div className="d-flex gap-1 mt-3 align-items-center">
                    {[1,2,3,4,5].map(i => <i key={i} className="bi bi-star-fill" style={{ color: '#f59e0b', fontSize: '0.85rem' }}></i>)}
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginLeft: 6 }}>5.0 · 412 reseñas</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── ESTADÍSTICAS ── */}
      <section ref={statsRef} style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '2.8rem 0' }}>
        <div className="container">
          <div className="row text-center g-3">
            {[
              { val: `+${c1.toLocaleString()}`, lbl: 'Pacientes atendidos' },
              { val: `${c2} años`,               lbl: 'De experiencia' },
              { val: `${c3} expertos`,            lbl: 'En el equipo' },
              { val: `${c4}%`,                    lbl: 'Clientes satisfechos' },
            ].map((s, i) => (
              <div key={i} className="col-6 col-md-3">
                <div className="fw-bold" style={{ fontSize: 'clamp(1.5rem,3vw,2.2rem)', color: 'var(--primary-green)' }}>{s.val}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NUESTRAS MASCOTAS ── */}
      <section style={{ padding: '5.5rem 0', background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="row align-items-center gy-5">
            <div className="col-lg-5">
              <div className="position-relative">
                <img
                  src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=700&q=80"
                  alt="Mascotas PetCura"
                  className="w-100 rounded-4"
                  style={{ height: 390, objectFit: 'cover', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border-color)' }}
                />
                <div className="position-absolute top-0 end-0 m-3 rounded-3 px-3 py-2"
                  style={{ background: '#fff', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                  <span style={{ color: 'var(--primary-green)', fontWeight: 700, fontSize: '0.88rem' }}>🐾 Adopción Abierta</span>
                </div>
              </div>
            </div>
            <div className="col-lg-7 ps-lg-5">
              <span className="badge-premium mb-3 d-inline-flex">
                <i className="bi bi-grid-fill"></i> Catálogo de Razas
              </span>
              <h2 className="fw-bold mb-3" style={{ color: 'var(--text-dark)', fontSize: 'clamp(1.8rem,3vw,2.4rem)', lineHeight: 1.2 }}>
                Nuestras Mascotas<br /><span className="text-gradient-premium">esperan un hogar 🐾</span>
              </h2>
              <p style={{ color: 'var(--text-body)', lineHeight: 1.9, marginBottom: '2rem' }}>
                Explora nuestro catálogo de adopciones con razas de todas las personalidades.
                Cada una está esperando a su familia ideal. Agenda una visita y enamórate.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Link to="/adopcion" className="btn btn-glow-primary rounded-pill px-5 py-3 fw-bold">
                  Ver Adopciones <i className="bi bi-arrow-right ms-2"></i>
                </Link>
                <Link to="/nosotros" className="btn btn-glow-outline rounded-pill px-4 py-3">
                  Conocer el equipo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICIOS ── */}
      <section style={{ padding: '5.5rem 0', background: 'var(--bg-card)' }}>
        <div className="container">
          <div className="text-center mb-5">
            <span className="badge-premium mb-3 d-inline-flex">✦ Servicios Premium</span>
            <h2 className="fw-bold" style={{ color: 'var(--text-dark)', fontSize: 'clamp(1.8rem,3vw,2.4rem)' }}>
              Todo para <span className="text-gradient-premium">tu mascota</span>
            </h2>
            <p style={{ color: 'var(--text-muted)' }}>Un ecosistema completo de salud animal bajo un mismo techo.</p>
          </div>
          <div className="row g-4">
            {servicios.map((s) => (
              <div key={s.id} className="col-sm-6 col-lg-3">
                <div className="card-service-premium h-100 p-4">
                  <div className="service-icon-box mb-4">
                    <i className={`bi ${s.icono} fs-3`} style={{ color: 'var(--primary-green)', transition: 'color 0.3s ease' }}></i>
                  </div>
                  <h5 className="fw-bold mb-2" style={{ color: 'var(--text-dark)' }}>{s.titulo}</h5>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.7 }} className="mb-0">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '5rem 0', background: 'var(--primary-green)' }}>
        <div className="container text-center">
          <h2 className="fw-bold mb-3 text-white" style={{ fontSize: 'clamp(1.8rem,3vw,2.4rem)' }}>
            ¿Tu mascota necesita atención hoy?
          </h2>
          <p className="text-white mb-4" style={{ opacity: 0.85, fontSize: '1.1rem' }}>
            Agenda una consulta en minutos y recibe el mejor cuidado veterinario.
          </p>
          <Link to="/contacto" className="btn btn-lg rounded-pill px-5 py-3 fw-bold"
            style={{ background: '#fff', color: 'var(--primary-green)' }}>
            Contáctanos ahora <i className="bi bi-arrow-right ms-2"></i>
          </Link>
        </div>
      </section>
    </>
  )
}

export default Inicio
