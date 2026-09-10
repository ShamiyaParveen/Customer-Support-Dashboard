# Customer Support Dashboard

A responsive customer-support workspace for reviewing, prioritising, and resolving customer requests. It gives support teams a focused view of ticket activity, customer context, and conversations.

## Project links

- **GitHub repository:** [Customer-Support-Dashboard](https://github.com/ShamiyaParveen/Customer-Support-Dashboard)
- **Live demo:** (https://customer-support-dashboard-vert.vercel.app/)

## Features

- Dashboard summary cards for total, open, in-progress, and resolved tickets
- Ticket table with customer name, subject, priority, status, and created date
- Search tickets by ticket ID, customer, email, or subject
- Filter tickets by status and priority
- Update ticket status directly from the table or ticket details panel
- Ticket-details side panel with customer information, issue details, date/time, priority, status, and conversation history
- Customer directory with customer search and shortcuts to their tickets
- Loading, error, and empty states
- Responsive sidebar and layouts for desktop and mobile devices
- Hash-based navigation for Dashboard, Tickets, Customers, and Settings
- Browser-saved settings preferences

## Tech stack

- React 18 and Vite
- Tailwind CSS
- Zustand for ticket state management
- Lucide React for icons
- JSONPlaceholder public REST API, with built-in fallback data for offline/API-failure use

## Getting started

### Prerequisites

- Node.js 18 or newer
- npm

### Installation

```bash
git clone https://github.com/ShamiyaParveen/Customer-Support-Dashboard.git
cd Customer-Support-Dashboard
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## Available commands

```bash
# Start the development server
npm run dev

# Create a production build
npm run build

# Preview the production build locally
npm run preview
```

## Data and state management

On first load, the app requests posts and users from JSONPlaceholder and converts them into support tickets. If the public API is unavailable or times out, it automatically uses bundled mock ticket data so the dashboard remains usable.

Zustand manages ticket loading, errors, and status updates. Ticket-status changes are kept in the current browser session; settings preferences are saved in `localStorage`.

## Routes

The app uses hash-based routes, so the following URLs can be opened directly:

- `#dashboard`
- `#tickets`
- `#customers`
- `#settings`

## AI usage

OpenAI Codex was used for development assistance, including implementation guidance, component structure, debugging, and this documentation. The code was reviewed to ensure its behavior is understood.