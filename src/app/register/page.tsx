import Link from 'next/link';

export default function RegisterPage() {
  return (
    <main className="form-shell">
      <section className="panel">
        <p className="badge">Nuevo perfil</p>
        <h1 className="panel-title">Crear cuenta</h1>
        <p className="panel-subtitle">
          Registra tu acceso para crear tu ficha médica pública con QR.
        </p>

        <form action="/api/auth/register" method="post">
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
              placeholder="Mínimo 8 caracteres"
              required
            />
          </div>

          <div className="actions">
            <button className="button button-primary" type="submit">
              Crear cuenta
            </button>
            <Link className="button button-secondary" href="/login">
              Ya tengo cuenta
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}