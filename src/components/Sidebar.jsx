import { BarChart3, Inbox, Settings, Users, X } from "lucide-react";

const navigation = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "tickets", label: "Tickets", icon: Inbox },
  { id: "customers", label: "Customers", icon: Users },
  { id: "settings", label: "Settings", icon: Settings }
];

export default function Sidebar({ open, onClose, activePage, onNavigate }) {
  const handleNavigate = (page) => {
    onNavigate(page);
    onClose();
  };

  return (
    <>
      {open && (
        <button
          aria-label="Close navigation"
          className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-slate-950 text-white transition-transform duration-200 lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <div>
            <p className="text-lg font-bold tracking-tight">SupportDesk</p>
            <p className="text-xs text-slate-400">Customer support</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-2 hover:bg-white/10 lg:hidden">
            <X size={20} />
          </button>
        </div>

        <nav aria-label="Main navigation" className="flex-1 space-y-2 px-4 py-6">
          {navigation.map(({ id, label, icon: Icon }) => (
            <NavItem
              key={id}
              icon={<Icon size={19} />}
              label={label}
              active={activePage === id}
              onClick={() => handleNavigate(id)}
            />
          ))}
        </nav>

        <div className="border-t border-white/10 p-4">
          <div className="rounded-xl bg-white/5 p-3">
            <p className="text-xs font-medium text-slate-300">Support team</p>
            <p className="mt-1 text-sm font-semibold">12 agents online</p>
          </div>
        </div>
      </aside>
    </>
  );
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
        active
          ? "bg-brand-600 text-white shadow-lg shadow-brand-600/20"
          : "text-slate-400 hover:bg-white/5 hover:text-white"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
