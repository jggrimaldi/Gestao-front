import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { PatientResponse, AppointmentResponse } from "../../types";
import Avatar from "../Avatar/Avatar";
import { formatDate, formatStatus } from "../../utils/helpers";
import { patientService } from "../../services/patientService";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

interface PacientePainelProps {
  patient: PatientResponse;
  appointments: AppointmentResponse[];
  loadingAppointments: boolean;
  onClose: () => void;
  onNewAppointment: () => void;
  onEdit: () => void;
  onSelectAppointment: (appointment: AppointmentResponse) => void;
  onNotesUpdated?: (notes: string) => void;
  overlay?: boolean;
  initialNotesOpen?: boolean;
  onNotesClose?: () => void;
}

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-50 text-yellow-600",
  FINISHED: "bg-green-50 text-green-600",
  CANCELED: "bg-red-50 text-red-400",
};

export default function PacientePainel({
  patient,
  appointments,
  loadingAppointments,
  onClose,
  onNewAppointment,
  onEdit,
  onSelectAppointment,
  onNotesUpdated,
  overlay = false,
  initialNotesOpen = false,
  onNotesClose,
}: PacientePainelProps) {
  const [showNotes, setShowNotes] = useState(false);
  const [noteText, setNoteText] = useState(patient.notes ?? "");
  const [imageUrl, setImageUrl] = useState(patient.imageUrl ?? "");
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);

  useEffect(() => {
    setShowNotes(Boolean(initialNotesOpen));
  }, [initialNotesOpen]);

  useEffect(() => {
    if (showNotes) {
      setNoteText(patient.notes ?? "");
    }
  }, [showNotes, patient.notes]);

  const noteCount = useMemo(() => uploadedImages.length, [uploadedImages]);

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    const fileArray = Array.from(files);
    setUploadedImages((prev) => [...prev, ...fileArray]);

    // usa o primeiro arquivo como imageUrl (temporário local) para enviar ao backend.
    if (fileArray.length > 0) {
      setImageUrl(URL.createObjectURL(fileArray[0]));
    }
  };

  const handleSaveNotes = async () => {
    if (!noteText.trim() && !imageUrl.trim()) {
      alert("Por favor, preencha notas ou informe URL de imagem.");
      return;
    }

    try {
      const updated = await patientService.updateNotes(
        patient.id,
        noteText,
        imageUrl,
      );
      setNoteText(updated.notes ?? "");
      setImageUrl(updated.imageUrl ?? "");
      onNotesUpdated?.(updated.notes ?? "");
      setShowNotes(false);
      onNotesClose?.();
    } catch (error: any) {
      console.error("Erro ao salvar notas", error);
      if (error.message === "Network Error") {
        alert(
          "Network Error: verifique se o backend está rodando em " +
            API_BASE_URL,
        );
      } else {
        alert("Erro ao salvar notas. Veja console para detalhes.");
      }
    }
  };

  return (
    <div
      id="patient-panel"
      className={`w-full shrink-0 slide-in ${
        overlay ? "max-w-3xl mx-auto" : "lg:w-80 xl:w-96"
      }`}
    >
      <div
        className={`bg-white rounded-2xl border-2 overflow-hidden shadow-sm ${
          overlay ? "border-pink-300" : "border-pink-200 sticky top-24"
        }`}
      >
        {/* Banner */}
        <div className="h-24 bg-linear-to-br from-pink-400 via-rose-300 to-fuchsia-300 relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-white/25 hover:bg-white/40 text-white rounded-full p-1.5 transition-colors"
          >
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Avatar */}
        <div className="flex justify-center -mt-8 px-5">
          <button
            type="button"
            onClick={() => setShowNotes(true)}
            className="rounded-full border-2 border-pink-200 p-1 hover:border-pink-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300"
          >
            <Avatar name={patient.name} size="lg" border />
          </button>
        </div>

        <div className="px-5 pt-3 pb-6">
          <h2 className="text-center font-bold text-gray-800 text-lg font-display">
            {patient.name}
          </h2>

          {/* Info grid */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            {[
              {
                label: "Idade",
                valor: patient.age ? `${patient.age} anos` : "—",
              },
              { label: "CPF", valor: patient.cpf },
              { label: "Telefone", valor: patient.phone },
              { label: "Notas", valor: patient.notes ?? "—" },
            ].map((item) => (
              <div key={item.label} className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-0.5">{item.label}</p>
                <p className="text-sm font-semibold text-gray-700 truncate">
                  {item.valor}
                </p>
              </div>
            ))}
          </div>

          {/* Consultas */}
          <div className="mt-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-700">Consultas</h3>
            </div>

            {loadingAppointments ? (
              <div className="text-center py-4">
                <div className="w-5 h-5 border-2 border-pink-300 border-t-transparent rounded-full animate-spin mx-auto" />
              </div>
            ) : appointments.length === 0 ? (
              <p className="text-xs text-gray-300 text-center py-4">
                Nenhuma consulta registrada
              </p>
            ) : (
              <div className="space-y-2">
                {appointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    onClick={() => onSelectAppointment(appointment)}
                    className="flex items-center gap-3 p-3 rounded-xl bg-pink-50 hover:bg-pink-100 cursor-pointer transition-colors group"
                  >
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
                      <svg
                        width="13"
                        height="13"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z"
                          stroke="#f472b6"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-700 font-medium truncate">
                        {appointment.title}
                      </p>
                      <p className="text-xs text-gray-400">
                        {formatDate(appointment.date)}
                      </p>
                    </div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[appointment.status]}`}
                    >
                      {formatStatus(appointment.status)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Ações */}
          <div className="flex gap-2 mt-5">
            <button
              onClick={onEdit}
              className="flex-1 py-2.5 border-2 border-pink-200 text-pink-500 rounded-xl text-sm font-semibold hover:bg-pink-50 transition-colors"
            >
              Editar
            </button>
            <button
              onClick={onNewAppointment}
              className="flex-1 py-2.5 bg-pink-500 hover:bg-pink-600 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm"
            >
              + Consulta
            </button>
          </div>
        </div>
      </div>

      {showNotes && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl border-2 border-pink-200 p-5 relative">
            <button
              type="button"
              onClick={() => {
                setShowNotes(false);
                onNotesClose?.();
              }}
              className="absolute top-3 right-3 text-pink-500 bg-pink-100 w-8 h-8 rounded-full flex items-center justify-center font-bold"
              aria-label="Fechar notas"
            >
              ×
            </button>
            <h3 className="mb-3 text-lg font-semibold text-gray-700">
              Notas de {patient.name}
            </h3>
            <textarea
              rows={6}
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              className="w-full resize-none border border-gray-200 rounded-xl p-3 text-sm text-gray-700 focus:outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-100"
              placeholder="Escreva notas do paciente..."
            />
            <div className="mt-3">
              <p className="text-sm text-gray-500 mb-1">
                Selecione uma imagem para enviar (a URL será gerada
                automaticamente). Caso queira usar apenas notas, não é
                necessário anexar imagem.
              </p>
              <label className="inline-flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={onImageChange}
                  className="hidden"
                />
                <span className="rounded-lg bg-pink-50 px-3 py-1.5 border border-pink-200 text-pink-600">
                  Adicionar fotos
                </span>
              </label>
              <p className="text-xs text-gray-400 mt-1">
                {noteCount} foto(s) selecionada(s)
              </p>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {uploadedImages.map((file, index) => (
                  <div
                    key={`${file.name}-${index}`}
                    className="h-20 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            {imageUrl && (
              <p className="text-xs text-green-600 mt-2">
                URL de imagem usada: {imageUrl}
              </p>
            )}

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setShowNotes(false)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveNotes}
                className="px-4 py-2 bg-pink-500 text-white rounded-lg text-sm hover:bg-pink-600"
              >
                Salvar notas
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
