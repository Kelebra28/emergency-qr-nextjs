import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/db/prisma';
import { createSession } from '@/lib/auth/session';

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = String(formData.get('email') || '').trim().toLowerCase();
  const password = String(formData.get('password') || '').trim();

  if (!email || !password || password.length < 8) {
    return NextResponse.redirect(new URL('/register', request.url));
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
    },
  });

  await createSession({
    userId: user.id,
    email: user.email,
  });

  return NextResponse.redirect(new URL('/dashboard/persona', request.url));
}