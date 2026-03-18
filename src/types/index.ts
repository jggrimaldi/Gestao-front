// Enum
// ─── Enums ───────────────────────────────────────────────
export type AppointmentStatus = "PENDING" | "FINISHED" | "CANCELED";

// ─── Patient ─────────────────────────────────────────────
export interface PatientResponse {
  id: string;
  name: string;
  cpf: string;
  phone: string;
  age: number | null;
  notes: string | null;
  imageUrl: string | null;
}

export interface PatientRequest {
  name: string;
  cpf: string;
  phone: string;
  age: number;
}

export interface PatientUpdateRequest {
  name: string;
  phone: string;
  age: number;
}

// ─── Appointment ─────────────────────────────────────────
export interface AppointmentResponse {
  id: string;
  date: string;         // "2026-05-12"
  title: string;
  notes: string | null;
  imageUrl: string | null;
  status: AppointmentStatus;
  patientName: string;
  patientPhone: string;
  dentistName: string;
  dentistId: string;
  updatedAt: string;    // "2026-05-12T10:30:00"
}

export interface AppointmentRequest {
  patientId: string;
  title: string;
  date: string;         // "2026-05-12"
}

export interface AppointmentUpdateRequest {
  title: string;
  date: string;         // "2026-05-12"
}

export interface AppointmentNoteUpdateRequest {
  notes: string;
}

// ─── Auth ─────────────────────────────────────────────────
export interface TokenResponse {
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}