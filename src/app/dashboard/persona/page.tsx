import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth/session';
import { getPersonForDashboard } from '@/features/person/services/person.service';
import { PersonForm } from '@/components/person/PersonForm';

export default async function DashboardPersonaPage() {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  const person = await getPersonForDashboard(session.userId);

  const initialValues = person
    ? {
        id: person.id,
        firstName: person.firstName,
        lastName: person.lastName,
        bloodType: person.bloodType,
        allergies: person.allergies,
        medicalNotes: person.medicalNotes,
        medications: person.medications,
        photoUrl: person.photoUrl,
        emergencyContacts: person.emergencyContacts,
        fieldVisibilities: Object.fromEntries(
          person.fieldSettings.map((item) => [
            item.fieldKey,
            item.isVisible ? 'PUBLIC' : 'PRIVATE',
          ])
        ) as Record<string, 'PUBLIC' | 'PRIVATE'>,
      }
    : undefined;

  return (
    <main className="page">
      <section className="hero-card">
        <span className="eyebrow">Perfil médico</span>
        <h1 className="title" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
          {person ? 'Editar tu ficha de emergencia' : 'Crear tu ficha de emergencia'}
        </h1>
        <p className="subtitle">
          Completa la información médica esencial que podrá mostrarse en tu página
          pública y en el QR.
        </p>
      </section>

      <div style={{ marginTop: '1.5rem' }}>
        <PersonForm mode={person ? 'edit' : 'create'} initialValues={initialValues} />
      </div>
    </main>
  );
}