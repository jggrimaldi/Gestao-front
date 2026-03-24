import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FiLogOut, FiEdit2, FiMail, FiX } from "react-icons/fi"; // Ícones profissionais

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { dentist, logout } = useAuth();
  const navigate = useNavigate();

  const displayName = dentist?.name ?? "Emylle";
  const displayEmail = dentist?.email ?? "emylle@clinica.com";
  const displayCro = dentist?.cro ?? "12345-SP";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleEditProfile = () => {
    // Aqui você navegaria para a rota de edição ou abriria um modal
    navigate("/perfil/editar");
  };

  return (
    <>
      {/* Overlay para mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-white border-r border-pink-100 shadow-lg z-50 transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:z-auto lg:shadow-none lg:w-64 lg:min-h-screen flex flex-col
        `}
      >
        <div className="p-6 grow">
          {/* Botão fechar para mobile */}
          <button
            onClick={onClose}
            className="lg:hidden absolute top-4 right-4 text-pink-400 hover:text-pink-600"
          >
            <FiX size={24} />
          </button>

          {/* Card de Info da Dentista */}
          <div className="flex flex-col items-center text-center bg-pink-50 rounded-2xl p-4 border border-pink-100 shadow-sm">
            <div className="w-20 h-20 mb-3 rounded-full overflow-hidden border-4 border-white shadow-sm relative">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=100&h=100&q=80"
                alt={displayName}
                className="w-full h-full object-cover"
              />
            </div>
            
            <h2 className="text-md font-bold text-gray-800 uppercase tracking-tight">
              Dra. {displayName}
            </h2>
            <p className="text-xs text-pink-500 font-semibold mb-1">Dentista Especialista</p>
            <p className="text-[10px] text-gray-400 bg-white px-2 py-0.5 rounded-full border border-pink-100">
              CRO: {displayCro}
            </p>

            {/* BOTÃO EDITAR DADOS */}
            <button
              onClick={handleEditProfile}
              className="mt-4 w-full flex items-center justify-center gap-2 py-2 bg-white border border-pink-200 text-pink-600 rounded-xl hover:bg-pink-100 transition-all font-bold text-xs shadow-sm"
            >
              <FiEdit2 size={14} />
              Editar Perfil
            </button>
          </div>

          {/* Outras Informações (E-mail) */}
          <div className="mt-6 px-2">
             <div className="flex items-center gap-3 text-gray-500 text-sm">
                <FiMail className="text-pink-400" />
                <span className="truncate">{displayEmail}</span>
             </div>
          </div>
        </div>

        {/* SEÇÃO INFERIOR: BOTÃO LOGOUT MELHORADO */}
        <div className="p-4 border-t border-pink-50 bg-gray-50/50">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all group"
          >
            <div className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center group-hover:bg-red-100 transition-colors">
              <FiLogOut className="text-gray-500 group-hover:text-red-500" size={18} />
            </div>
            <span className="font-bold text-sm tracking-wide">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}