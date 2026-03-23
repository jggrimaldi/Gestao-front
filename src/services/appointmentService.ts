import api from "./api";
import {
  AppointmentResponse,
  AppointmentRequest,
  AppointmentUpdateRequest,
  AppointmentNoteUpdateRequest,
} from "../types";

export const appointmentService = {
  getByPatient: async (patientId: string): Promise<AppointmentResponse[]> => {
    const response = await api.get<AppointmentResponse[]>(
      `/consultas/paciente/${patientId}`,
    );
    return response.data;
  },

  getById: async (id: string): Promise<AppointmentResponse> => {
    const response = await api.get<AppointmentResponse>(`/consultas/${id}`);
    return response.data;
  },

  create: async (data: AppointmentRequest): Promise<AppointmentResponse> => {
    const response = await api.post<AppointmentResponse>("/consultas", data);
    return response.data;
  },

  update: async (
    id: string,
    data: AppointmentUpdateRequest,
  ): Promise<AppointmentResponse> => {
    const response = await api.put<AppointmentResponse>(
      `/consultas/${id}/detalhes`,
      data,
    );
    return response.data;
  },

  updateNotes: async (
    id: string,
    notes: string,
    imageUrl: string,
  ): Promise<AppointmentResponse> => {
    const response = await api.patch<AppointmentResponse>(
      `/consultas/${id}/anotacao`,
      { notes, imageUrl },
    );
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/consultas/${id}`);
  },
};
