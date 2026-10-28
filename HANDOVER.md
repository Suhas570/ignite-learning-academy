# Ignite Learning Academy — Client Handover & Administration Manual

Welcome to the **Ignite Learning Academy** production management manual. This document provides complete, step-by-step instructions for non-technical administrators, content managers, and admissions staff to operate, maintain, and update the website using the integrated Payload CMS Admin Panel.

---

## 1. System Architecture Overview

Your website is built on a modern, enterprise-grade Jamstack architecture designed for high speed, maximum security, and low operational overhead:

| Component | Platform / Service | Role |
| :--- | :--- | :--- |
| **Public Website (Frontend)** | Next.js 15 on **Netlify** | Fast, responsive, SEO-optimized public website. |
| **Content Management (Backend)** | Payload CMS 3 on **Render** | Secure administrative dashboard and REST API. |
| **Relational Database** | Serverless PostgreSQL (**Neon / Render Postgres**) | Encrypted storage for courses, enquiries, and settings. |
| **Media & Asset Delivery** | **Cloudinary CDN** | High-speed global delivery and automatic optimization for photos and videos. |
| **Transactional Email** | **Resend API** | Instant notifications for admissions enquiries. |

---

## 2. Production Access Directory

| Portal | Production URL | Description |
| :--- | :--- | :--- |
| **Live Public Website** | `https://ignite-learning-academy.netlify.app` *(or your custom domain)* | Public-facing portal for students, teachers, and parents. |
| **Admin Control Panel** | `https://<YOUR-RENDER-BACKEND-URL>/admin` | Secure dashboard to edit courses, media, and leads. |
| **API Health Check** | `https://<YOUR-RENDER-BACKEND-URL>/api/courses` | Public JSON endpoint verifying database connectivity. |

---

## 3. Initial Administrator Setup & Login

### Step 1: Navigating to the Admin Panel
Open your web browser and navigate to:
```
https://<YOUR-RENDER-BACKEND-URL>/admin
```

### Step 2: Logging In
1. On the login screen, enter your Administrator credentials:
   - **Email:** `admin@igniteacademy.com` *(or the primary email configured during deployment)*
   - **Password:** *(Supplied securely during onboarding)*
2. Click **Login** to enter the dashboard.

### Step 3: Changing Your Default Password
> [!IMPORTANT]
> Immediately after your first login, update your administrative password:
1. In the left navigation sidebar, click **Users** under the Collections section.
2. Select your account from the user list.
3. Scroll down to the **Password** field.
4. Enter a strong, unique password (minimum 12 characters including uppercase, lowercase, numbers, and symbols).
5. Click **Save** in the top right corner.

---

## 4. Course Catalog Management

Courses are dynamically fetched by the website. Any modification made in the Admin Panel updates the live website within **60 seconds** (automatic background cache revalidation).

### Navigating to Courses
In the left sidebar, click **Courses** (`/admin/collections/courses`).

### Creating a New Course
1. Click **+ Create New** in the top right corner.
2. Fill in the course details:
   - **Title**: Full course name (e.g., *Nursery Teachers Training (NTT) Diploma*).
   - **Slug**: URL identifier in lowercase with hyphens (e.g., `nursery-teachers-training`). *If left blank, it is automatically generated from the title.*
   - **Category**: Select either **Teacher Training** (`teachers`) or **Student Programs** (`students`). This determines which tab and filter the course appears under.
   - **Badge**: Promotional badge label (e.g., `1-Year Diploma`, `Popular`, `Certification`).
   - **Duration**: Duration text (e.g., `1 Year (Classroom + Practicum)`, `3 Months`).
   - **Eligibility**: Prerequisites (e.g., `10+2 / Higher Secondary in any stream`).
   - **Mode**: Delivery mode (e.g., `Hybrid (Classroom + Practical Workshop)`).
   - **Short Description**: 1–2 sentence summary displayed on course cards and Google search previews.
   - **Full Description**: In-depth overview describing the methodology and benefits.
   - **Syllabus Modules**: Click **+ Add Module** to add distinct curriculum sections (e.g., *Module 1: Child Psychology & Development*).
   - **Learning Outcomes**: Click **+ Add Outcome** to list bullet-pointed skills graduates will acquire.
   - **Featured**: Toggle **ON** if you want this course displayed on the Home Page "Featured Programs" carousel.
   - **Status**: Set to **Published** to make it visible on the live site, or **Draft** to work privately.
3. Click **Save** to publish.

### Reordering or Editing Courses
- Click on any existing course row to edit its details.
- To temporarily hide a course without deleting it, change **Status** from `Published` to `Draft` and click **Save**.

---

## 5. Media Library & Gallery Operations

The media collection powers the **Photo Gallery** (`/gallery`), **Video Library** (`/videos`), and **Campus Life** carousel on the home page. Media files are automatically uploaded to Cloudinary CDN for instant worldwide delivery.

### Navigating to Media
In the left sidebar, click **Media** (`/admin/collections/media`).

