import { useState, useEffect } from "react";
import { AppointmentResponse } from "../types";
import { appointmentService } from "../services/appointmentService";
import { mockAppointments } from "../mocks/data";

const USE_MOCK = false;

export function useAppointments(patientId: string | null) {
  const [appointments, setAppointments] = useState<AppointmentResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!patientId) {
      setAppointments([]);
      return;
    }

    async function fetchAppointments() {
      try {
        setLoading(true);
        setError(null);
        const data = USE_MOCK
          ? mockAppointments.filter(
              (a) => a.patientName === appointments[0]?.patientName,
            )
          : await appointmentService.getByPatient(patientId!);
        setAppointments(data);
      } catch {
        setError("Erro ao carregar consultas.");
      } finally {
        setLoading(false);
      }
    }

    fetchAppointments();
  }, [patientId]);

  return { appointments, loading, error };
}
