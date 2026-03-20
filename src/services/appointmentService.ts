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
      `/appointments/patient/${patientId}`,
    );
    return response.data;
  },

  getById: async (id: string): Promise<AppointmentResponse> => {
    const response = await api.get<AppointmentResponse>(`/appointments/${id}`);
    return response.data;
  },

  create: async (data: AppointmentRequest): Promise<AppointmentResponse> => {
    const response = await api.post<AppointmentResponse>("/appointments", data);
    return response.data;
  },

  update: async (
    id: string,
    data: AppointmentUpdateRequest,
  ): Promise<AppointmentResponse> => {
    const response = await api.put<AppointmentResponse>(
      `/appointments/${id}`,
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
    await api.delete(`/appointments/${id}`);
  },
};
