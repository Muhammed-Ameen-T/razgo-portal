# RazGo | Scalable Job Talent Marketplace 🚀

**RazGo** is a high-performance, full-stack career platform built using the **MERN** stack (MongoDB, Express, React, Node.js). It is architected with a focus on **type-safety**, **clean separation of concerns**, and **enterprise-grade communication layers**.

---

## 🏗️ Architectural Overview

RazGo is built to solve the "spaghetti code" problem common in early-stage MVPs. It uses a **Layered Architecture**:

### Frontend (React + TS)
- **Feature-Based Structure:** Organized by domain (`auth`, `jobs`, `applications`) rather than just file types.
- **Centralized API Layer:** Custom **Axios Interceptor** pattern for global error handling and automatic JWT injection.
- **State Management:** Redux Toolkit for global auth state and UI management.
- **Validation:** Type-safe forms using React Hook Form + Zod.

### Backend (Node + Express)
- **Controller-Service-Repository Pattern:** Business logic is isolated in Services, making the codebase unit-testable and database-agnostic.
- **Security:** Role-Based Access Control (RBAC) middleware for `Seeker`, `Employer`, and `Admin` roles.
- **Data Integrity:** Mongoose schemas with strict TypeScript interfaces.

---

## 🛠️ Technical Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 18, TypeScript, Tailwind CSS |
| **State** | Redux Toolkit (RTK) |
| **API Client** | Axios (with Request/Response Interceptors) |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Atlas) |
| **Auth** | JWT (Stateless) |

---

## 📂 Project Structure

```text
razgo-root/
├── client/                # React Vite + TypeScript
│   ├── src/
│   │   ├── api/           # Axios instance & interceptors
│   │   ├── features/      # Domain logic (Auth, Jobs, Profiles)
│   │   ├── components/    # Shared UI components (Atomic Design)
│   │   └── store/         # Redux global state
├── server/                # Node.js + Express
│   ├── src/
│   │   ├── controllers/   # Request handling
│   │   ├── services/      # Business logic (The "Brain")
│   │   ├── models/        # Database schemas
│   │   └── middleware/    # Auth & Validation guards
└── .env                   # Configuration

```

---

## 🚀 Key Features

* **🔐 Robust Auth:** Multi-role registration (Job Seeker & Employer) with secure JWT persistence.
* **💼 Job Management:** Employers can post, edit, and track job listings; Seekers can filter and apply.
* **📊 Applicant Tracking System (ATS):** A dashboard for employers to manage candidate statuses (Pending, Shortlisted, Rejected).
* **🔍 Smart Search:** Optimized search and filter functionality for job listings.
* **📄 Profile Management:** Resume upload support and dynamic profile building.

---

## 🛠️ Setup & Installation

1. **Clone the repository**
```bash
git clone [https://github.com/your-username/razgo.git](https://github.com/your-username/razgo.git)
cd razgo

```


2. **Environment Configuration**
Create a `.env` file in the `server/` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_super_secret_key

```


3. **Install Dependencies**
```bash
# Install backend deps
cd server && npm install

# Install frontend deps
cd ../client && npm install

```


4. **Run Development Mode**
```bash
# From the root (if using concurrently)
npm run dev

```



---

## 📈 Roadmap & Scalability

* [ ] **Phase 1 (MVP):** Core MERN flow, Auth, and Job Posting.
* [ ] **Phase 2:** Real-time notifications using Socket.io for application updates.
* [ ] **Phase 3:** AI-based resume ranking to help employers find the best talent faster.
* [ ] **Phase 4:** Migration to Microservices for the "Search" and "Notification" modules.

---

## 👨‍💻 Author

**Muhammed Ameen T** *MERN Stack Developer*

---