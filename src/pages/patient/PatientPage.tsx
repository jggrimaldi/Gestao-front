import { useState } from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";

import { AppointmentResponse, PatientResponse } from "../../types";
import { mockAppointments } from "../../mocks/data";
import { usePatients } from "../../hooks/usePatient";
import PacientePainel from "../../components/PatientPanel/PatientPanel";
import PacienteCard from "../../components/PatientCarsds/PatientCard";
import Modal from "../../components/Modal/Modal";
import NovoPacienteForm from "../../components/NovoPatientForm/PatientForm";

const USE_MOCK = false;

export default function PacientesPage() {
  // ✅ refetch extraído corretamente
  const { patients, loading, error, refetch, addPatient } = usePatients();
 
  const [busca, setBusca] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<PatientResponse | null>(null);
  const [openNotes, setOpenNotes] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
 
  const filtered = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(busca.toLowerCase()) ||
      p.cpf.includes(busca) ||
      p.phone.includes(busca),
  );
 
  const appointments: AppointmentResponse[] = selectedPatient
    ? mockAppointments.filter((a) => a.patientName === selectedPatient.name)
    : [];
 
  function handleSelect(patient: PatientResponse) {
    const isSamePatient = selectedPatient?.id === patient.id;
    setSelectedPatient(isSamePatient ? null : patient);
    setOpenNotes(false);
 
    const cardElement = document.getElementById(`patient-card-${patient.id}`);
    cardElement?.scrollIntoView({ behavior: "smooth", block: "start" });
 
    if (!isSamePatient) {
      setTimeout(() => {
        document.getElementById("patient-panel")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 180);
    }
  }
 
  function handleSelectAppointment(appointment: AppointmentResponse) {
    console.log("Navegar para consulta:", appointment.id);
    // TODO: navigate(`/appointments/${appointment.id}`)
  }
 
  function handleOpenNotes(patient: PatientResponse) {
    setSelectedPatient(patient);
    setOpenNotes(true);
  }
 
  // ✅ refetch agora existe e funciona
  function handleNewPatientSuccess(newPatient: PatientResponse) {
    setModalOpen(false);
    // Com mock: adiciona direto no estado
    // Com API real: o refetch garante sincronização com o banco
    if (USE_MOCK) {
      addPatient(newPatient);
    } else {
      refetch();
    }
    setSelectedPatient(newPatient);
  }
 
  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=Lora:wght@600;700&display=swap');
        * { font-family: 'DM Sans', sans-serif; }
        .font-display { font-family: 'Lora', serif; }
        .card-hover { transition: all 0.18s ease; }
        .card-hover:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(236,72,153,0.10); }
        @keyframes slideIn    { from { opacity: 0; transform: translateX(16px); }            to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeUp     { from { opacity: 0; transform: translateY(10px); }            to { opacity: 1; transform: translateY(0); } }
        @keyframes modalIn    { from { opacity: 0; transform: scale(0.95) translateY(8px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes backdropIn { from { opacity: 0; }                                         to { opacity: 1; } }
        .slide-in       { animation: slideIn    0.28s ease forwards; }
        .fade-up        { animation: fadeUp     0.22s ease forwards; }
        .modal-content  { animation: modalIn    0.25s ease forwards; }
        .modal-backdrop { animation: backdropIn 0.2s  ease forwards; }
      `}</style>
 
      <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        
 
      <div className="flex min-h-screen">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
 
        <main className="flex-1 overflow-auto">
          <div className="max-w-6xl mx-auto px-4 py-7">
            <div className="flex-1 min-w-0 flex flex-col gap-6">
 
              {/* Título + botão */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">Pacientes</h1>
                  <p className="text-sm text-gray-400 mt-1">
                    {filtered.length} paciente{filtered.length !== 1 ? "s" : ""}
                  </p>
                </div>
                {/* ✅ onClick abrindo o modal */}
                <button
                  onClick={() => setModalOpen(true)}
                  className="flex items-center gap-2 bg-pink-400 hover:bg-pink-500 active:bg-pink-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm"
                >
                  <svg width="15" height="15" fill="none" viewBox="0 0 24 24">
                    <path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                  <span className="hidden sm:inline">Novo Paciente</span>
                </button>
              </div>
              
 
              {/* Busca */}
              <div className="relative mb-5">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <path d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
                <input
                  type="text"
                  placeholder="Buscar paciente..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white border-2 border-gray-100 rounded-xl text-sm text-black-700 placeholder-gray-400 focus:outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-50 transition-all"
                />
              </div>
 
              {/* Loading */}
              {loading && (
                <div className="flex justify-center py-20">
                  <div className="w-8 h-8 border-2 border-pink-300 border-t-transparent rounded-full animate-spin" />
                </div>
              )}
 
              {/* Erro */}
              {error && (
                <div className="bg-red-50 border border-red-100 text-red-400 text-sm rounded-xl px-4 py-3 mb-4 flex items-center gap-2">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                    <path d="M12 8v4m0 4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  {error}
                </div>
              )}
 
              {/* Cards */}
              {!loading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {filtered.length === 0 && (
                    <div className="text-center py-20 text-gray-300 col-span-full">
                      <svg className="mx-auto mb-4" width="44" height="44" fill="none" viewBox="0 0 24 24">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
                          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      <p className="text-sm font-medium">Nenhum paciente encontrado</p>
                      <button
                        onClick={() => setModalOpen(true)}
                        className="mt-3 text-sm text-pink-400 hover:text-pink-600 font-medium transition-colors"
                      >
                        + Cadastrar primeiro paciente
                      </button>
                    </div>
                  )}
 
                  {filtered.map((patient, i) => (
                    <PacienteCard
                      key={patient.id}
                      patient={patient}
                      selected={selectedPatient?.id === patient.id}
                      onClick={() => handleSelect(patient)}
                      onAvatarClick={() => handleOpenNotes(patient)}
                      animationDelay={i * 35}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
 
      {/* Painel overlay do paciente selecionado */}
      {selectedPatient && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="h-full min-h-screen pt-12 pb-12">
            <PacientePainel
              patient={selectedPatient}
              appointments={appointments}
              loadingAppointments={false}
              onClose={() => {
                setSelectedPatient(null);
                setOpenNotes(false);
              }}
              onNewAppointment={() => console.log("Nova consulta")}
              onEdit={() => console.log("Editar paciente")}
              onSelectAppointment={handleSelectAppointment}
              onNotesUpdated={(notes) =>
                setSelectedPatient((prev) => (prev ? { ...prev, notes } : prev))
              }
              overlay
              initialNotesOpen={openNotes}
              onNotesClose={() => setOpenNotes(false)}
            />
          </div>
        </div>
      )}
 
      {/* Modal novo paciente */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Novo Paciente"
      >
        <NovoPacienteForm
          onSuccess={handleNewPatientSuccess}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
