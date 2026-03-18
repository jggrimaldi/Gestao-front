export default function Header() {
  return (
    <header className="bg-white border-b border-pink-100 px-5 py-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-pink-500 rounded-xl flex items-center justify-center shadow-sm">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 21.7C17.3 17 22 13.6 22 9.5A5.5 5.5 0 0 0 12 6.1 5.5 5.5 0 0 0 2 9.5c0 4.1 4.7 7.5 10 12.2z"
              fill="white"
            />
          </svg>
        </div>
        <span className="font-display text-xl text-gray-800">
          Grimaldi <span className="text-pink-500">A.</span>
        </span>
      </div>
 
      <div className="flex items-center gap-3">
        <span className="hidden sm:block text-sm text-gray-400 font-medium">Dra. Emylle</span>
        <button className="w-9 h-9 rounded-full bg-pink-50 border border-pink-100 flex items-center justify-center hover:bg-pink-100 transition-colors">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="#f472b6" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </header>
  );
}