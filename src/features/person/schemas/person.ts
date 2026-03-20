import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  relationship: z.string().optional(),
  phone: z.string().min(1, 'El teléfono es obligatorio'),
  phoneAlt: z.string().optional(),
});

export const personFormSchema = z.object({
  firstName: z.string().min(1, 'El nombre es obligatorio'),
  lastName: z.string().min(1, 'El apellido es obligatorio'),
  bloodType: z.string().optional(),
  allergies: z.string().optional(),
  medicalNotes: z.string().optional(),
  medications: z.string().optional(),
  photoUrl: z.string().optional(),
  emergencyContacts: z.array(contactSchema).min(1, 'Agrega al menos un contacto'),
  fieldVisibilities: z.object({
    bloodType: z.enum(['PUBLIC', 'PRIVATE']),
    allergies: z.enum(['PUBLIC', 'PRIVATE']),
    medicalNotes: z.enum(['PUBLIC', 'PRIVATE']),
    medications: z.enum(['PUBLIC', 'PRIVATE']),
    emergencyContacts: z.enum(['PUBLIC', 'PRIVATE']),
  }),
});

export type PersonFormValues = z.infer<typeof personFormSchema>;