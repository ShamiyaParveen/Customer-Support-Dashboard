import { CalendarDays, Mail, Phone, UserRound, X } from "lucide-react";

const statusStyles = {
  Open: "bg-blue-50 text-blue-700",
  "In Progress": "bg-violet-50 text-violet-700",
  Resolved: "bg-emerald-50 text-emerald-700"
};

const priorityStyles = {
  High: "bg-red-50 text-red-700",
  Medium: "bg-amber-50 text-amber-700",
  Low: "bg-emerald-50 text-emerald-700"
};

export default function TicketDetails({ ticket, onClose, onStatusChange }) {
  if (!ticket) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button onClick={onClose} className="absolute inset-0 bg-slate-950/40" aria-label="Close ticket details" />

      <aside className="relative z-10 flex h-full w-full max-w-xl flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <p className="text-xs font-semibold text-brand-600">{ticket.id}</p>
            <h2 className="mt-1 text-lg font-bold text-slate-900">Ticket details</h2>
          </div>
          <button onClick={onClose} className="rounded-xl p-2 text-slate-500 hover:bg-slate-100">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          <h3 className="text-xl font-bold leading-snug text-slate-900">{ticket.subject}</h3>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[ticket.status]}`}>
              {ticket.status}
            </span>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${priorityStyles[ticket.priority]}`}>
              {ticket.priority} priority
            </span>
          </div>

          <section className="mt-7 rounded-2xl border border-slate-200 p-4">
            <h4 className="font-semibold text-slate-900">Customer information</h4>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Info icon={<UserRound size={16} />} text={ticket.customer} />
              <Info icon={<Mail size={16} />} text={ticket.email} />
              <Info icon={<Phone size={16} />} text={ticket.phone} />
              <Info icon={<CalendarDays size={16} />} text={new Date(ticket.createdAt).toLocaleString("en-IN")} />
            </div>
          </section>

          <section className="mt-5 rounded-2xl border border-slate-200 p-4">
            <h4 className="font-semibold text-slate-900">Issue details</h4>
            <p className="mt-3 text-sm leading-6 text-slate-600">{ticket.description}</p>
          </section>

          <section className="mt-5">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-slate-900">Conversation</h4>
              <select
                value={ticket.status}
                onChange={(e) => onStatusChange(ticket.id, e.target.value)}
                className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium outline-none focus:border-brand-500"
              >
                <option>Open</option>
                <option>In Progress</option>
                <option>Resolved</option>
              </select>
            </div>

            <div className="mt-4 space-y-4">
              {ticket.messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "Agent" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[88%] rounded-2xl px-4 py-3 ${
                    message.role === "Agent" ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-700"
                  }`}>
                    <div className="flex items-center justify-between gap-5">
                      <p className="text-xs font-semibold">{message.sender}</p>
                      <span className={`text-[10px] ${message.role === "Agent" ? "text-brand-100" : "text-slate-400"}`}>
                        {message.time}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-5">{message.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </aside>
    </div>
  );
}

function Info({ icon, text }) {
  return (
    <div className="flex min-w-0 items-center gap-2.5 text-sm text-slate-600">
      <span className="shrink-0 text-slate-400">{icon}</span>
      <span className="truncate">{text}</span>
    </div>
  );
}