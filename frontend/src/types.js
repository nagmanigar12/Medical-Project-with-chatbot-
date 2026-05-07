/**
 * ===============================
 * ROLES
 * ===============================
 */
export const UserRole = {
  ADMIN: 'Admin',
  DOCTOR: 'Doctor',
  PARAMEDIC: 'Paramedic',
  QA_OFFICER: 'QA Officer',
};

/**
 * ===============================
 * STATUS CONSTANTS
 * ===============================
 */
export const PatientStatus = {
  STABLE: 'Stable',
  CRITICAL: 'Critical',
  DISCHARGED: 'Discharged',
};

export const IncidentStatus = {
  DRAFT: 'Draft',
  SUBMITTED: 'Submitted',
  REVIEWED: 'Reviewed',
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
};

export const RiskLevel = {
  LOW: 'Low',
  MODERATE: 'Moderate',
  HIGH: 'High',
  CRITICAL: 'Critical',
  ERROR: 'Error',
  UNKNOWN: 'Unknown',
};

/**
 * ===============================
 * EXAMPLE STRUCTURES (REFERENCE)
 * ===============================
 */

/**
 * USER OBJECT
 */
export const UserExample = {
  id: '',
  name: '',
  email: '',
  role: UserRole.DOCTOR,
  organization: '',
  avatar: '',
  token: '',
};

/**
 * BLOOD REPORT
 */
export const BloodReportExample = {
  hemoglobin: 0,
  whiteCellCount: 0,
  platelets: 0,
  glucose: 0,
  creatinine: 0,
  lastUpdated: '',
};

/**
 * PATIENT OBJECT
 */
export const PatientExample = {
  id: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  gender: 'Male',
  bloodType: '',
  medicalHistory: [],
  currentMedications: [],
  allergies: [],
  emergencyContact: {
    name: '',
    relationship: '',
    phone: '',
  },
  lastIncidentId: '',
  status: PatientStatus.STABLE,
  riskScore: 0,
  bp: {
    systolic: 0,
    diastolic: 0,
  },
  bloodReport: BloodReportExample,
};

/**
 * VITALS OBJECT
 */
export const VitalsExample = {
  heartRate: 0,
  systolicBP: 0,
  diastolicBP: 0,
  respiratoryRate: 0,
  oxygenSaturation: 0,
  temperature: 0,
  recordedAt: '',
};

/**
 * INCIDENT REPORT
 */
export const IncidentReportExample = {
  id: '',
  patientId: '',
  incidentTime: '',
  location: '',
  chiefComplaint: '',
  vitals: [],
  narrative: '',
  treatmentAdministered: [],
  transportDetails: {
    unit: '',
    crew: [],
    destination: '',
    priority: 'Low',
  },
  status: IncidentStatus.DRAFT,
  qaComments: [],
  organizationId: '',
};

/**
 * WORKFLOW FIELD
 */
export const WorkflowFieldExample = {
  id: '',
  label: '',
  type: 'text', // text | number | dropdown | checkbox | date
  required: false,
  options: [],
};

/**
 * WORKFLOW
 */
export const WorkflowExample = {
  id: '',
  name: '',
  description: '',
  fields: [],
  createdAt: '',
  createdBy: '',
};

/**
 * NOTIFICATION
 */
export const NotificationExample = {
  id: '',
  title: '',
  message: '',
  type: 'info', // info | alert | success
  timestamp: '',
  read: false,
};

/**
 * RISK ANALYSIS
 */
export const RiskAnalysisExample = {
  riskScore: 0,
  riskLevel: RiskLevel.LOW,
  topConcerns: [],
  rationale: '',
};