import { useState } from 'react'

const equipo = [
  { id: 1, nombre: 'Dra. Carmen Rojas',  rol: 'Médico Veterinario General',  icono: 'bi-person-badge-fill', desc: 'Especialista en medicina preventiva y diagnóstico clínico con más de 10 años de experiencia.' },
  { id: 2, nombre: 'Dr. Matías Fuentes', rol: 'Cirujano Veterinario',         icono: 'bi-scissors',          desc: 'Cirujano certificado con formación en Europa, especializado en cirugías ortopédicas.' },
  { id: 3, nombre: 'Dr. Andrés Morales', rol: 'Veterinario de Exóticos',      icono: 'bi-bug-fill',           desc: 'Experto en reptiles, aves, conejos y pequeños mamíferos con formación zoológica.' },
  { id: 4, nombre: 'Valentina Torres',   rol: 'Estilista Canina Certificada', icono: 'bi-stars',              desc: 'Groomer profesional certificada con técnicas de estética para todas las razas y pelajes.' },
  { id: 5, nombre: 'Sofía Mendoza',      rol: 'Técnico Paramédico',           icono: 'bi-heart-pulse-fill',   desc: 'Apoyo en hospitalización, cuidados postoperatorios y seguimiento de pacientes crónicos.' },
  { id: 6, nombre: 'Luis Castillo',      rol: 'Nutricionista Animal',         icono: 'bi-egg-fried',          desc: 'Planes nutricionales personalizados según raza, edad y condición de salud.' },
]

const pilares = [
  { icono: 'bi-heart-fill',        texto: 'Amor y respeto hacia cada animal' },
  { icono: 'bi-award-fill',        texto: 'Profesionales certificados en formación continua' },
  { icono: 'bi-shield-check-fill', texto: 'Diagnósticos transparentes y éticos' },
  { icono: 'bi-clock-fill',        texto: 'Atención de urgencias los 7 días' },
]

const valores = [
  { icon: 'bi-heart-pulse-fill', titulo: 'Bienestar Animal',  desc: 'El bienestar de cada mascota es nuestra prioridad número uno en cada decisión clínica.' },
  { icon: 'bi-mortarboard-fill', titulo: 'Excelencia Médica', desc: 'Invertimos en formación continua y tecnología de punta para ofrecer lo mejor.' },
  { icon: 'bi-people-fill',      titulo: 'Comunidad',         desc: 'Construimos lazos duraderos con los dueños y sus mascotas más allá de la consulta.' },
  { icon: 'bi-globe-americas',   titulo: 'Sostenibilidad',    desc: 'Operamos con responsabilidad medioambiental y promovemos la adopción responsable.' },
]

