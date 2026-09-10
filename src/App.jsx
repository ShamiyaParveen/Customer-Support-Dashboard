import { useEffect, useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StatCard from "./components/StatCard";
import TicketFilters from "./components/TicketFilters";
import TicketTable from "./components/TicketTable";
import TicketDetails from "./components/TicketDetails";
import CustomersPage from "./components/CustomersPage";
import SettingsPage from "./components/SettingsPage";
import { useTicketStore } from "./store/ticketStore";

const pages = new Set(["dashboard", "tickets", "customers", "settings"]);

function pageFromHash() {
  const page = window.location.hash.replace("#", "").toLowerCase();
  return pages.has(page) ? page : "dashboard";
}

export default function App() {
  const { tickets, loading, error, loadTickets, updateStatus } = useTicketStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [activePage, setActivePage] = useState(pageFromHash);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [priority, setPriority] = useState("All");

  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  useEffect(() => {
    const syncPageWithUrl = () => setActivePage(pageFromHash());
    window.addEventListener("hashchange", syncPageWithUrl);
    return () => window.removeEventListener("hashchange", syncPageWithUrl);
  }, []);

  useEffect(() => {
    if (selectedTicket) {
      const updated = tickets.find((ticket) => ticket.id === selectedTicket.id);
      if (updated) setSelectedTicket(updated);
    }
  }, [tickets, selectedTicket]);

  const stats = useMemo(() => ({
    total: tickets.length,
    open: tickets.filter((ticket) => ticket.status === "Open").length,
    progress: tickets.filter((ticket) => ticket.status === "In Progress").length,
    resolved: tickets.filter((ticket) => ticket.status === "Resolved").length
  }), [tickets]);

  const filteredTickets = useMemo(() => {
    const query = search.trim().toLowerCase();
    return tickets.filter((ticket) => {
      const matchesSearch = !query || [ticket.id, ticket.customer, ticket.email, ticket.subject]
        .some((value) => value.toLowerCase().includes(query));
      const matchesStatus = status === "All" || ticket.status === status;
      const matchesPriority = priority === "All" || ticket.priority === priority;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tickets, search, status, priority]);

  const navigate = (page) => {
    const nextPage = pages.has(page) ? page : "dashboard";
    setActivePage(nextPage);
    if (window.location.hash !== `#${nextPage}`) window.location.hash = nextPage;
  };

  const showTicketsForCustomer = (email) => {
    setSearch(email);
    setStatus("All");
    setPriority("All");
    navigate("tickets");
  };

  const showTicketsForStatus = (nextStatus) => {
    setStatus(nextStatus);
    setPriority("All");
    setSearch("");
    navigate("tickets");
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} activePage={activePage} onNavigate={navigate} />

      <div className="min-w-0 flex-1">
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          search={search}
          setSearch={setSearch}
          placeholder={activePage === "customers" ? "Search customers..." : "Search tickets, customers..."}
          showSearch={activePage !== "settings"}
        />

        <main className="mx-auto max-w-[1500px] p-4 sm:p-6 lg:p-8">
          {activePage === "dashboard" && (
            <DashboardPage
              stats={stats}
              loading={loading}
              error={error}
              filteredTickets={filteredTickets}
              status={status}
              setStatus={setStatus}
              priority={priority}
              setPriority={setPriority}
              onOpen={setSelectedTicket}
              onStatusChange={updateStatus}
              onRefresh={loadTickets}
              onViewStatus={showTicketsForStatus}
            />
          )}

          {activePage === "tickets" && (
            <TicketsPage
              loading={loading}
              error={error}
              filteredTickets={filteredTickets}
              status={status}
              setStatus={setStatus}
              priority={priority}
              setPriority={setPriority}
              onOpen={setSelectedTicket}
              onStatusChange={updateStatus}
              onRefresh={loadTickets}
            />
          )}

          {activePage === "customers" && <CustomersPage tickets={tickets} loading={loading} search={search} onShowTickets={showTicketsForCustomer} />}
          {activePage === "settings" && <SettingsPage />}
        </main>
      </div>

      <TicketDetails ticket={selectedTicket} onClose={() => setSelectedTicket(null)} onStatusChange={updateStatus} />
    </div>
  );
}

function DashboardPage({ stats, loading, error, filteredTickets, status, setStatus, priority, setPriority, onOpen, onStatusChange, onRefresh, onViewStatus }) {
  return (
    <>
      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-brand-600">Overview</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Customer Support Dashboard</h1>
          <p className="mt-2 text-sm text-slate-500">View and manage customer support tickets.</p>
        </div>
        <RefreshButton loading={loading} onClick={onRefresh} />
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Ticket statistics">
        <StatCard type="total" label="Total Tickets" value={stats.total} onClick={() => onViewStatus("All")} />
        <StatCard type="open" label="Open" value={stats.open} onClick={() => onViewStatus("Open")} />
        <StatCard type="progress" label="In Progress" value={stats.progress} onClick={() => onViewStatus("In Progress")} />
        <StatCard type="resolved" label="Resolved" value={stats.resolved} onClick={() => onViewStatus("Resolved")} />
      </section>

      <TicketList
        className="mt-7"
        title="Support Tickets"
        loading={loading}
        error={error}
        tickets={filteredTickets}
        status={status}
        setStatus={setStatus}
        priority={priority}
        setPriority={setPriority}
        onOpen={onOpen}
        onStatusChange={onStatusChange}
        onRetry={onRefresh}
      />
    </>
  );
}

function TicketsPage({ loading, error, filteredTickets, status, setStatus, priority, setPriority, onOpen, onStatusChange, onRefresh }) {
  return (
    <>
      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-brand-600">Support workspace</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Tickets</h1>
          <p className="mt-2 text-sm text-slate-500">Search, filter, and update customer requests.</p>
        </div>
        <RefreshButton loading={loading} onClick={onRefresh} />
      </div>

      <TicketList
        title="All Support Tickets"
        loading={loading}
        error={error}
        tickets={filteredTickets}
        status={status}
        setStatus={setStatus}
        priority={priority}
        setPriority={setPriority}
        onOpen={onOpen}
        onStatusChange={onStatusChange}
        onRetry={onRefresh}
      />
    </>
  );
}

function TicketList({ className = "", title, loading, error, tickets, status, setStatus, priority, setPriority, onOpen, onStatusChange, onRetry }) {
  return (
    <section className={className}>
      <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">{title}</h2>
          <p className="mt-1 text-sm text-slate-500">{tickets.length} ticket{tickets.length === 1 ? "" : "s"} shown</p>
        </div>
        <TicketFilters status={status} setStatus={setStatus} priority={priority} setPriority={setPriority} />
      </div>

      {loading && <LoadingState />}
      {!loading && error && <ErrorState onRetry={onRetry} error={error} />}
      {!loading && !error && <TicketTable tickets={tickets} onOpen={onOpen} onStatusChange={onStatusChange} />}
    </section>
  );
}

function RefreshButton({ loading, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-60"
    >
      <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
      Refresh
    </button>
  );
}

function LoadingState() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
      <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-brand-600" />
      <p className="mt-4 text-sm font-medium text-slate-600">Loading tickets...</p>
    </div>
  );
}

function ErrorState({ error, onRetry }) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
      <p className="font-semibold text-red-800">Something went wrong</p>
      <p className="mt-1 text-sm text-red-700">{error}</p>
      <button type="button" onClick={onRetry} className="mt-4 rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white">Try again</button>
    </div>
  );
}
