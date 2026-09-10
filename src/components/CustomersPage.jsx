import { Building2, ChevronRight, Mail, Ticket, UserRound } from "lucide-react";
import { useMemo } from "react";

export default function CustomersPage({ tickets, loading, search, onShowTickets }) {
  const customers = useMemo(() => {
    const grouped = new Map();

    tickets.forEach((ticket) => {
      const key = ticket.email.toLowerCase();
      const existing = grouped.get(key);

      if (existing) {
        existing.ticketCount += 1;
        existing.openCount += ticket.status !== "Resolved" ? 1 : 0;
        if (new Date(ticket.createdAt) > new Date(existing.latestTicket.createdAt)) {
          existing.latestTicket = ticket;
        }
        return;
      }

      grouped.set(key, {
        name: ticket.customer,
        email: ticket.email,
        phone: ticket.phone,
        company: ticket.company || "Independent",
        ticketCount: 1,
        openCount: ticket.status !== "Resolved" ? 1 : 0,
        latestTicket: ticket
      });
    });

    return [...grouped.values()].sort((a, b) => b.ticketCount - a.ticketCount || a.name.localeCompare(b.name));
  }, [tickets]);

  const query = search.trim().toLowerCase();
  const filteredCustomers = customers.filter((customer) =>
    !query || [customer.name, customer.email, customer.company].some((value) => value.toLowerCase().includes(query))
  );

  if (loading) {
    return (
      <section>
        <div className="mb-6">
          <p className="text-sm font-medium text-brand-600">Directory</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Customers</h1>
          <p className="mt-2 text-sm text-slate-500">Review customers and their support activity.</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-brand-600" />
          <p className="mt-4 text-sm font-medium text-slate-600">Loading customers...</p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="mb-6">
        <p className="text-sm font-medium text-brand-600">Directory</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Customers</h1>
        <p className="mt-2 text-sm text-slate-500">Review customers and their support activity.</p>
      </div>

      <div className="mb-4 flex items-center gap-2 text-sm text-slate-500">
        <UserRound size={17} className="text-brand-600" />
        {filteredCustomers.length} customer{filteredCustomers.length === 1 ? "" : "s"} shown
      </div>

      {!filteredCustomers.length ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <p className="font-semibold text-slate-800">No customers found</p>
          <p className="mt-1 text-sm text-slate-500">Try a different name, email, or company.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredCustomers.map((customer) => (
            <article key={customer.email} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-sm font-bold text-brand-700">
                    {customer.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}
                  </div>
                  <h2 className="mt-4 truncate text-base font-bold text-slate-900">{customer.name}</h2>
                  <p className="mt-1 flex items-center gap-1.5 truncate text-sm text-slate-500">
                    <Mail size={14} className="shrink-0" />
                    {customer.email}
                  </p>
                  <p className="mt-2 flex items-center gap-1.5 truncate text-sm text-slate-500">
                    <Building2 size={14} className="shrink-0" />
                    {customer.company}
                  </p>
                </div>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                  {customer.ticketCount} ticket{customer.ticketCount === 1 ? "" : "s"}
                </span>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                <p className="flex items-center gap-1.5 text-sm text-slate-500">
                  <Ticket size={15} className="text-brand-600" />
                  {customer.openCount} active
                </p>
                <button
                  type="button"
                  onClick={() => onShowTickets(customer.email)}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700"
                >
                  View tickets <ChevronRight size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
