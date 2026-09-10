import { Bell, Menu, Search } from "lucide-react";

export default function Header({ onMenuClick, search, setSearch, placeholder, showSearch = true }) {
  return (
    <header className="sticky top-0 z-20 flex h-20 items-center gap-4 border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6">
      <button
        onClick={onMenuClick}
        className="rounded-xl border border-slate-200 p-2.5 text-slate-600 lg:hidden"
        aria-label="Open navigation"
      >
        <Menu size={20} />
      </button>

      <div className="max-w-xl flex-1">
        {showSearch && (
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={placeholder}
              aria-label={placeholder}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
            />
          </div>
        )}
      </div>

      <button className="relative rounded-xl border border-slate-200 p-2.5 text-slate-600 hover:bg-slate-50">
        <Bell size={19} />
        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
      </button>

      <div className="hidden items-center gap-3 sm:flex">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
          SP
        </div>
        <div className="hidden md:block">
          <p className="text-sm font-semibold text-slate-800">Support Admin</p>
          <p className="text-xs text-slate-400">Administrator</p>
        </div>
      </div>
    </header>
  );
}
