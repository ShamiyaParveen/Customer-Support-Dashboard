# Customer Support Dashboard

Frontend technical assessment for a Customer Support Dashboard.

## Tech Stack

- React.js
- Vite
- Tailwind CSS
- Zustand
- Lucide React
- JSONPlaceholder REST API

## Features

- Dashboard statistics: Total, Open, In Progress, Resolved
- Working hash-based navigation for Dashboard, Tickets, Customers, and Settings
- Ticket search
- Filter by status
- Filter by priority
- Change ticket status
- Ticket detail side panel
- Customer information
- Customer directory with a shortcut to each customer's tickets
- Issue details
- Conversation/messages
- Loading, error and empty states
- Responsive desktop/mobile UI
- Reusable React components
- Zustand state management
- Mock/public REST API integration
- Offline fallback ticket data, so the app remains usable if the demo API is unavailable

## Run locally

```bash
npm install
npm run dev
```

Open the local URL shown by Vite.

## Production build

```bash
npm run build
npm run preview
```

## API

Ticket data is created by transforming public JSONPlaceholder posts/users into support-ticket objects. If that demo service is unavailable, the app automatically uses built-in mock ticket data. Status changes are handled locally with Zustand because the public demo API is read-only for this assessment.

## Navigation

The sidebar is fully functional. It also supports direct URLs and browser history:

- `#dashboard`
- `#tickets`
- `#customers`
- `#settings`

## AI Usage

AI assistance was used during development for code generation, component structuring, debugging guidance, and documentation. The submitted code should be understood and reviewed by the developer before submission.

