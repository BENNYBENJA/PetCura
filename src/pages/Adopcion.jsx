import { useState, useEffect } from 'react'

const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

const RAZAS_FALLBACK = [
  { id: 1,  name: 'Labrador Retriever', temperament: 'Activo, Amigable, Leal',           life_span: '10 – 12 años', weight: { metric: '25 – 36' }, breed_group: 'Sporting',     image: { url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&auto=format&fit=crop&q=80' } },
  { id: 2,  name: 'Golden Retriever',   temperament: 'Confiable, Amigable, Gentil',       life_span: '10 – 12 años', weight: { metric: '25 – 34' }, breed_group: 'Sporting',     image: { url: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=600&auto=format&fit=crop&q=80' } },
  { id: 3,  name: 'Bulldog',            temperament: 'Amigable, Valiente, Leal',          life_span: '8 – 10 años',  weight: { metric: '22 – 25' }, breed_group: 'Non-Sporting', image: { url: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=600&auto=format&fit=crop&q=80' } },
  { id: 13, name: 'Mario',              temperament: 'Juguetón, Cariñoso, Leal',          life_span: '10 – 15 años', weight: { metric: '20 – 30' }, breed_group: 'Especial',     image: { url: '/mario.jpg' } },
  { id: 4,  name: 'Beagle',             temperament: 'Amigable, Curioso, Alegre',         life_span: '12 – 15 años', weight: { metric: '9 – 11' },  breed_group: 'Hound',        image: { url: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=600&auto=format&fit=crop&q=80' } },
  { id: 5,  name: 'Poodle',             temperament: 'Inteligente, Activo, Alerta',       life_span: '12 – 15 años', weight: { metric: '18 – 32' }, breed_group: 'Non-Sporting', image: { url: 'https://images.unsplash.com/photo-1598191950976-59910d6824e8?w=600&auto=format&fit=crop&q=80' } },
  { id: 6,  name: 'Rottweiler',         temperament: 'Leal, Valiente, Seguro',            life_span: '8 – 10 años',  weight: { metric: '35 – 60' }, breed_group: 'Working',      image: { url: 'https://images.unsplash.com/photo-1567752881298-894bb81f9379?w=600&auto=format&fit=crop&q=80' } },
  { id: 7,  name: 'Yorkshire Terrier',  temperament: 'Audaz, Curioso, Tenaz',             life_span: '13 – 16 años', weight: { metric: '1 – 3' },   breed_group: 'Toy',          image: { url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop&q=80' } },
  { id: 8,  name: 'Boxer',              temperament: 'Leal, Cariñoso, Inteligente',       life_span: '10 – 12 años', weight: { metric: '25 – 32' }, breed_group: 'Working',      image: { url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&auto=format&fit=crop&q=80' } },
  { id: 9,  name: 'Dachshund',          temperament: 'Valiente, Devoto, Juguetón',        life_span: '12 – 16 años', weight: { metric: '7 – 15' },  breed_group: 'Hound',        image: { url: 'https://images.unsplash.com/photo-1612536057832-2ff7ead58194?w=600&auto=format&fit=crop&q=80' } },
  { id: 10, name: 'Siberian Husky',     temperament: 'Inteligente, Gentil, Vivaz',        life_span: '12 – 14 años', weight: { metric: '16 – 27' }, breed_group: 'Working',      image: { url: 'https://images.unsplash.com/photo-1531804055935-76f44d7c3621?w=600&auto=format&fit=crop&q=80' } },
  { id: 11, name: 'Shih Tzu',           temperament: 'Cariñoso, Amigable, Vivaz',         life_span: '10 – 18 años', weight: { metric: '4 – 7' },   breed_group: 'Toy',          image: { url: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?w=600&auto=format&fit=crop&q=80' } },
  { id: 12, name: 'Border Collie',      temperament: 'Enérgico, Ágil, Tenaz',             life_span: '12 – 15 años', weight: { metric: '14 – 20' }, breed_group: 'Herding',      image: { url: 'https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?w=600&auto=format&fit=crop&q=80' } },
]

const TICKER_ITEMS = [
  'Labrador', 'Golden Retriever', 'Bulldog', 'Mario ⭐', 'Beagle', 'Poodle',
  'Rottweiler', 'Yorkshire', 'Boxer', 'Dachshund', 'Husky', 'Shih Tzu', 'Border Collie',
]

// Índices que ocupan 2 columnas en el bento grid
const isFeatured = (idx) => idx === 0 || idx === 3 || idx === 8

function Adopcion() {
  const [razas, setRazas]     = useState([])
  const [loading, setLoading] = useState(true)
  const [filtro, setFiltro]   = useState('Todos')

  const [selectedMascota, setSelectedMascota] = useState(null)
  const [form, setForm]                       = useState({ nombre: '', email: '', telefono: '', motivo: '' })
  const [enviado, setEnviado]                 = useState(false)
  const [validado, setValidado]               = useState(false)
  const [submitting, setSubmitting]           = useState(false)
  const [serverError, setServerError]         = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    const fetchRazas = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/mascotas`, { signal: controller.signal })
        if (!res.ok) throw new Error(`${res.status}`)
        const data = await res.json()
        setRazas(data.length > 0 ? data : RAZAS_FALLBACK)
      } catch (err) {
        if (err.name !== 'AbortError') setRazas(RAZAS_FALLBACK)
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }
    fetchRazas()
    return () => controller.abort()
  }, [])

  const grupos = ['Todos', ...new Set(razas.map(r => r.breed_group).filter(Boolean))]
  const razasFiltradas = filtro === 'Todos' ? razas : razas.filter(r => r.breed_group === filtro)

  const handleOpenAdopcion = (ma) => {
    setSelectedMascota(ma)
    setForm({ nombre: '', email: '', telefono: '', motivo: '' })
    setEnviado(false)
    setValidado(false)
    setServerError(null)
  }
  const handleCloseAdopcion = () => setSelectedMascota(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setValidado(true)
    if (!e.target.checkValidity()) return
    setSubmitting(true)
    setServerError(null)
    try {
      const res = await fetch(`${BACKEND_URL}/adopciones`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: form.nombre, email: form.email,
          telefono: form.telefono, motivo: form.motivo,
          mascotaNombre: selectedMascota.name, mascotaId: selectedMascota.id,
        }),
      })
      if (!res.ok) throw new Error('Error del servidor')
      setEnviado(true); setValidado(false)
    } catch {
      setEnviado(true); setValidado(false)
    } finally {
      setSubmitting(false)
    }
  }

  /* ── LOADING ── */
  if (loading) {
    return (
      <div className="adopt-page-wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', animation: 'pulse-glow 1.5s ease-in-out infinite' }}>🐾</div>
          <p style={{ color: 'rgba(200,215,230,0.45)', marginTop: '1rem', fontSize: '0.88rem', letterSpacing: '0.5px' }}>
            Buscando compañeros disponibles…
          </p>
        </div>
      </div>
    )
  }

  /* ── RENDER ── */
  return (
    <div className="adopt-page-wrap">

      {/* ════════ HERO ════════ */}
      <section className="adopt-hero">
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="adopt-hero__eyebrow">
            <span className="adopt-hero__dot" />
            Programa de Adopción Activo
          </div>
          <h1 className="adopt-hero__title">
            Tu próximo mejor<br />
            <span className="adopt-hero__accent">amigo te espera</span>
          </h1>
          <p className="adopt-hero__subtitle">
            Cada perrito merece un hogar lleno de amor. Explora nuestra colección
            y da el primer paso hacia una vida increíble juntos.
          </p>
          <div className="adopt-hero__stats">
            <div className="adopt-stat">
              <span className="adopt-stat__num">{razas.length}</span>
              <span className="adopt-stat__label">Disponibles</span>
            </div>
            <div className="adopt-stat__divider" />
            <div className="adopt-stat">
              <span className="adopt-stat__num">100%</span>
              <span className="adopt-stat__label">Amor garantizado</span>
            </div>
            <div className="adopt-stat__divider" />
            <div className="adopt-stat">
              <span className="adopt-stat__num">0</span>
              <span className="adopt-stat__label">Arrepentimientos</span>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ TICKER ════════ */}
      <div className="adopt-ticker" aria-hidden="true">
        <div className="adopt-ticker__track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="adopt-ticker__item">
              <span className="adopt-ticker__star">✦</span>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ════════ FILTER BAR ════════ */}
      <div className="adopt-filters-bar">
        <div className="container adopt-filters-inner">
          {grupos.map(g => (
            <button
              key={g}
              className={`adopt-filter-btn ${filtro === g ? 'active' : ''}`}
              onClick={() => setFiltro(g)}
            >
              {g}
            </button>
          ))}
          <span className="adopt-count-label">{razasFiltradas.length} resultado{razasFiltradas.length !== 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* ════════ BENTO GALLERY ════════ */}
      <section className="adopt-gallery">
        <div className="container">
          <div className="adopt-grid">
            {razasFiltradas.map((raza, idx) => (
              <div
                key={raza.id}
                className={`adopt-card${isFeatured(idx) ? ' adopt-card--wide' : ''}${raza.id === 13 ? ' adopt-card--special' : ''}`}
                onClick={() => handleOpenAdopcion(raza)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && handleOpenAdopcion(raza)}
                aria-label={`Adoptar a ${raza.name}`}
              >
                {/* Ref label */}
                <span className="adopt-card__ref">EXH #{String(raza.id).padStart(2, '0')}</span>

                {/* Badge */}
                <span className={`adopt-card__badge${raza.id === 13 ? ' adopt-card__badge--gold' : ''}`}>
                  <span className="adopt-card__badge-dot" />
                  {raza.id === 13 ? 'Especial ⭐' : 'Disponible'}
                </span>

                {/* Image */}
                <img
                  src={raza.image?.url ?? 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop&q=80'}
                  alt={raza.name}
                  className="adopt-card__img"
                  loading="lazy"
                  onError={e => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop&q=80' }}
                />

                {/* Info overlay */}
                <div className="adopt-card__info">
                  {raza.breed_group && <div className="adopt-card__group">{raza.breed_group}</div>}
                  <div className="adopt-card__name">{raza.name}</div>
                  <div className="adopt-card__temperament">
                    {raza.temperament?.split(', ').slice(0, 3).join(' · ')}
                  </div>
                  <button className="adopt-card__cta" tabIndex={-1} aria-hidden="true">
                    <i className="bi bi-heart-fill" style={{ fontSize: '0.75rem' }} />
                    Quiero adoptarlo
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ MODAL ════════ */}
      {selectedMascota && (
        <div
          className="adopt-modal-overlay animate-fade-in"
          onClick={e => { if (e.target === e.currentTarget) handleCloseAdopcion() }}
          role="dialog"
          aria-modal="true"
        >
          <div className="adopt-modal animate-slide-up">

            {/* Modal header */}
            <div className="adopt-modal__header">
              <span className="adopt-modal__title">🐾 Solicitud de Adopción</span>
              <button className="adopt-modal__close" onClick={handleCloseAdopcion} aria-label="Cerrar">✕</button>
            </div>

            {/* Modal body */}
            {enviado ? (
              <div className="adopt-success">
                <div className="adopt-success__icon">✅</div>
                <h3 className="adopt-success__title">¡Solicitud Registrada!</h3>
                <p className="adopt-success__text">
                  Gracias por tu interés en adoptar a{' '}
                  <strong style={{ color: '#00e87a' }}>{selectedMascota.name}</strong>.
                  Recibirás noticias en las próximas 24 horas.
                </p>
                <button className="adopt-submit-btn" style={{ maxWidth: 200, margin: '0 auto' }} onClick={handleCloseAdopcion}>
                  Entendido
                </button>
              </div>
            ) : (
              <div className="adopt-modal__body">

                {/* Pet image column */}
                <div className="adopt-modal__img-col">
                  <img
                    src={selectedMascota.image?.url ?? 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop&q=80'}
                    alt={selectedMascota.name}
                    onError={e => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop&q=80' }}
                  />
                  <div className="adopt-modal__img-overlay" />
                  <div className="adopt-modal__img-info">
                    {selectedMascota.breed_group && (
                      <div className="adopt-modal__pet-group">{selectedMascota.breed_group}</div>
                    )}
                    <div className="adopt-modal__pet-name">{selectedMascota.name}</div>
                    <div className="adopt-modal__pet-meta">
                      {selectedMascota.life_span && <span>⏱ {selectedMascota.life_span}</span>}
                      {selectedMascota.weight?.metric && <span>⚖ {selectedMascota.weight.metric} kg</span>}
                    </div>
                  </div>
                </div>

                {/* Form column */}
                <div className="adopt-modal__form-col">
                  <h5 className="adopt-form-heading">Tus datos de contacto</h5>

                  {serverError && (
                    <div className="adopt-server-error">{serverError}</div>
                  )}

                  <form noValidate className={validado ? 'was-validated' : ''} onSubmit={handleSubmit}>

                    <div className="adopt-field">
                      <label htmlFor="nombreAdoptante" className="adopt-form-label">
                        Nombre Completo <span className="adopt-required">*</span>
                      </label>
                      <input type="text" id="nombreAdoptante" name="nombre"
                        className="adopt-form-input form-control"
                        placeholder="Ej. Juan Pérez"
                        value={form.nombre} onChange={handleChange}
                        required disabled={submitting}
                      />
                      <div className="invalid-feedback adopt-invalid">Ingresa tu nombre completo.</div>
                    </div>

                    <div className="adopt-field">
                      <label htmlFor="emailAdoptante" className="adopt-form-label">
                        Correo de Contacto <span className="adopt-required">*</span>
                      </label>
                      <input type="email" id="emailAdoptante" name="email"
                        className="adopt-form-input form-control"
                        placeholder="ejemplo@correo.com"
                        value={form.email} onChange={handleChange}
                        required disabled={submitting}
                      />
                      <div className="invalid-feedback adopt-invalid">Ingresa un correo válido.</div>
                    </div>

                    <div className="adopt-field">
                      <label htmlFor="telefonoAdoptante" className="adopt-form-label">
                        Teléfono <span className="adopt-required">*</span>
                      </label>
                      <input type="tel" id="telefonoAdoptante" name="telefono"
                        className="adopt-form-input form-control"
                        placeholder="+56 9 8765 4321"
                        value={form.telefono} onChange={handleChange}
                        required disabled={submitting}
                      />
                      <div className="invalid-feedback adopt-invalid">Ingresa tu número de teléfono.</div>
                    </div>

                    <div className="adopt-field">
                      <label htmlFor="motivoAdoptante" className="adopt-form-label">
                        ¿Por qué deseas adoptar a {selectedMascota.name}? <span className="adopt-required">*</span>
                      </label>
                      <textarea id="motivoAdoptante" name="motivo"
                        className="adopt-form-input form-control"
                        rows="3" style={{ resize: 'none' }}
                        placeholder="Cuéntanos sobre tu hogar y tiempo disponible…"
                        value={form.motivo} onChange={handleChange}
                        required disabled={submitting}
                      />
                      <div className="invalid-feedback adopt-invalid">Por favor compártenos tus motivos.</div>
                    </div>

                    <div className="adopt-form-actions">
                      <button type="button" className="adopt-cancel-btn"
                        onClick={handleCloseAdopcion} disabled={submitting}>
                        Cancelar
                      </button>
                      <button type="submit" className="adopt-submit-btn" disabled={submitting}>
                        {submitting
                          ? <><span className="spinner-border spinner-border-sm me-2" role="status" />Enviando…</>
                          : '🐾 Enviar Solicitud'
                        }
                      </button>
                    </div>

                  </form>
                </div>

              </div>
            )}
          </div>
        </div>
      )}

    </div>
  )
}

export default Adopcion
