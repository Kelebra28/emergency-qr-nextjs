import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('Admin123*', 10);

  const user = await prisma.user.upsert({
    where: { email: 'demo@emergencyqr.local' },
    update: {},
    create: {
      email: 'demo@emergencyqr.local',
      passwordHash,
    },
  });

  const person = await prisma.person.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      slug: 'demo-medica',
      firstName: 'Ricardo',
      lastName: 'Demo',
      bloodType: 'O+',
      allergies: 'Penicilina',
      medicalNotes: 'Hipertensión controlada',
      medications: 'Losartán',
      showBloodType: true,
      showAllergies: true,
      showMedicalNotes: true,
      showMedications: true,
    },
  });

  await prisma.emergencyContact.createMany({
    data: [
      {
        personId: person.id,
        name: 'Contacto Demo',
        relationship: 'Hermano',
        phone: '5512345678',
        phoneAlt: '5587654321',
      },
    ],
    skipDuplicates: true,
  });

  await prisma.personFieldSetting.createMany({
    data: [
      { personId: person.id, fieldKey: 'bloodType', isVisible: true },
      { personId: person.id, fieldKey: 'allergies', isVisible: true },
      { personId: person.id, fieldKey: 'medicalNotes', isVisible: true },
      { personId: person.id, fieldKey: 'medications', isVisible: true },
      { personId: person.id, fieldKey: 'emergencyContacts', isVisible: true },
    ],
    skipDuplicates: true,
  });

  console.log('Seed completado correctamente');
}

main()
  .catch((error) => {
    console.error('Error ejecutando seed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });