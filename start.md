# How to Start Ignite Learning Academy

## Option 1: Start Both with One Command (Recommended)

From the `ignite-learning-academy` root folder:

```powershell
npm run dev
```

This uses `concurrently` to start both the Payload backend (port 3000) and the Next.js frontend (port 3001) in a single terminal.

---

## Option 2: Start in Two Separate Terminals

## Terminal 1: Backend (Payload CMS 3)

```powershell
# Navigate to the backend directory
cd backend

# Start the Payload CMS 3 development server on port 3000
npm run dev
```

- **Payload CMS**: [http://localhost:3000](http://localhost:3000)
- **Payload Admin Panel**: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## Terminal 2: Frontend (Next.js 15)

```powershell
# Navigate to the frontend directory
cd frontend

# Start the Next.js 15 development server on port 3001
npm run dev
```

- **Frontend Application**: [http://localhost:3001](http://localhost:3001)

---

## Verification Endpoints
- **Payload Admin Login / Onboarding**: `http://localhost:3000/admin`
- **Next.js App Default Page**: `http://localhost:3001`
