import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const BACKEND_URL = 'http://localhost:3001/api'

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

// Datos de respaldo si el backend no está disponible
const MASCOTAS_FALLBACK = [
  { id: 1, name: 'Labrador Retriever', temperament: 'Activo, Amigable, Leal',     breed_group: 'Sporting', image: { url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&auto=format&fit=crop&q=80' } },
  { id: 2, name: 'Golden Retriever',   temperament: 'Confiable, Amigable, Gentil', breed_group: 'Sporting', image: { url: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=600&auto=format&fit=crop&q=80' } },
  { id: 3, name: 'Bulldog',            temperament: 'Amigable, Valiente, Leal',    breed_group: 'Non-Sporting', image: { url: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=600&auto=format&fit=crop&q=80' } },
]

function Inicio() {
  const statsRef = useRef(null)
  const [statsVisible, setStatsVisible] = useState(false)

  // ── Consumo de la API REST ──────────────────────────
  const [mascotas, setMascotas]       = useState([])
  const [loadingPets, setLoadingPets] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    const fetchMascotas = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/mascotas`, { signal: controller.signal })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        // Mostramos sólo las primeras 3 mascotas en la sección de preview
        setMascotas(data.slice(0, 3))
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.warn('Backend inalcanzable — cargando mascotas de respaldo:', err.message)
          setMascotas(MASCOTAS_FALLBACK)
        }
      } finally {
        if (!controller.signal.aborted) setLoadingPets(false)
      }
    }
    fetchMascotas()
    return () => controller.abort()
  }, [])
  // ────────────────────────────────────────────────────

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

      {/* ── MASCOTAS DESDE LA API ── */}
      <section style={{ padding: '5.5rem 0', background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="text-center mb-5">
            <span className="badge-premium mb-3 d-inline-flex">
              <i className="bi bi-database-fill-check" /> Datos en vivo desde MongoDB
            </span>
            <h2 className="fw-bold" style={{ color: 'var(--text-dark)', fontSize: 'clamp(1.8rem,3vw,2.4rem)' }}>
              Mascotas en <span className="text-gradient-premium">Adopción 🐾</span>
            </h2>
            <p style={{ color: 'var(--text-muted)' }}>
              Datos cargados dinámicamente desde nuestra API REST y base de datos MongoDB Atlas.
            </p>
          </div>

          {loadingPets ? (
            /* Spinner mientras carga la API */
            <div className="text-center py-4">
              <div className="spinner-border text-success" style={{ width: '3rem', height: '3rem' }} role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
              <p className="text-muted mt-3 small">Conectando con la API REST...</p>
            </div>
          ) : (
            <div className="row g-4">
              {mascotas.map((m) => (
                <div key={m.id} className="col-md-4">
                  <div className="raza-card-premium h-100">
                    <div className="raza-img-container">
                      <img
                        src={m.image?.url ?? 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop&q=80'}
                        alt={m.name}
                        className="card-img-top object-fit-cover"
                        style={{ height: 220 }}
                        loading="lazy"
                        onError={e => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop&q=80' }}
                      />
                      <span className="position-absolute top-0 end-0 m-2 badge bg-success rounded-pill px-2 py-1">
                        <i className="bi bi-check-circle-fill me-1" />Disponible
                      </span>
                    </div>
                    <div className="p-4">
                      <h5 className="fw-bold mb-1" style={{ color: 'var(--text-dark)' }}>{m.name}</h5>
                      {m.breed_group && (
                        <span className="badge mb-2" style={{ background: 'var(--primary-light)', color: 'var(--primary-green)', fontWeight: 700 }}>
                          {m.breed_group}
                        </span>
                      )}
                      <p className="text-muted small mb-3">
                        <i className="bi bi-heart-fill text-success me-1" />
                        {m.temperament?.split(', ').slice(0, 3).join(' · ')}
                      </p>
                      <Link to="/adopcion" className="btn btn-glow-primary rounded-pill w-100 fw-semibold">
                        <i className="bi bi-calendar-heart me-1" /> Quiero Adoptarlo
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-5">
            <Link to="/adopcion" className="btn btn-glow-outline rounded-pill px-5 py-3 fw-semibold">
              Ver todas las mascotas <i className="bi bi-arrow-right ms-2" />
            </Link>
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
