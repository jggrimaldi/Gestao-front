import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { dentist, logout } = useAuth();
  const navigate = useNavigate();

  const displayName = dentist?.name ?? "Emylle";
  const displayEmail = dentist?.email ?? "emylle@clinica.com";
  const displayCro = dentist?.cro ?? "CRO: 12345-SP";

  const handleLogout = () => {
    logout();
    navigate("/login");
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
          fixed top-0 left-0 h-full w-64 bg-pink-100 border-r border-pink-200 shadow-lg z-50 transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:z-auto lg:shadow-none lg:border-r-0 lg:w-64 lg:min-h-screen
        `}
      >
        <div className="p-6">
          {/* Botão fechar para mobile */}
          <button
            onClick={onClose}
            className="lg:hidden absolute top-4 right-4 text-pink-400 hover:text-pink-600"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* Foto e info da dentista */}
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 mb-4 rounded-full overflow-hidden border-4 border-white shadow">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100&q=80"
                alt={displayName}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-lg font-bold text-gray-800 font-display">
              DR. {displayName}
            </h2>
            <p className="text-sm text-gray-500 mt-1">Dentista Especialista</p>
            <p className="text-xs text-gray-400 mt-2">{displayCro}</p>
          </div>

          {/* Menu ou outras infos */}
          <div className="mt-8 space-y-2">
            <div className="text-sm text-gray-600">
              <p>📧 {displayEmail}</p>
              <p>📞 (81) 99876-5432</p>
            </div>

            <button
              onClick={handleLogout}
              className="w-full mt-4 rounded-lg bg-pink-400 text-white py-2 hover:bg-pink-500 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
