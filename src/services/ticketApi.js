const POSTS_URL = "https://jsonplaceholder.typicode.com/posts?_limit=12";
const USERS_URL = "https://jsonplaceholder.typicode.com/users";

const priorities = ["Low", "Medium", "High"];
const statuses = ["Open", "In Progress", "Resolved"];

const fallbackCases = [
  ["Leanne Graham", "leanne.graham@example.com", "+91 98765 12001", "April Solutions", "Unable to update billing details", "I need help updating the billing address for our account."],
  ["Ervin Howell", "ervin.howell@example.com", "+91 98765 12002", "Howell Systems", "Invoice is missing from the billing portal", "The latest invoice is not visible in the billing portal."],
  ["Clementine Bauch", "clementine.bauch@example.com", "+91 98765 12003", "Clementine Labs", "Password reset link has expired", "The password reset email link expires before I can use it."],
  ["Patricia Lebsack", "patricia.lebsack@example.com", "+91 98765 12004", "Lebsack Group", "Cannot add a new team member", "I receive an error whenever I invite a teammate."],
  ["Chelsey Dietrich", "chelsey.dietrich@example.com", "+91 98765 12005", "Dietrich Design", "Exported report has incorrect totals", "The totals in the CSV export do not match the dashboard."],
  ["Mrs. Dennis Schulist", "dennis.schulist@example.com", "+91 98765 12006", "Schulist & Co.", "Need help changing subscription plan", "Could you help me move our workspace to the annual plan?"],
  ["Kurtis Weissnat", "kurtis.weissnat@example.com", "+91 98765 12007", "Weissnat Studio", "Two-factor code is not arriving", "I have not received a verification code on my registered device."],
  ["Nicholas Runolfsdottir", "nicholas.runolfsdottir@example.com", "+91 98765 12008", "Runolfsdottir Media", "Dashboard is slow to load", "The dashboard takes more than a minute to load after signing in."],
  ["Glenna Reichert", "glenna.reichert@example.com", "+91 98765 12009", "Reichert Retail", "Account access needed for a colleague", "Please help us give a colleague access to the support workspace."],
  ["Clementina DuBuque", "clementina.dubique@example.com", "+91 98765 12010", "DuBuque Digital", "Customer email notifications are delayed", "Our customers receive notification emails several hours late."],
  ["Leanne Graham", "leanne.graham@example.com", "+91 98765 12001", "April Solutions", "Question about ticket assignment rules", "Can ticket assignment rules be restricted by support region?"],
  ["Ervin Howell", "ervin.howell@example.com", "+91 98765 12002", "Howell Systems", "Request to archive old tickets", "We need to archive tickets from a completed project."]
];

export async function fetchTickets() {
  try {
    const [posts, users] = await Promise.all([requestJson(POSTS_URL), requestJson(USERS_URL)]);
    return posts.map((post, index) => {
      const user = users[post.userId - 1] || users[index % users.length];
      return createTicket({
        id: post.id,
        index,
        customer: user.name,
        email: user.email,
        phone: user.phone,
        company: user.company?.name || "Independent",
        subject: post.title.replace(/^\w/, (character) => character.toUpperCase()),
        description: post.body.replace(/\n/g, " ")
      });
    });
  } catch {
    // The dashboard remains fully usable when the public demo API is offline.
    return fallbackCases.map(([customer, email, phone, company, subject, description], index) =>
      createTicket({ id: index + 1, index, customer, email, phone, company, subject, description })
    );
  }
}

async function requestJson(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error("Ticket service request failed");
    return response.json();
  } finally {
    clearTimeout(timeout);
  }
}

function createTicket({ id, index, customer, email, phone, company, subject, description }) {
  const createdAt = new Date(Date.now() - index * 2 * 86400000).toISOString();
  const status = statuses[index % statuses.length];

  return {
    id: `TKT-${String(id).padStart(4, "0")}`,
    customer,
    email,
    phone,
    company,
    subject,
    description,
    priority: priorities[index % priorities.length],
    status,
    createdAt,
    messages: [
      {
        sender: customer,
        role: "Customer",
        text: description,
        time: "10:14 AM"
      },
      {
        sender: "Support Team",
        role: "Agent",
        text: status === "Resolved" ? "This has been resolved. Please let us know if you need anything else." : "Thanks for reaching out. We are reviewing the details and will update you shortly.",
        time: "10:32 AM"
      }
    ]
  };
}
