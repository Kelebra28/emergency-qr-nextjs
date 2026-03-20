import Link from 'next/link';
import { Shield, QrCode, HeartPulse } from 'lucide-react';
import { FadeIn } from '@/components/shared/FadeIn';

export default function HomePage() {
  return (
    <main className="page hero">
      <FadeIn>
        <section className="hero-card">
          <span className="eyebrow">
            <Shield size={16} />
            Emergency QR
          </span>

          <h1 className="title">
            Tu ficha médica pública para emergencias,
            <br />
            rápida, clara y compartible.
          </h1>

          <p className="subtitle">
            Crea una página médica personal con QR automático, controla qué datos
            son públicos y permite que paramédicos accedan a la información clave
            en segundos.
          </p>

          <div className="actions">
            <Link className="button button-primary" href="/dashboard">
              Ir al dashboard
            </Link>
            <Link className="button button-secondary" href="/register">
              Crear cuenta
            </Link>
          </div>
        </section>
      </FadeIn>

      <section className="grid-3">
        <FadeIn delay={0.08}>
          <article className="card">
            <QrCode size={22} />
            <h3>QR automático</h3>
            <p>
              Cada perfil genera una página pública única para compartir y usar en
              situaciones de emergencia.
            </p>
          </article>
        </FadeIn>

        <FadeIn delay={0.16}>
          <article className="card">
            <HeartPulse size={22} />
            <h3>Datos críticos visibles</h3>
            <p>
              Muestra solo lo necesario: tipo de sangre, alergias, notas médicas,
              medicamentos y contactos.
            </p>
          </article>
        </FadeIn>

        <FadeIn delay={0.24}>
          <article className="card">
            <Shield size={22} />
            <h3>Control por usuario</h3>
            <p>
              Cada persona decide qué campos se muestran públicamente y cuáles
              permanecen privados.
            </p>
          </article>
        </FadeIn>
      </section>
    </main>
  );
}