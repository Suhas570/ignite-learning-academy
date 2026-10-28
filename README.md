# Ignite Learning Academy — Monorepo

Welcome to the production-grade monorepo for **Ignite Learning Academy**.

This repository contains two independent, sibling applications designed to work together without bleeding boundaries:
1. **`backend/`**: A headless CMS built on **Payload CMS 3** backed by **PostgreSQL**, providing rich content management, administrative workflows, and REST/GraphQL APIs.
2. **`frontend/`**: A modern web application built with **Next.js 15**, TypeScript, and **Tailwind CSS** using the App Router.

---

## Architecture & Project Structure

```
ignite-learning-academy/
├── backend/                  # Payload CMS 3 Application (Port 3000)
│   ├── src/
│   │   ├── app/
│   │   │   ├── (payload)/    # Payload Admin Panel & API routes
│   │   │   └── (frontend)/   # Default Payload Landing Page
│   │   ├── collections/      # Payload collections (Users, Media, etc.)
│   │   └── payload.config.ts # Core Payload CMS configuration (PostgreSQL)
│   ├── .env                  # Local backend secrets (git-ignored)
│   ├── .env.example          # Template environment file
│   ├── next.config.ts        # Next.js configuration with withPayload()
│   ├── package.json          # Independent backend dependencies
│   └── tsconfig.json         # TypeScript configuration
├── frontend/                 # Next.js 15 App Router Frontend (Port 3001)
│   ├── src/
│   │   └── app/              # App router pages, layouts, and styles
│   ├── public/               # Static web assets
│   ├── .env.local            # Local frontend environment variables
│   ├── .env.example          # Template frontend environment file
│   ├── next.config.ts        # Next.js configuration
│   ├── package.json          # Independent frontend dependencies
│   ├── tailwind.config.ts    # Tailwind CSS configuration
│   └── tsconfig.json         # TypeScript configuration
├── .agents/                  # Antigravity Taskboard & Plugin registry
│   └── taskboard/            # Project-scoped SQLite Kanban database
├── .gitignore                # Root gitignore (node_modules, .env, build outputs)
├── README.md                 # Project documentation and developer guide
└── start.md                  # Quick terminal commands to launch servers
```

---

## Prerequisites

Before starting, ensure you have the following installed on your machine:
- **Node.js**: `v20 LTS` or later (`v24.19.0` recommended)
- **PostgreSQL**: `15+` (`PostgreSQL 18.6` running on port `5432`)
- **Package Manager**: `npm` (`v10+` / `v11+`)
- **Git**: `2.40+`

---

## Getting Started

### 1. Database Setup (PostgreSQL)

Ensure PostgreSQL is running locally on port `5432`. Create a database named `ignite_academy`:

```bash
# Using psql
psql -U postgres -h localhost -c "CREATE DATABASE ignite_academy;"
```

### 2. Environment Configuration

#### Backend Configuration (`backend/.env`)
Copy the template environment file:
```bash
cp backend/.env.example backend/.env
```
Fill in the database URI and secret:
```env
DATABASE_URI=postgresql://postgres:admin123@127.0.0.1:5432/ignite_academy
PAYLOAD_SECRET=7f91a5db4e963bc2d78e381023a19fc8b067c29e12345
CLOUDINARY_CLOUD_NAME=placeholder_cloud_name
CLOUDINARY_API_KEY=placeholder_api_key
CLOUDINARY_API_SECRET=placeholder_api_secret
RESEND_API_KEY=placeholder_resend_api_key
```

#### Frontend Configuration (`frontend/.env.local`)
Copy the template environment file:
```bash
cp frontend/.env.example frontend/.env.local
```
Configure backend endpoints:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:3001
PORT=3001
```

---

## Dependency Installation

Both applications maintain their own independent `package.json` and lockfiles.

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

---

## Starting the Servers

### Starting the Backend (Payload CMS 3)
In your first terminal:
```bash
cd backend
npm run dev
```
- **Backend URL**: [http://localhost:3000](http://localhost:3000)
- **Payload Admin Panel**: [http://localhost:3000/admin](http://localhost:3000/admin)
- On your first visit to `/admin`, follow the on-screen flow to create your initial Administrator account.

### Starting the Frontend (Next.js 15)
In your second terminal:
```bash
cd frontend
npm run dev
```
- **Frontend URL**: [http://localhost:3001](http://localhost:3001)

---

## Antigravity Plugins & Taskboard

The project is governed by Antigravity plugins configured in `.agents/`:
1. **Ponytail**: Minimal-code, anti-over-engineering senior dev discipline.
2. **Loop Library**: Bounded hypothesis-and-verify closed-loop workflows.
3. **Gravitas**: Deep independent verification and multi-model defect auditing.
4. **Awesome Skills**: Universal agentic full-stack skill and playbook library.
5. **Taskboard**: Autonomous Kanban supervisor with SQLite persistence.
6. **agystack**: Swarm orchestration and anti-slop multi-tier execution.
7. **Native /boost**: Antigravity's deep-reasoning multi-agent optimization.

---

## DNS Setup (Resend Custom Domain Configuration)

When transitioning from the testing sender (`onboarding@resend.dev`) to a custom branded email address (e.g., `admissions@ignitelearningacademy.com` or `info@ignitelearningacademy.com`), add the following DNS records to your domain provider (e.g., Cloudflare, GoDaddy, Namecheap):

### 1. SPF Record (Sender Policy Framework)
Authorizes Resend's mail servers to send transactional emails on behalf of your domain:
- **Type**: `TXT`
- **Host / Name**: `@` (or `ignitelearningacademy.com`)
- **Value / Content**: `v=spf1 include:resend.com ~all`
- **TTL**: `Auto` / `3600`

> *Note:* If you already have an existing SPF record for Google Workspace or Microsoft 365, do not create a second TXT record. Instead, append `include:resend.com` inside your existing record:
> `v=spf1 include:_spf.google.com include:resend.com ~all`

### 2. DKIM Records (DomainKeys Identified Mail)
Cryptographically signs every outbound email, guaranteeing authenticity and preventing tampering:
- **Type**: `CNAME`
- **Host / Name**: `resend._domainkey`
- **Value / Content**: `dkim.resend.com`
- **TTL**: `Auto` / `3600`

### 3. DMARC Policy (Domain-based Message Authentication)
Informs recipient mail servers (Gmail, Yahoo, Outlook) how to handle unauthenticated mail and provides delivery analytics:
- **Type**: `TXT`
- **Host / Name**: `_dmarc`
- **Value / Content**: `v=DMARC1; p=none; rua=mailto:dmarc-reports@ignitelearningacademy.com; sp=none; aspf=r;`
- **TTL**: `Auto` / `3600`

### 4. MX Record (Mail Delivery & Bounces)
Directs bounce and feedback loop notifications to Resend for reputation monitoring:
- **Type**: `MX`
- **Host / Name**: `feedback` (or sub-domain configured in Resend)
- **Value / Content**: `feedback-smtp.resend.com`
- **Priority**: `10`
- **TTL**: `Auto` / `3600`

### Verification Steps
1. Navigate to [Resend Dashboard → Domains](https://resend.com/domains) and click **Add Domain**.
2. Input your domain and copy the generated DNS records into your DNS registrar.
3. Click **Verify Records**. DNS propagation typically takes between 2 to 15 minutes.
4. Once verified, update `RESEND_FROM_EMAIL="admissions@ignitelearningacademy.com"` in `backend/.env`.