function Nosotros() {
  const [activeTab, setActiveTab] = useState('mision')

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero-premium position-relative overflow-hidden" style={{ padding: '6.5rem 0 4rem' }}>
        <div className="bg-grid-effect"></div>
        <div className="container text-center position-relative" style={{ zIndex: 2 }}>
          <span className="badge-premium mb-4 d-inline-flex">Quiénes Somos</span>
          <h1 className="fw-bold mb-3" style={{ fontSize: 'clamp(2.2rem,5vw,3.2rem)', color: 'var(--text-dark)' }}>
            Más que una clínica,<br /><span className="text-gradient-premium">somos tu familia veterinaria</span>
          </h1>
          <p style={{ color: 'var(--text-body)', maxWidth: 540, margin: '0 auto', fontSize: '1.1rem', lineHeight: 1.85 }}>
            Desde 2015 cuidamos a las mascotas de Santiago con pasión, ciencia y un compromiso inquebrantable con su bienestar.
          </p>
        </div>
      </section>

      {/* ── MISIÓN / VISIÓN ── */}
      <section style={{ padding: '5rem 0', background: 'var(--bg-card)' }}>
        <div className="container">
          <div className="row gy-5 align-items-center">
            <div className="col-lg-5">
              <img
                src="https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=700&q=80"
                alt="Equipo PetCura"
                className="w-100 rounded-4"
                style={{ height: 420, objectFit: 'cover', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-lg)' }}
              />
            </div>
            <div className="col-lg-7 ps-lg-5">
              <div className="d-flex gap-2 mb-4">
                {['mision', 'vision'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`btn-filter-premium ${activeTab === tab ? 'active' : ''}`}
                    style={{ textTransform: 'capitalize' }}
                  >
                    {tab === 'mision' ? 'Misión' : 'Visión'}
                  </button>
                ))}
              </div>

              {activeTab === 'mision' ? (
                <div className="animate-fade-in">
                  <h2 className="fw-bold mb-3" style={{ color: 'var(--text-dark)', fontSize: '2rem' }}>
                    Nuestra <span className="text-gradient-premium">Misión</span>
                  </h2>
                  <p style={{ color: 'var(--text-body)', lineHeight: 1.9, marginBottom: '1.5rem' }}>
                    En PetCura creemos que cada mascota merece atención médica de la más alta calidad,
                    brindada con amor, respeto y total compromiso con su bienestar.
                  </p>
                  <ul className="list-unstyled">
                    {pilares.map((p, i) => (
                      <li key={i} className="d-flex align-items-center gap-3 mb-3">
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--primary-light)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <i className={`bi ${p.icono}`} style={{ color: 'var(--primary-green)', fontSize: '1rem' }}></i>
                        </div>
                        <span style={{ color: 'var(--text-body)', fontSize: '0.95rem' }}>{p.texto}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="animate-fade-in">
                  <h2 className="fw-bold mb-3" style={{ color: 'var(--text-dark)', fontSize: '2rem' }}>
                    Nuestra <span className="text-gradient-premium">Visión</span>
                  </h2>
                  <p style={{ color: 'var(--text-body)', lineHeight: 1.9 }}>
                    Ser la clínica veterinaria de referencia en Chile, reconocida por la excelencia
                    médica, la innovación en tratamientos y un vínculo genuino con cada familia.
                    Queremos expandir nuestra red de cuidado a más comunidades de Santiago y más allá.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── ESTADÍSTICAS ── */}
      <section style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '3.5rem 0' }}>
        <div className="container">
          <div className="row g-3 text-center">
            {[
              { value: '+5.000', label: 'Pacientes atendidos', icon: 'bi-heart-fill' },
              { value: '10 años', label: 'De experiencia',     icon: 'bi-award-fill' },
              { value: '6 expertos', label: 'En el equipo',    icon: 'bi-people-fill' },
              { value: '99%', label: 'Clientes satisfechos',   icon: 'bi-star-fill' },
            ].map((s, i) => (
              <div key={i} className="col-6 col-md-3">
                <div className="p-4 rounded-4" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                  <i className={`bi ${s.icon} mb-2`} style={{ color: 'var(--primary-green)', fontSize: '1.5rem', display: 'block' }}></i>
                  <div className="fw-bold" style={{ fontSize: '1.8rem', color: 'var(--primary-green)' }}>{s.value}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EQUIPO ── */}
      <section style={{ padding: '5.5rem 0', background: 'var(--bg-card)' }}>
        <div className="container">
          <div className="text-center mb-5">
            <span className="badge-premium mb-3 d-inline-flex">✦ Nuestros Especialistas</span>
            <h2 className="fw-bold" style={{ color: 'var(--text-dark)', fontSize: '2.2rem' }}>
              El <span className="text-gradient-premium">Equipo</span> detrás de PetCura
            </h2>
            <p style={{ color: 'var(--text-muted)' }}>Profesionales apasionados, con formación especializada y vocación de servicio.</p>
          </div>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {equipo.map((m) => (
              <div key={m.id} className="col">
                <div className="card-service-premium h-100 p-4 text-center">
                  <div style={{ width: 68, height: 68, background: 'var(--primary-light)', border: '1px solid var(--border-color)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                    <i className={`bi ${m.icono} fs-2`} style={{ color: 'var(--primary-green)' }}></i>
                  </div>
                  <h5 className="fw-bold mb-1" style={{ color: 'var(--text-dark)' }}>{m.nombre}</h5>
                  <span className="d-inline-block rounded-pill px-3 py-1 mb-3"
                    style={{ background: 'var(--primary-light)', color: 'var(--primary-green)', fontSize: '0.78rem', fontWeight: 700 }}>
                    {m.rol}
                  </span>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }} className="mb-0">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALORES ── */}
      <section style={{ padding: '5.5rem 0', background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold" style={{ color: 'var(--text-dark)', fontSize: '2.2rem' }}>
              Nuestros <span className="text-gradient-premium">Valores</span>
            </h2>
          </div>
          <div className="row g-4">
            {valores.map((v, i) => (
              <div key={i} className="col-sm-6 col-lg-3">
                <div className="card-service-premium h-100 p-4">
                  <i className={`bi ${v.icon} fs-2 mb-3 d-block`} style={{ color: 'var(--primary-green)' }}></i>
                  <h5 className="fw-bold mb-2" style={{ color: 'var(--text-dark)' }}>{v.titulo}</h5>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }} className="mb-0">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Nosotros
