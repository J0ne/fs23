export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: EntryType[];
}

export type NonSensitivePatient = Omit<Patient, "ssn">;

export type NewPatient = Omit<Patient, "id">;


export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: {
        startDate: string;
        endDate: string;
    };
}

export interface SickLeave {
    startDate: string;
    endDate: string;
}

export interface Discharge {
    date: string;
    criteria: string;
}


export interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: {
        date: string;
        criteria: string;
    };
}

export type EntryType = HealthCheckEntry | OccupationalHealthcareEntry | HospitalEntry;



export type PatientFormValues = Omit<Patient, "id" | "entries">;

export type EntryFormValues = Omit<EntryType, "id">;

export type EntryFormValuesBase = Omit<BaseEntry, "id">;

export type NewEntry = Omit<EntryType, "id">;

export type NewEntryBase = Omit<BaseEntry, "id">;

export type NewHealthCheckEntry = Omit<HealthCheckEntry, "id">;

export type NewOccupationalHealthcareEntry = Omit<OccupationalHealthcareEntry, "id">;

export type NewHospitalEntry = Omit<HospitalEntry, "id">;

export type NewEntryType = NewHealthCheckEntry | NewOccupationalHealthcareEntry | NewHospitalEntry;

export type NewEntryFormValues = Omit<NewEntryType, "id">;