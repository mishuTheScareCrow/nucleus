# Nucleus

Nucleus is an AI-powered Study OS built with the latest web technologies to help students organize their academic life, prioritize tasks intelligently, and maintain focus.

## 🚀 Tech Stack

*   **Framework:** [Next.js 16+](https://nextjs.org/) (App Router, Turbopack)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
*   **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
*   **Database:** [PostgreSQL](https://www.postgresql.org/) (via [Neon](https://neon.tech/))
*   **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
*   **Authentication:** [Better Auth](https://better-auth.com/)
*   **Emails:** [Resend](https://resend.com/)

## ✨ Features

*   **Smart Prioritization:** Tasks are automatically scored based on urgency (due date), effort (estimated minutes), and your energy level.
*   **Pomodoro Focus Timer:** Integrated timer with customizable durations, progress rings, and sound effects (Web Audio API).
*   **Magic Link Auth:** Passwordless login via email or Google OAuth.
*   **Daily Timeline:** Visual horizontal schedule of your planned focus blocks.
*   **Analytics:** Track your focus streak, total study hours, and subject breakdown.
*   **PDF Export:** Download your daily plan as a beautifully formatted PDF.
*   **Dark Mode:** Fully supported with system sync.

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/nucleus.git
cd nucleus
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Environment Variables

Create a `.env` file in the root directory:

```env
# Database (Neon Postgres)
DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"

# Authentication (Better Auth)
BETTER_AUTH_SECRET="your-generated-secret" # Generate with: openssl rand -base64 32
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Email (Resend)
RESEND_API_KEY="re_123..."

# OAuth (Google)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 4. Initialize Database

Push the schema to your Neon database:

```bash
npx drizzle-kit push
```

*Note: If this is your first time, this will create the `user`, `session`, `account`, `verification`, `tasks`, and `user_settings` tables.*

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## 📂 Project Structure

*   `app/`: Next.js App Router pages and layouts.
    *   `api/`: API routes (auth handler).
    *   `dashboard/`: Protected application routes (Tasks, Analytics, Settings).
*   `components/`: Reusable UI components (Timer, Charts, PDF).
    *   `ui/`: shadcn/ui primitives.
*   `db/`: Drizzle ORM schema and connection setup.
*   `lib/`: Utility functions (auth config, priority logic).
*   `hooks/`: Custom React hooks (audio, etc).
*   `proxy.ts`: Next.js Middleware (renamed from middleware.ts in Next.js 16).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
