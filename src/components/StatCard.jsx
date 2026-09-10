import { CheckCircle2, Clock3, Inbox, Ticket } from "lucide-react";

const icons = {
  total: Ticket,
  open: Inbox,
  progress: Clock3,
  resolved: CheckCircle2
};

export default function StatCard({ type, label, value, onClick }) {
  const Icon = icons[type];

  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-brand-500/10"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{value}</p>
        </div>
        <div className="rounded-xl bg-brand-50 p-3 text-brand-600">
          <Icon size={21} />
        </div>
      </div>
    </button>
  );
}