### Uploading Photos
1. Click **+ Create New**.
2. Set **Media Type** to `Photo`.
3. In the **Upload** area, drag and drop an image (JPG, PNG, or WEBP up to 10MB) or click to browse files.
4. Fill in the metadata:
   - **Title**: A descriptive title (e.g., *Montessori Sensory Activity*).
   - **Alt Text**: Descriptive text for accessibility and SEO (e.g., *Students practicing sensory counting blocks*).
   - **Category**: Select the relevant section:
     - `Campus` — Outdoor facilities, play areas, sensory gardens.
     - `Courses` / `Classroom` — Active lessons, teacher training workshops.
     - `Events` — Annual sports day, exhibitions, celebrations.
     - `General` — General student artwork and activities.
   - **Status**: Set to `Published`.
5. Click **Save**. The photo will instantly appear in the Lightbox Photo Gallery.

### Adding Videos (YouTube, Instagram Reels, or Direct Uploads)
Ignite Learning Academy supports streaming external video embeds as well as self-hosted video clips:
1. Click **+ Create New**.
2. Set **Media Type** to `Video`.
3. Provide the video source:
   - **YouTube URL**: Paste the full video link (e.g., `https://www.youtube.com/watch?v=XXXXX` or `https://youtu.be/XXXXX`). The system automatically extracts high-definition YouTube video thumbnails!
   - **Instagram Reel**: Paste the Instagram reel URL (e.g., `https://www.instagram.com/reel/XXXXX/`).
   - **Direct Video File**: Upload an `.mp4` file directly. The platform will automatically extract and serve optimized thumbnail posters.
4. Add a **Title** and **Category**.
5. Set **Status** to `Published` and click **Save**.

---

## 6. Admissions & Enquiry Leads Management

Whenever a parent or student submits an inquiry on the **Contact Us** page (`/contact`) or clicks **Enroll / Inquire** on an individual course page, a lead is captured in real-time.

### Navigating to Enquiries
In the left sidebar, click **Enquiries** (`/admin/collections/enquiries`).

### Handling Leads
1. Click on any lead to view full contact details:
   - **Full Name**
   - **Email Address**
   - **Phone Number**
   - **Course of Interest**
   - **Message / Notes**
   - **Date & Time Submitted**
2. Update the **Status** dropdown to track your sales pipeline:
   - `New`: Unopened enquiry.
   - `Contacted`: Telephonic or WhatsApp follow-up initiated.
   - `Enrolled`: Successfully registered student.
   - `Closed`: Not interested or duplicate.
3. Click **Save** to record the status update.

### Automated Notifications
- The system automatically triggers an email notification via **Resend** to your admissions inbox (`ignitelearningacademy8@gmail.com`) when a new inquiry arrives.
- The applicant receives an automated receipt confirming that the admissions counselor will reach out within 24 hours.

---

## 7. Global Site Settings & Contact Info

The **Site Settings** panel controls global contact data that updates across the header, footer, contact page, and floating action buttons without touching code.

### Navigating to Site Settings
In the left sidebar, click **Site Settings** under **Globals** (`/admin/globals/site-settings`).

### Configurable Global Fields
- **WhatsApp Number**: Format `91XXXXXXXXXX` (with country code, no `+` or spaces). This dynamically powers the floating WhatsApp button across all pages.
- **Contact Email**: Primary support email (e.g., `ignitelearningacademy8@gmail.com`).
- **Contact Phone**: Displayed phone numbers (e.g., `+91 97890 12345`).
- **Campus Address**: Full physical campus address formatted for footer display.
- **Social Media Links**: Update handles for Instagram (`https://www.instagram.com/ignitelearning24`), YouTube, and LinkedIn.
- Click **Save** to propagate changes across the site.

---

## 8. User Management & Access Control

To add staff members or external copywriters without sharing master credentials:
1. In the left sidebar, click **Users** (`/admin/collections/users`).
2. Click **+ Create New**.
3. Fill in:
   - **Email**: Staff member's corporate or official email.
   - **Password**: Temporary password.
   - **Role**:
     - `Admin`: Full control over collections, users, settings, and code parameters.
     - `Editor`: Can create, edit, and publish Courses, Media, and Enquiries, but cannot manage users or core system settings.
4. Click **Save**.

---

## 9. Security & Maintenance Best Practices

1. **Regular Data Exports**: Once a month, review the Enquiries collection and export student leads to CSV or your primary CRM.
2. **Media Optimization**: Always upload images in modern formats (WEBP, JPG, PNG) under 5MB for optimal mobile loading speeds.
3. **Password Hygiene**: Enforce individual accounts for staff members rather than sharing a single password. Revoke access immediately when a staff member leaves.
4. **Cloudinary Asset Storage**: Do not delete assets directly from Cloudinary storage buckets; always manage assets through the Admin Panel to prevent broken links.

---

## 10. Technical Support Contacts

For server maintenance, domain configuration, or code modifications, reach out to your release engineering team:

- **Repository**: [https://github.com/Suhas570/ignite-learning-academy](https://github.com/Suhas570/ignite-learning-academy)
- **Deployment Environments**: Render (Backend & API) + Netlify (Frontend CDN)
- **Primary Support Contact**: `ignitelearningacademy8@gmail.com`

