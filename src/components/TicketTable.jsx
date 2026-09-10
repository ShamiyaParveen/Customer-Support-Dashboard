import { ChevronRight } from "lucide-react";

const priorityStyles = {
  High: "bg-red-50 text-red-700 ring-red-600/10",
  Medium: "bg-amber-50 text-amber-700 ring-amber-600/10",
  Low: "bg-emerald-50 text-emerald-700 ring-emerald-600/10"
};

const statusStyles = {
  Open: "bg-blue-50 text-blue-700 ring-blue-600/10",
  "In Progress": "bg-violet-50 text-violet-700 ring-violet-600/10",
  Resolved: "bg-emerald-50 text-emerald-700 ring-emerald-600/10"
};

export default function TicketTable({ tickets, onOpen, onStatusChange }) {
  if (!tickets.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
        <p className="font-semibold text-slate-800">No tickets found</p>
        <p className="mt-1 text-sm text-slate-500">Try changing your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] text-left">
          <thead className="border-b border-slate-200 bg-slate-50/70">
            <tr>
              {["Ticket", "Customer", "Priority", "Status", "Created", ""].map((heading) => (
                <th key={heading} className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="group hover:bg-slate-50/70">
                <td className="px-5 py-4">
                  <button onClick={() => onOpen(ticket)} className="text-left">
                    <p className="text-xs font-semibold text-brand-600">{ticket.id}</p>
                    <p className="mt-1 max-w-xs truncate text-sm font-semibold text-slate-800">{ticket.subject}</p>
                  </button>
                </td>
                <td className="px-5 py-4">
                  <p className="text-sm font-medium text-slate-800">{ticket.customer}</p>
                  <p className="mt-0.5 text-xs text-slate-400">{ticket.email}</p>
                </td>
                <td className="px-5 py-4">
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${priorityStyles[ticket.priority]}`}>
                    {ticket.priority}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <select
                    value={ticket.status}
                    onChange={(e) => onStatusChange(ticket.id, e.target.value)}
                    className={`rounded-full border-0 px-2.5 py-1.5 text-xs font-semibold outline-none ring-1 ring-inset ${statusStyles[ticket.status]}`}
                  >
                    <option>Open</option>
                    <option>In Progress</option>
                    <option>Resolved</option>
                  </select>
                </td>
                <td className="px-5 py-4 text-sm text-slate-500">
                  {new Date(ticket.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                  })}
                </td>
                <td className="px-5 py-4">
                  <button onClick={() => onOpen(ticket)} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700">
                    <ChevronRight size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}