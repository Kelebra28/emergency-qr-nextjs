import './globals.css';
import type { Metadata } from 'next';
import { AppNavbar } from '@/components/shared/AppNavbar';

export const metadata: Metadata = {
  title: 'Emergency QR',
  description: 'Ficha médica pública para emergencias con QR',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        <div className="app-shell">
          <div className="ambient ambient-a" />
          <div className="ambient ambient-b" />
          <AppNavbar />
          {children}
        </div>
      </body>
    </html>
  );
}