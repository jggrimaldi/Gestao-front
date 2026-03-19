import { useState } from "react";
import Header from "../../components/Header/Header";

import { AppointmentResponse, PatientResponse } from "../../types";
import { mockAppointments } from "../../mocks/data";
import { usePatients } from "../../hooks/usePatient";
import PacientePainel from "../../components/PatientPanel/PatientPanel";
import PacienteCard from "../../components/PatientCarsds/PatientCard";

export default function PacientesPage() {
  const { patients, loading, error } = usePatients();
  const [busca, setBusca] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<PatientResponse | null>(null);

  const filtered = patients.filter((p) =>
    p.name.toLowerCase().includes(busca.toLowerCase()) ||
    p.cpf.includes(busca) ||
    p.phone.includes(busca)
  );

  // Por enquanto filtra do mock — depois virá do useAppointments(selectedPatient?.id)
  const appointments: AppointmentResponse[] = selectedPatient
    ? mockAppointments.filter((a) => a.patientName === selectedPatient.name)
    : [];

  function handleSelect(patient: PatientResponse) {
    setSelectedPatient((prev) => (prev?.id === patient.id ? null : patient));
  }

  function handleSelectAppointment(appointment: AppointmentResponse) {
    console.log("Navegar para consulta:", appointment.id);
    // TODO: useNavigate(`/appointments/${appointment.id}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=Lora:wght@600;700&display=swap');
        * { font-family: 'DM Sans', sans-serif; }
        .font-display { font-family: 'Lora', serif; }
        .card-hover { transition: all 0.18s ease; }
        .card-hover:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(236,72,153,0.10); }
        @keyframes slideIn { from { opacity: 0; transform: translateX(16px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeUp   { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .slide-in { animation: slideIn 0.28s ease forwards; }
        .fade-up  { animation: fadeUp  0.22s ease forwards; }
      `}</style>

      <Header />

      <div className="max-w-6xl mx-auto px-4 py-7 flex flex-col lg:flex-row gap-6 items-start">

        {/* Lista */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 font-display">Pacientes</h1>
              <p className="text-sm text-gray-400 mt-1">
                {filtered.length} paciente{filtered.length !== 1 ? "s" : ""}
              </p>
            </div>
            <button className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm">
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24">
                <path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              <span className="hidden sm:inline">Novo Paciente</span>
            </button>
          </div>

          {/* Busca */}
          <div className="relative mb-5">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" width="16" height="16" fill="none" viewBox="0 0 24 24">
              <path d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Buscar paciente..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border-2 border-gray-100 rounded-xl text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-50 transition-all"
            />
          </div>

          {/* Estados */}
          {loading && (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-pink-300 border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-400 text-sm rounded-xl px-4 py-3 mb-4">
              {error}
            </div>
          )}

          {!loading && !error && (
            <div className="space-y-3">
              {filtered.length === 0 && (
                <div className="text-center py-20 text-gray-300">
                  <svg className="mx-auto mb-4" width="44" height="44" fill="none" viewBox="0 0 24 24">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <p className="text-sm font-medium">Nenhum paciente encontrado</p>
                </div>
              )}

              {filtered.map((patient, i) => (
                <PacienteCard
                  key={patient.id}
                  patient={patient}
                  selected={selectedPatient?.id === patient.id}
                  onClick={() => handleSelect(patient)}
                  animationDelay={i * 35}
                />
              ))}
            </div>
          )}
        </div>

        {/* Painel lateral */}
        {selectedPatient && (
          <PacientePainel
            patient={selectedPatient}
            appointments={appointments}
            loadingAppointments={false}
            onClose={() => setSelectedPatient(null)}
            onNewAppointment={() => console.log("Nova consulta")}
            onEdit={() => console.log("Editar paciente")}
            onSelectAppointment={handleSelectAppointment}
          />
        )}
      </div>
    </div>
  );
}