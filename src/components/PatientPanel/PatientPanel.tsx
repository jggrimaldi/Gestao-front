import { PatientResponse, AppointmentResponse } from "../../types";
import Avatar from "../Avatar/Avatar";
import { formatDate, formatStatus } from "../../utils/helpers";

interface PacientePainelProps {
  patient: PatientResponse;
  appointments: AppointmentResponse[];
  loadingAppointments: boolean;
  onClose: () => void;
  onNewAppointment: () => void;
  onEdit: () => void;
  onSelectAppointment: (appointment: AppointmentResponse) => void;
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
}: PacientePainelProps) {
  return (
    <div className="w-full lg:w-80 xl:w-96 shrink-0 slide-in">
      <div className="bg-white rounded-2xl border-2 border-pink-100 overflow-hidden sticky top-24 shadow-sm">
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
          <Avatar name={patient.name} size="lg" border />
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
    </div>
  );
}
