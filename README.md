# Tatreez Design Studio

A web-based tool for creating and managing Palestinian embroidery (tatreez) patterns. This repository contains the backend infrastructure, authentication, and dashboard — built as a working prototype using the production tech stack.

---

## Features

### Authentication
- Email and password sign up / sign in
- Community member detection — users signing up with a recognized email are automatically flagged and shown a 50% discount badge
- Forgot password flow via email verification code (magic code)
- Secure sessions managed through InstantDB

### Design Dashboard
- Grid view of all designs with name and last modified date
- Create new designs with a generated default name and timestamp
- Sort designs by recently modified, oldest, or A–Z
- Empty state with a prompt to create a first design

### Design View
- Inline name editing — click the title to edit
- Auto-saves to the database with a 2-second debounce
- Save status indicator that follows the cursor (Saving / Saved / Save failed)
- Returns to dashboard via Home button

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Database | InstantDB |
| Auth | Custom bcrypt + InstantDB sessions |
| Styling | Tailwind CSS v4 |
| Hosting | Netlify |
| Language | TypeScript |

---

## Project Structure

```
app/
  (auth)/           # Login, signup, forgot password
  api/auth/         # Login, signup, forgot-password, reset-password endpoints
  dashboard/        # Main dashboard page
  design/[id]/      # Design view page
components/
  dashboard/        # Header, Sidebar, DesignCard, EmptyState
  Auth*/            # Shared auth UI components
hooks/
  useAuthForm.ts    # Auth form state and validation
  useDashboard.ts   # Dashboard data, sorting, new design
  useDesign.ts      # Design name editing, debounced save
lib/
  db.ts             # InstantDB client
  admin.ts          # InstantDB admin client (server-side)
  schema.ts         # Database schema
  formatDate.ts     # Timestamp formatting utility
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- An [InstantDB](https://instantdb.com) account and app

### Environment Variables

Create a `.env.local` file at the root:

```env
NEXT_PUBLIC_INSTANT_APP_ID=your_instantdb_app_id
INSTANT_ADMIN_TOKEN=your_instantdb_admin_token
```

### Install and Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Community Member Test Accounts

Sign up with any of these emails to see the community member badge:

```
member1@test.com
member2@test.com
vip@tilted.com
```

---

## Deployment

The project is configured for Netlify via `netlify.toml`. Connect the repository in the Netlify dashboard, add the two environment variables, and deploy.

---

## Assumptions and Trade-offs

**Auth architecture** — InstantDB does not provide built-in password auth. The solution stores bcrypt-hashed passwords in a custom `profiles` entity and bridges to InstantDB sessions using `adminDB.auth.createToken` after validating credentials server-side.

**Password reset** — Uses InstantDB magic codes for identity verification client-side, then calls a custom API to update the stored password hash. The reset endpoint relies on the magic code step completing successfully before it is reached.

**Design view page** — The brief noted this could be a blank page. An inline-editable title with auto-save and a save indicator was added since it was a stated requirement elsewhere in the spec.

**InstantDB permissions** — Row-level security rules were not pushed to the database due to a Node version incompatibility with the InstantDB CLI. The ownership check is currently enforced client-side only.

**Search** — The search input is present in the UI but not yet wired up. It was not listed as a requirement for the prototype.

**What I would do differently with more time**
- Configure InstantDB permissions rules for server-enforced row-level security
- Add rate limiting to the auth API routes
- Add a delete design flow (the schema already includes `isDeleted` and `deletedAt`)
