import { redirect } from 'next/navigation';
import { getCurrentSession } from './session';

export async function requireSession() {
  const session = await getCurrentSession();
  if (!session) redirect('/login');
  return session;
}
