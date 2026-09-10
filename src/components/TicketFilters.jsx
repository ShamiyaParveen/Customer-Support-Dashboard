import { SlidersHorizontal } from "lucide-react";

export default function TicketFilters({
  status,
  setStatus,
  priority,
  setPriority
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
        <SlidersHorizontal size={17} />
        Filters
      </div>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500"
      >
        <option value="All">All statuses</option>
        <option value="Open">Open</option>
        <option value="In Progress">In Progress</option>
        <option value="Resolved">Resolved</option>
      </select>

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500"
      >
        <option value="All">All priorities</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
    </div>
  );
}