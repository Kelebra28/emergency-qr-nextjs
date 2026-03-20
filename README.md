# Emergency QR - Next.js + MySQL

App base para perfiles médicos de emergencia.

## Qué incluye

- Next.js con App Router
- MySQL con Prisma
- Login desde v1
- 1 cuenta = 1 ficha personal
- Página pública dinámica por persona
- QR generado desde Next.js
- Control de visibilidad por campo
- Estructura pensada con Atomic Design
- API con Route Handlers

## Flujo

1. El usuario se registra.
2. Crea su ficha médica.
3. Define qué campos son públicos o privados.
4. La app genera una URL pública por persona.
5. También genera un QR que apunta a esa URL.
6. Paramédicos o terceros escanean el QR y ven únicamente los campos públicos.

## Estructura

```bash
src/
  app/
  components/
    atoms/
    molecules/
    organisms/
    templates/
  features/
    person/
  lib/
    auth/
    db/
    qr/
    utils/
  types/
prisma/
```

## Variables de entorno

Copia `.env.example` a `.env`.

```env
DATABASE_URL="mysql://USER:PASSWORD@HOST:3306/DATABASE"
APP_URL="http://localhost:3000"
JWT_SECRET="cambia-esto-por-un-secreto-largo-y-seguro"
```

## Instalación

```bash
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run db:seed
npm run dev
```

## Demo inicial

Después del seed:

- email: `demo@emergencyqr.local`
- password: `Admin123*`

## Endpoints principales

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`

### Persona

- `GET /api/person`
- `POST /api/person`
- `POST /api/person/:id`
- `PATCH /api/person/:id`

### Público

- `GET /api/public/persons/:slug`
- `GET /api/public/persons/:slug/qr`

## Siguientes mejoras recomendadas

- agregar múltiples contactos dinámicos desde frontend con JS
- subir imagen a storage en vez de usar URL manual
- auditoría de cambios
- descarga PDF del QR
- mejor UX para errores de validación
- middleware para rutas protegidas
- cifrado adicional o consentimiento explícito para datos sensibles
