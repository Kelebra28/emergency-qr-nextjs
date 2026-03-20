'use client';

import { useState } from 'react';

type VisibilityValue = 'PUBLIC' | 'PRIVATE';

type Contact = {
  name: string;
  relationship?: string | null;
  phone: string;
  phoneAlt?: string | null;
};

type InitialValues = {
  id?: number;
  firstName?: string;
  lastName?: string;
  bloodType?: string | null;
  allergies?: string | null;
  medicalNotes?: string | null;
  medications?: string | null;
  photoUrl?: string | null;
  emergencyContacts?: Contact[];
  fieldVisibilities?: Record<string, VisibilityValue>;
};

type Props = {
  mode: 'create' | 'edit';
  initialValues?: InitialValues;
};

export function PersonForm({ mode, initialValues }: Props) {
  const action =
    mode === 'create'
      ? '/api/person'
      : `/api/person/${initialValues?.id}`;

  const [contacts, setContacts] = useState<Contact[]>(
    initialValues?.emergencyContacts?.length
      ? initialValues.emergencyContacts
      : [{ name: '', relationship: '', phone: '', phoneAlt: '' }]
  );

  const visibility = initialValues?.fieldVisibilities || {
    bloodType: 'PUBLIC',
    allergies: 'PUBLIC',
    medicalNotes: 'PUBLIC',
    medications: 'PUBLIC',
    emergencyContacts: 'PUBLIC',
  };

  function addContact() {
    setContacts((prev) => [
      ...prev,
      { name: '', relationship: '', phone: '', phoneAlt: '' },
    ]);
  }

  function removeContact(index: number) {
    setContacts((prev) => prev.filter((_, i) => i !== index));
  }

  function updateContact(index: number, key: keyof Contact, value: string) {
    setContacts((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [key]: value } : item
      )
    );
  }

  return (
    <form action={action} method="post" className="stack">
      <section className="card">
        <h2 className="section-title">Datos personales</h2>

        <div className="row">
          <div className="field">
            <label htmlFor="firstName">Nombre</label>
            <input
              className="input"
              id="firstName"
              name="firstName"
              defaultValue={initialValues?.firstName || ''}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="lastName">Apellido</label>
            <input
              className="input"
              id="lastName"
              name="lastName"
              defaultValue={initialValues?.lastName || ''}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="field">
            <label htmlFor="bloodType">Tipo de sangre</label>
            <input
              className="input"
              id="bloodType"
              name="bloodType"
              defaultValue={initialValues?.bloodType || ''}
              placeholder="Ej. O+"
            />
          </div>

          <div className="field">
            <label htmlFor="photoUrl">URL de foto</label>
            <input
              className="input"
              id="photoUrl"
              name="photoUrl"
              defaultValue={initialValues?.photoUrl || ''}
              placeholder="https://..."
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="allergies">Alergias</label>
          <textarea
            className="textarea"
            id="allergies"
            name="allergies"
            defaultValue={initialValues?.allergies || ''}
          />
        </div>

        <div className="field">
          <label htmlFor="medicalNotes">Notas médicas</label>
          <textarea
            className="textarea"
            id="medicalNotes"
            name="medicalNotes"
            defaultValue={initialValues?.medicalNotes || ''}
          />
        </div>

        <div className="field">
          <label htmlFor="medications">Medicamentos</label>
          <textarea
            className="textarea"
            id="medications"
            name="medications"
            defaultValue={initialValues?.medications || ''}
          />
        </div>
      </section>

      <section className="card">
        <h2 className="section-title">Visibilidad pública</h2>

        <div className="row">
          <div className="field">
            <label htmlFor="fieldVisibilities.bloodType">Tipo de sangre</label>
            <select
              className="select"
              id="fieldVisibilities.bloodType"
              name="fieldVisibilities.bloodType"
              defaultValue={visibility.bloodType}
            >
              <option value="PUBLIC">Público</option>
              <option value="PRIVATE">Privado</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="fieldVisibilities.allergies">Alergias</label>
            <select
              className="select"
              id="fieldVisibilities.allergies"
              name="fieldVisibilities.allergies"
              defaultValue={visibility.allergies}
            >
              <option value="PUBLIC">Público</option>
              <option value="PRIVATE">Privado</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="field">
            <label htmlFor="fieldVisibilities.medicalNotes">Notas médicas</label>
            <select
              className="select"
              id="fieldVisibilities.medicalNotes"
              name="fieldVisibilities.medicalNotes"
              defaultValue={visibility.medicalNotes}
            >
              <option value="PUBLIC">Público</option>
              <option value="PRIVATE">Privado</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="fieldVisibilities.medications">Medicamentos</label>
            <select
              className="select"
              id="fieldVisibilities.medications"
              name="fieldVisibilities.medications"
              defaultValue={visibility.medications}
            >
              <option value="PUBLIC">Público</option>
              <option value="PRIVATE">Privado</option>
            </select>
          </div>
        </div>

        <div className="field">
          <label htmlFor="fieldVisibilities.emergencyContacts">
            Contactos de emergencia
          </label>
          <select
            className="select"
            id="fieldVisibilities.emergencyContacts"
            name="fieldVisibilities.emergencyContacts"
            defaultValue={visibility.emergencyContacts}
          >
            <option value="PUBLIC">Público</option>
            <option value="PRIVATE">Privado</option>
          </select>
        </div>
      </section>

      <section className="card">
        <div className="row" style={{ alignItems: 'center' }}>
          <h2 className="section-title" style={{ marginBottom: 0 }}>
            Contactos de emergencia
          </h2>
          <button
            type="button"
            className="button button-secondary"
            onClick={addContact}
          >
            Agregar contacto
          </button>
        </div>

        <div className="stack" style={{ marginTop: '1rem' }}>
          {contacts.map((contact, index) => (
            <div key={index} className="contact-card">
              <div className="row">
                <div className="field">
                  <label htmlFor={`contact-name-${index}`}>Nombre</label>
                  <input
                    className="input"
                    id={`contact-name-${index}`}
                    name={`emergencyContacts.${index}.name`}
                    value={contact.name || ''}
                    onChange={(e) =>
                      updateContact(index, 'name', e.target.value)
                    }
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor={`contact-relationship-${index}`}>Relación</label>
                  <input
                    className="input"
                    id={`contact-relationship-${index}`}
                    name={`emergencyContacts.${index}.relationship`}
                    value={contact.relationship || ''}
                    onChange={(e) =>
                      updateContact(index, 'relationship', e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="row">
                <div className="field">
                  <label htmlFor={`contact-phone-${index}`}>Teléfono</label>
                  <input
                    className="input"
                    id={`contact-phone-${index}`}
                    name={`emergencyContacts.${index}.phone`}
                    value={contact.phone || ''}
                    onChange={(e) =>
                      updateContact(index, 'phone', e.target.value)
                    }
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor={`contact-phone-alt-${index}`}>Teléfono alterno</label>
                  <input
                    className="input"
                    id={`contact-phone-alt-${index}`}
                    name={`emergencyContacts.${index}.phoneAlt`}
                    value={contact.phoneAlt || ''}
                    onChange={(e) =>
                      updateContact(index, 'phoneAlt', e.target.value)
                    }
                  />
                </div>
              </div>

              {contacts.length > 1 && (
                <button
                  type="button"
                  className="button button-danger"
                  onClick={() => removeContact(index)}
                >
                  Eliminar contacto
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      <div className="actions">
        <button className="button button-primary" type="submit">
          {mode === 'create' ? 'Guardar perfil' : 'Actualizar perfil'}
        </button>
      </div>
    </form>
  );
}