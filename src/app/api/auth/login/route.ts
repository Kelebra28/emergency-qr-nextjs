import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/db/prisma';
import { createSession } from '@/lib/auth/session';

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = String(formData.get('email') || '').trim().toLowerCase();
  const password = String(formData.get('password') || '').trim();

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);

  if (!isValid) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  await createSession({
    userId: user.id,
    email: user.email,
  });

  return NextResponse.redirect(new URL('/dashboard', request.url));
}