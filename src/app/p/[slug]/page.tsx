import { notFound } from 'next/navigation';
import { getPublicPersonBySlug } from '@/features/person/services/person.service';

export default async function PublicPersonPage(
  props: {
    params: Promise<{ slug: string }>;
  }
) {
  const { slug } = await props.params;
  const person = await getPublicPersonBySlug(slug);

  if (!person) {
    notFound();
  }

  return (
    <main className="page">
      <section className="hero-card">
        <span className="eyebrow">Ficha de emergencia</span>
        <h1 className="title" style={{ fontSize: 'clamp(2rem, 4vw, 3.4rem)' }}>
          {person.fullName}
        </h1>
        <p className="subtitle">
          Información pública de emergencia para atención rápida.
        </p>
      </section>

      <section className="public-grid" style={{ marginTop: '1.5rem' }}>
        <article className="card">
          <h2 className="section-title">Resumen médico</h2>

          <div className="info-list">
            <div className="info-item">
              <span className="info-label">Tipo de sangre</span>
              <strong>{person.bloodType || 'No visible'}</strong>
            </div>

            <div className="info-item">
              <span className="info-label">Alergias</span>
              <strong>{person.allergies || 'No visibles'}</strong>
            </div>

            <div className="info-item">
              <span className="info-label">Notas médicas</span>
              <strong>{person.medicalNotes || 'No visibles'}</strong>
            </div>

            <div className="info-item">
              <span className="info-label">Medicamentos</span>
              <strong>{person.medications || 'No visibles'}</strong>
            </div>
          </div>
        </article>

        <article className="card">
          <div className="qr-shell">
            <img
              src={`/api/qr/${person.slug}`}
              alt="QR del perfil médico"
              className="qr-image"
            />
          </div>

          <div className="actions" style={{ marginTop: '1rem' }}>
            <a
              className="button button-primary"
              href={`/api/qr/${person.slug}`}
              download
            >
              Descargar QR
            </a>
          </div>
        </article>
      </section>

      <section className="card" style={{ marginTop: '1.5rem' }}>
        <h2 className="section-title">Contactos de emergencia</h2>

        {person.emergencyContacts.length === 0 ? (
          <p className="muted">No visibles o no registrados.</p>
        ) : (
          <div className="stack">
            {person.emergencyContacts.map((contact, index) => (
              <div key={`${contact.phone}-${index}`} className="contact-card">
                <h3 style={{ marginTop: 0, marginBottom: '0.35rem' }}>
                  {contact.name}
                </h3>
                <p className="muted" style={{ marginTop: 0 }}>
                  {contact.relationship || 'Contacto'}
                </p>

                <div className="row">
                  <div>
                    <p className="muted">Teléfono</p>
                    <strong>{contact.phone}</strong>
                  </div>
                  <div>
                    <p className="muted">Alterno</p>
                    <strong>{contact.phoneAlt || 'No definido'}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}