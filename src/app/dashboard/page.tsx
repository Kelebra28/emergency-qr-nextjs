import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth/session';
import { getPersonForDashboard } from '@/features/person/services/person.service';
import { QrPanel } from '@/components/person/QrPanel';
import { CopyPublicUrlButton } from '@/components/person/CopyPublicUrlButton';

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  const person = await getPersonForDashboard(session.userId);
  const appUrl = process.env.APP_URL || 'http://localhost:3000';

  return (
    <main className="page">
      <section className="hero-card">
        <span className="eyebrow">Dashboard</span>
        <h1 className="title" style={{ fontSize: 'clamp(2rem, 4vw, 3.4rem)' }}>
          Hola, {session.email}
        </h1>
        <p className="subtitle">
          Administra tu perfil médico, revisa tu enlace público y descarga tu QR.
        </p>

        <div className="actions">
          <form action="/api/auth/logout" method="post">
            <button className="button button-secondary" type="submit">
              Cerrar sesión
            </button>
          </form>

          <Link className="button button-primary" href="/dashboard/persona">
            {person ? 'Editar perfil' : 'Crear mi perfil'}
          </Link>
        </div>
      </section>

      {!person ? (
        <section className="card" style={{ marginTop: '1.5rem' }}>
          <h2 className="section-title">Aún no tienes una ficha creada</h2>
          <p className="muted">
            Crea tu perfil con datos médicos esenciales y genera tu página
            pública con QR.
          </p>

          <div className="actions">
            <Link className="button button-primary" href="/dashboard/persona">
              Crear perfil ahora
            </Link>
          </div>
        </section>
      ) : (
        <section className="dashboard-grid" style={{ marginTop: '1.5rem' }}>
          <article className="card">
            <span className="badge">Perfil activo</span>
            <h2 className="section-title" style={{ marginTop: '0.75rem' }}>
              {person.firstName} {person.lastName}
            </h2>

            <div className="row">
              <div>
                <p className="muted">Tipo de sangre</p>
                <strong>{person.bloodType || 'No definido'}</strong>
              </div>
              <div>
                <p className="muted">Alergias</p>
                <strong>{person.allergies || 'No definidas'}</strong>
              </div>
            </div>

            <div className="stack" style={{ marginTop: '1rem' }}>
              <div>
                <p className="muted">Notas médicas</p>
                <strong>{person.medicalNotes || 'No definidas'}</strong>
              </div>

              <div>
                <p className="muted">Medicamentos</p>
                <strong>{person.medications || 'No definidos'}</strong>
              </div>

              <div>
                <p className="muted">URL pública</p>
                <strong>
                  <a href={`${appUrl}/p/${person.slug}`} target="_blank">
                    {appUrl}/p/{person.slug}
                  </a>
                </strong>
              </div>

              <div>
                <p className="muted">Contactos</p>
                <strong>{person.emergencyContacts.length}</strong>
              </div>
            </div>

            <div className="actions">
              <Link className="button button-primary" href="/dashboard/persona">
                Editar perfil
              </Link>
              <a
                className="button button-secondary"
                href={`/p/${person.slug}`}
                target="_blank"
              >
                Ver página pública
              </a>
              <CopyPublicUrlButton value={`${appUrl}/p/${person.slug}`} />
            </div>
          </article>

          <QrPanel slug={person.slug} />
        </section>
      )}
    </main>
  );
}