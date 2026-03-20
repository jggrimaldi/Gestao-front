import { MouseEvent } from "react";
import { PatientResponse } from "../../types";
import Avatar from "../Avatar/Avatar";

interface PacienteCardProps {
  patient: PatientResponse;
  selected: boolean;
  onClick: () => void;
  onAvatarClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  animationDelay?: number;
}

export default function PacienteCard({
  patient,
  selected,
  onClick,
  onAvatarClick,
  animationDelay = 0,
}: PacienteCardProps) {
  return (
    <div
      id={`patient-card-${patient.id}`}
      onClick={onClick}
      className={`
        fade-up bg-white border-2 rounded-2xl p-4 cursor-pointer card-hover shadow-sm
        ${selected ? "border-pink-500 bg-pink-50 ring-2 ring-pink-100" : "border-pink-200 hover:border-pink-300"}
      `}
      style={{
        animationDelay: `${animationDelay}ms`,
        opacity: 0,
        animationFillMode: "forwards",
      }}
    >
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={(event: MouseEvent<HTMLButtonElement>) => {
            event.stopPropagation();
            onAvatarClick?.(event);
          }}
          className="rounded-full p-1 hover:bg-pink-100"
          aria-label="Abrir notas do paciente"
        >
          <Avatar name={patient.name} size="md" />
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="font-semibold text-gray-800 truncate">
              {patient.name}
            </span>
            <span className="text-xs text-gray-300 whitespace-nowrap">
              {patient.age} anos
            </span>
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-0.5">
            <span className="text-xs text-gray-400">{patient.cpf}</span>
            <span className="text-xs text-gray-200">·</span>
            <span className="text-xs text-gray-400">{patient.phone}</span>
          </div>
        </div>

        <svg
          className={`shrink-0 transition-transform duration-200 ${
            selected ? "rotate-90 text-pink-400" : "text-gray-200"
          }`}
          width="17"
          height="17"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            d="M9 18l6-6-6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
