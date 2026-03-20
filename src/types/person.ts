export type PublicPerson = {
  slug: string;
  fullName: string;
  photoUrl: string | null;
  bloodType: string | null;
  allergies: string | null;
  medicalConditions: string | null;
  medications: string | null;
  emergencyNotes: string | null;
  emergencyContacts: Array<{
    name: string;
    relationship: string | null;
    phone: string;
    phoneAlt: string | null;
  }>;
};
