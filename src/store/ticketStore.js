import { create } from "zustand";
import { fetchTickets } from "../services/ticketApi";

export const useTicketStore = create((set) => ({
  tickets: [],
  loading: false,
  error: null,

  loadTickets: async () => {
    set({ loading: true, error: null });

    try {
      const tickets = await fetchTickets();
      set({ tickets, loading: false });
    } catch (error) {
      set({
        loading: false,
        error: error.message || "Unable to load tickets."
      });
    }
  },

  updateStatus: (ticketId, status) =>
    set((state) => ({
      tickets: state.tickets.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, status } : ticket
      )
    }))
}));