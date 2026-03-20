import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="form-shell">
      <section className="panel">
        <p className="badge">Acceso seguro</p>
        <h1 className="panel-title">Iniciar sesión</h1>
        <p className="panel-subtitle">
          Entra para administrar tu perfil médico y tu QR público.
        </p>

        <form action="/api/auth/login" method="post">
          <div className="field">
            <label htmlFor="email">Correo</label>
            <input
              className="input"
              id="email"
              name="email"
              type="email"
              placeholder="tucorreo@ejemplo.com"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="password">Contraseña</label>
            <input
              className="input"
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="actions">
            <button className="button button-primary" type="submit">
              Entrar
            </button>
            <Link className="button button-secondary" href="/register">
              Crear cuenta
            </Link>
          </div>
        </form>

        <p className="muted" style={{ marginTop: '1rem' }}>
          Demo: demo@emergencyqr.local / Admin123*
        </p>
      </section>
    </main>
  );
}