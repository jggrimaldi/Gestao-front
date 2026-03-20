import api from "./api";
import {
  PatientResponse,
  PatientRequest,
  PatientUpdateRequest,
} from "../types";

export const patientService = {
  getAll: async (): Promise<PatientResponse[]> => {
    const response = await api.get<PatientResponse[]>("/patients");
    return response.data;
  },

  getById: async (id: string): Promise<PatientResponse> => {
    const response = await api.get<PatientResponse>(`/patients/${id}`);
    return response.data;
  },

  create: async (data: PatientRequest): Promise<PatientResponse> => {
    const response = await api.post<PatientResponse>("/patients", data);
    return response.data;
  },

  update: async (
    id: string,
    data: PatientUpdateRequest,
  ): Promise<PatientResponse> => {
    const response = await api.put<PatientResponse>(`/patients/${id}`, data);
    return response.data;
  },

  updateNotes: async (
    id: string,
    notes: string,
    imageUrl: string,
  ): Promise<PatientResponse> => {
    const response = await api.patch<PatientResponse>(
      `/pacientes/${id}/anotacao`,
      {
        notes,
        imageUrl,
      },
    );
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/patients/${id}`);
  },
};
