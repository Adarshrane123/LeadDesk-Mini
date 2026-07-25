# LeadDesk Mini - Production-Ready Full Stack Lead Management Platform

LeadDesk Mini is a full-stack MERN (MongoDB, Express.js, React, Node.js) web application designed for a digital agency named **Digital Heroes**. It features a public agency website with an interactive project lead capture form and a separate protected Admin Panel with real-time lead analytics, filtering, searching, sorting, status workflows, and lead management.

---

## 🌟 Key Features

### 🏢 Public Agency Website
- **SaaS Design System**: Built with Tailwind CSS, Framer Motion, and Lucide React icons.
- **Sections**: Navbar, Hero, About Us, Services, Why Choose Us, Our Process, Client Testimonials, FAQ Accordion, Lead Contact Form, and Footer.
- **Lead Capture Form**:
  - Fields: Full Name, Business Email, Company Name, Phone Number, Service Required, Estimated Budget, Project Description.
  - Front-end validation with React Hook Form.
  - Back-end validation with Express Validator.
  - Real-time submission storage in MongoDB.
  - Success and error toasts using React Hot Toast.
- **Footer**: Includes mandatory link `"Built for Digital Heroes Training Task"` linked to `https://digitalheroesco.com`.

### 🛡️ Protected Admin Panel
- **URL**: `/admin/login`
- **Auto Admin Account Creation**: On backend initialization, default admin account is automatically created if not existing:
  - **Email**: `digitalheros@gmail.com`
  - **Password**: `digital12345` (hashed via bcrypt)
- **Login Error Specs**:
  - Displays "Invalid email or password."
  - Error auto-hides after 2 seconds.
  - Clears only password field.
  - No page refresh.
- **Admin Dashboard (`/admin/dashboard`)**:
  - Displays real data directly from MongoDB (0 initial dummy records).
  - Stats Cards: Total Leads, New Leads, Contacted, Closed.
  - Real-time Search across lead name, email, company, and service.
  - Filter leads by status (`All`, `New`, `Contacted`, `In Progress`, `Closed`).
  - Sort by Submission Date and Name.
  - Pagination support.
  - Inline Lead Status Updater.
  - Lead Detail View Modal.
  - Delete Lead with confirmation modal.

---

## 📁 Project Structure

```
leaddesk-mini/
├── client/                     # React + Vite Frontend
│   ├── src/
│   │   ├── components/         # UI Components (Navbar, Hero, LeadForm, Modals, Footer)
│   │   ├── context/            # AuthContext (JWT Authentication state)
│   │   ├── pages/              # HomePage, AdminLoginPage, AdminDashboardPage, NotFoundPage
│   │   ├── services/           # Axios API instance
│   │   ├── App.jsx             # React Router DOM configuration
│   │   ├── index.css           # Tailwind CSS & custom glassmorphism styles
│   │   └── main.jsx            # Entry point
│   ├── index.html
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── server/                     # Node.js + Express Backend
│   ├── config/                 # Database connection (db.js)
│   ├── controllers/            # Controller logic (authController.js, leadController.js)
│   ├── middleware/             # Auth middleware & Error handler
│   ├── models/                 # Mongoose Schemas (User.js, Lead.js)
│   ├── routes/                 # Express API routes (authRoutes.js, leadRoutes.js)
│   ├── services/               # Auto-seed service (seedAdmin.js)
│   ├── utils/                  # JWT token generator
│   ├── validators/             # Express validator schemas
│   └── server.js               # Entry point
│
├── .env.example
├── package.json                # Root scripts
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file in the `server` directory with:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/leaddesk_mini
JWT_SECRET=super_secret_jwt_key_digital_heroes_2025
PORT=5000
```

*(Note: Replace `MONGODB_URI` with your MongoDB Atlas connection string in production).*

---

## 🚀 Getting Started

### 1. Installation
Run the root helper command to install dependencies for both `server` and `client`:

```bash
npm run install:all
```

Or manually:
```bash
cd server && npm install
cd ../client && npm install
```

### 2. Start Development Servers

Start Backend Express Server (Port 5000):
```bash
npm run dev:server
```

Start Frontend Vite Server (Port 3000):
```bash
npm run dev:client
```

Open browser at `http://localhost:3000`.

---

## 🔑 Admin Portal Credentials

- **URL**: `http://localhost:3000/admin/login`
- **Email**: `digitalheros@gmail.com`
- **Password**: `digital12345`

---

## 📡 API Endpoints

### Auth
- `POST /api/auth/login` - Authenticate admin & issue JWT
- `GET /api/auth/me` - Verify JWT & fetch admin profile

### Leads
- `POST /api/leads` - Public lead form submission
- `GET /api/leads` - Admin protected list leads with search, filter, sort, pagination & stats
- `GET /api/leads/:id` - Admin protected get single lead details
- `PATCH /api/leads/:id/status` - Admin protected update lead status
- `DELETE /api/leads/:id` - Admin protected delete lead

---

## 🌐 Deployment Guidelines

- **Frontend**: Deploy `client` directory on **Vercel** with build command `npm run build` and output directory `dist`. Set `VITE_API_BASE_URL` to your Render backend API URL.
- **Backend**: Deploy `server` directory on **Render** (Web Service). Add environment variables (`MONGODB_URI`, `JWT_SECRET`, `PORT`).
- **Database**: Host database on **MongoDB Atlas**.

---

## 📝 Footer Requirement Verification
Every page footer explicitly renders:
`Built for Digital Heroes Training Task` linking to [https://digitalheroesco.com](https://digitalheroesco.com).
