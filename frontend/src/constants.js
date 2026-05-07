import { UserRole } from './types';

export const MOCK_USER = {
  id: '1',
  name: 'Dr. Sarah Connor',
  email: 'sarah.connor@medisync.ai',
  role: UserRole.DOCTOR,
  organization: 'Central Hospital',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
};

export const MOCK_PATIENTS = [
  {
    id: 'p1',
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '1985-06-15',
    gender: 'Male',
    bloodType: 'O+',
    medicalHistory: ['Hypertension', 'Type 2 Diabetes'],
    currentMedications: ['Metformin', 'Lisinopril'],
    allergies: ['Penicillin'],
    emergencyContact: {
      name: 'Jane Doe',
      relationship: 'Spouse',
      phone: '555-0123',
    },
    status: 'Stable',
    riskScore: 25,
    bp: { systolic: 128, diastolic: 82 },
    bloodReport: {
      hemoglobin: 14.2,
      whiteCellCount: 7.5,
      platelets: 250,
      glucose: 110,
      creatinine: 0.9,
      lastUpdated: '2024-05-01T10:00:00Z'
    }
  },
  // baaki same rahega...
];

export const MOCK_INCIDENTS = [
  {
    id: 'i1',
    patientId: 'p2',
    incidentTime: new Date(Date.now() - 3600000).toISOString(),
    location: '456 Oak St, Springfield',
    chiefComplaint: 'Shortness of breath, chest pain',
    vitals: [
      {
        heartRate: 110,
        systolicBP: 140,
        diastolicBP: 95,
        respiratoryRate: 24,
        oxygenSaturation: 88,
        temperature: 37.2,
        recordedAt: new Date(Date.now() - 3000000).toISOString(),
      },
    ],
    narrative: 'Patient in respiratory distress. Oxygen administered.',
    treatmentAdministered: ['Oxygen', 'Albuterol'],
    transportDetails: {
      unit: 'Rescue 1',
      crew: ['Paramedic Miller', 'EMT Jones'],
      destination: 'Central Hospital ER',
      priority: 'High',
    },
    status: 'Submitted',
    organizationId: 'org1',
  },
];

export const ORGANIZATIONS = [
  { id: 'org1', name: 'Central Hospital' },
  { id: 'org2', name: 'Westside Medical Center' },
  { id: 'org3', name: 'Emergency Response Corp' },
];