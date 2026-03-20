'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, LayoutDashboard, UserRound, LogIn } from 'lucide-react';

export function AppNavbar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="nav-wrap">
      <nav className="nav">
        <Link href="/" className="nav-brand">
          <Shield size={18} />
          <span>Emergency QR</span>
        </Link>

        <div className="nav-links">
          <Link
            href="/dashboard"
            className={`nav-link ${isActive('/dashboard') ? 'nav-link-active' : ''}`}
          >
            <LayoutDashboard size={16} />
            Dashboard
          </Link>

          <Link
            href="/dashboard/persona"
            className={`nav-link ${isActive('/dashboard/persona') ? 'nav-link-active' : ''}`}
          >
            <UserRound size={16} />
            Mi perfil
          </Link>

          <Link
            href="/login"
            className={`nav-link ${isActive('/login') ? 'nav-link-active' : ''}`}
          >
            <LogIn size={16} />
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
}