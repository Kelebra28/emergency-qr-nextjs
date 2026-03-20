import React from 'react';

type Props = {
  slug: string;
};

export function QrPanel({ slug }: Props) {
  const qrUrl = `/api/qr/${slug}`;
  const publicUrl = `/p/${slug}`;

  return (
    <section className="card">
      <span className="badge">QR público</span>
      <h2 className="section-title" style={{ marginTop: '0.75rem' }}>
        Comparte tu ficha médica
      </h2>
      <p className="muted">
        Este QR lleva directamente a tu perfil público de emergencia.
      </p>

      <div className="qr-shell">
        <img src={qrUrl} alt="QR del perfil médico" className="qr-image" />
      </div>

      <div className="actions">
        <a className="button button-primary" href={qrUrl} download>
          Descargar QR
        </a>
        <a className="button button-secondary" href={publicUrl} target="_blank">
          Ver página pública
        </a>
      </div>
    </section>
  );
}