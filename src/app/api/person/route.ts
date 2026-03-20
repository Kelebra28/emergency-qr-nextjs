import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { createPersonForUser } from '@/features/person/services/person.service';
import { personFormSchema } from '@/features/person/schemas/person';

function parseContacts(formData: FormData) {
  const contacts = [];
  let index = 0;

  while (true) {
    const name = formData.get(`emergencyContacts.${index}.name`);
    const phone = formData.get(`emergencyContacts.${index}.phone`);

    if (!name && !phone) break;

    contacts.push({
      name: String(name || '').trim(),
      relationship: String(
        formData.get(`emergencyContacts.${index}.relationship`) || ''
      ).trim(),
      phone: String(phone || '').trim(),
      phoneAlt: String(
        formData.get(`emergencyContacts.${index}.phoneAlt`) || ''
      ).trim(),
    });

    index += 1;
  }

  return contacts;
}

export async function POST(request: Request) {
  const session = await getSession();

  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const formData = await request.formData();

  const parsed = personFormSchema.safeParse({
    firstName: String(formData.get('firstName') || '').trim(),
    lastName: String(formData.get('lastName') || '').trim(),
    bloodType: String(formData.get('bloodType') || '').trim(),
    allergies: String(formData.get('allergies') || '').trim(),
    medicalNotes: String(formData.get('medicalNotes') || '').trim(),
    medications: String(formData.get('medications') || '').trim(),
    photoUrl: String(formData.get('photoUrl') || '').trim(),
    emergencyContacts: parseContacts(formData),
    fieldVisibilities: {
      bloodType: String(formData.get('fieldVisibilities.bloodType') || 'PUBLIC'),
      allergies: String(formData.get('fieldVisibilities.allergies') || 'PUBLIC'),
      medicalNotes: String(formData.get('fieldVisibilities.medicalNotes') || 'PUBLIC'),
      medications: String(formData.get('fieldVisibilities.medications') || 'PUBLIC'),
      emergencyContacts: String(
        formData.get('fieldVisibilities.emergencyContacts') || 'PUBLIC'
      ),
    },
  });

  if (!parsed.success) {
    return NextResponse.redirect(new URL('/dashboard/persona', request.url));
  }

  await createPersonForUser(session.userId, parsed.data);

  return NextResponse.redirect(new URL('/dashboard', request.url));
}