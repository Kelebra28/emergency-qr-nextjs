import { prisma } from '@/lib/db/prisma';
import { createSlug } from '@/lib/utils/slug';
import type { PersonFormValues } from '../schemas/person';

const PUBLIC_KEYS = [
  'bloodType',
  'allergies',
  'medicalNotes',
  'medications',
  'emergencyContacts',
] as const;

function toFieldSettings(
  fieldVisibilities: Record<string, 'PUBLIC' | 'PRIVATE'>
) {
  return PUBLIC_KEYS.map((fieldKey) => ({
    fieldKey,
    isVisible: fieldVisibilities[fieldKey] === 'PUBLIC',
  }));
}

async function buildUniqueSlug(firstName: string, lastName: string) {
  const base = createSlug(`${firstName}-${lastName}`);
  let slug = base;
  let counter = 1;

  while (await prisma.person.findUnique({ where: { slug } })) {
    slug = `${base}-${counter}`;
    counter += 1;
  }

  return slug;
}

export async function createPersonForUser(
  userId: number,
  values: PersonFormValues
) {
  const slug = await buildUniqueSlug(values.firstName, values.lastName);

  return prisma.person.create({
    data: {
      userId,
      slug,
      firstName: values.firstName,
      lastName: values.lastName,
      bloodType: values.bloodType || null,
      allergies: values.allergies || null,
      medicalNotes: values.medicalNotes || null,
      medications: values.medications || null,
      photoUrl: values.photoUrl || null,
      emergencyContacts: {
        create: values.emergencyContacts.map((contact) => ({
          name: contact.name,
          relationship: contact.relationship || null,
          phone: contact.phone,
          phoneAlt: contact.phoneAlt || null,
        })),
      },
      fieldSettings: {
        create: toFieldSettings(values.fieldVisibilities),
      },
    },
    include: {
      emergencyContacts: true,
      fieldSettings: true,
    },
  });
}

export async function updatePersonForUser(
  userId: number,
  personId: number,
  values: PersonFormValues
) {
  const person = await prisma.person.findFirst({
    where: { id: personId, userId },
  });

  if (!person) throw new Error('Persona no encontrada');

  await prisma.emergencyContact.deleteMany({ where: { personId } });

  await prisma.person.update({
    where: { id: personId },
    data: {
      firstName: values.firstName,
      lastName: values.lastName,
      bloodType: values.bloodType || null,
      allergies: values.allergies || null,
      medicalNotes: values.medicalNotes || null,
      medications: values.medications || null,
      photoUrl: values.photoUrl || null,
      emergencyContacts: {
        create: values.emergencyContacts.map((contact) => ({
          name: contact.name,
          relationship: contact.relationship || null,
          phone: contact.phone,
          phoneAlt: contact.phoneAlt || null,
        })),
      },
    },
  });

  await Promise.all(
    PUBLIC_KEYS.map((fieldKey) =>
      prisma.personFieldSetting.upsert({
        where: {
          personId_fieldKey: {
            personId,
            fieldKey,
          },
        },
        update: {
          isVisible: values.fieldVisibilities[fieldKey] === 'PUBLIC',
        },
        create: {
          personId,
          fieldKey,
          isVisible: values.fieldVisibilities[fieldKey] === 'PUBLIC',
        },
      })
    )
  );

  return prisma.person.findUniqueOrThrow({
    where: { id: personId },
    include: {
      emergencyContacts: true,
      fieldSettings: true,
    },
  });
}

export async function getPersonForDashboard(userId: number) {
  return prisma.person.findFirst({
    where: { userId },
    include: {
      emergencyContacts: true,
      fieldSettings: true,
    },
  });
}

export async function getPublicPersonBySlug(slug: string) {
  const person = await prisma.person.findUnique({
    where: { slug },
    include: {
      emergencyContacts: true,
      fieldSettings: true,
    },
  });

  if (!person) return null;

  const visibilityMap = Object.fromEntries(
    person.fieldSettings.map((item) => [
      item.fieldKey,
      item.isVisible ? 'PUBLIC' : 'PRIVATE',
    ])
  ) as Record<string, 'PUBLIC' | 'PRIVATE'>;

  return {
    slug: person.slug,
    fullName: `${person.firstName} ${person.lastName}`,
    photoUrl: person.photoUrl,
    bloodType: visibilityMap.bloodType === 'PUBLIC' ? person.bloodType : null,
    allergies: visibilityMap.allergies === 'PUBLIC' ? person.allergies : null,
    medicalNotes:
      visibilityMap.medicalNotes === 'PUBLIC' ? person.medicalNotes : null,
    medications:
      visibilityMap.medications === 'PUBLIC' ? person.medications : null,
    emergencyContacts:
      visibilityMap.emergencyContacts === 'PUBLIC'
        ? person.emergencyContacts.map((contact) => ({
            name: contact.name,
            relationship: contact.relationship,
            phone: contact.phone,
            phoneAlt: contact.phoneAlt,
          }))
        : [],
  };
}