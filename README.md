# SkillForge AI 🚀

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-green)
![Redux](https://img.shields.io/badge/State-Redux_Toolkit-purple)
![AI](https://img.shields.io/badge/AI-Google_Gemini-orange)

**SkillForge AI** is an intelligent competency tracker and learning path generator designed to help developers and students master new technologies. 

Instead of manually creating to-do lists, users simply state their goal (e.g., *"Learn Docker from scratch"*), and the application leverages **Google Gemini AI** to architect a structured, step-by-step curriculum. Users can then track their progress, mark milestones as complete, and manage their learning journey in a persistent dashboard.

---

## 🌟 Key Features

- **AI-Powered Curriculum Design**: Generates structured learning paths (Title, Description, Modules, Resources) using the **Vercel AI SDK** and **Google Gemini 1.5 Flash**.
- **Full CRUD Functionality**:
  - **Create**: Generate new roadmaps via AI or manual input.
  - **Read**: View active learning paths and progress summaries.
  - **Update**: Mark individual steps as "Completed" with optimistic UI updates.
  - **Delete**: Archive or remove outdated roadmaps.
- **Hybrid State Management**:
  - **Server State**: Managed via Next.js Server Actions and MongoDB.
  - **Client State**: Complex interactive "Draft Mode" managed via **Redux Toolkit**.
- **Robust Tech Stack**: Built on **Next.js 16 (App Router)** for performance and SEO.
- **Secure Authentication**: Integrated with **NextAuth.js** (Auth.js v5).
- **Responsive UI**: Styled with **Tailwind CSS** for a clean, mobile-first experience.

---

## 🛠️ Technology Stack

| Component | Technology | Reason for Choice |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 (App Router) | Utilizing the latest React features (Server Components, Server Actions) for performance. |
| **Language** | TypeScript | Ensures type safety and maintainability across the full stack. |
| **Database** | MongoDB + Mongoose | Flexible document schema fits the hierarchical nature of educational roadmaps better than SQL. |
| **State Mgmt** | Redux Toolkit | Manages the complex client-side state of the "AI Roadmap Editor" before persistence. |
| **AI Engine** | Google Gemini (via AI SDK) | Fast, cost-effective inference for generating structured JSON content. |
| **Styling** | Tailwind CSS | Rapid UI development with consistent design tokens. |
| **Validation** | Zod | Runtime schema validation to ensure AI outputs and User inputs are safe. |

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### 1. Clone the Repository
```bash
git clone [https://github.com/YOUR_USERNAME/skillforge-ai.git](https://github.com/YOUR_USERNAME/skillforge-ai.git)
cd skillforge-ai
````

### 2\. Install Dependencies

```bash
npm install
```

### 3\. Configure Environment Variables

Create a `.env.local` file in the root directory and add the following keys:

```env
# Database Connection
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/skillforge

# AI Configuration (Get key from Google AI Studio)
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key

# Authentication (NextAuth)
NEXTAUTH_SECRET=your_random_secure_string
NEXTAUTH_URL=http://localhost:3000
```

### 4\. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) with your browser to see the result.

-----

## 🏗️ Architecture & Design Decisions

### Why Redux in Next.js 16?

While Server Actions handle data mutations, the **AI Generation Phase** is highly interactive. The user might want to edit, reorder, or delete steps from the AI's suggestion *before* saving it to the database. Redux provides a robust "Draft State" on the client, preventing unnecessary database writes until the user commits the plan.

### Server Actions vs. API Routes

This project uses **Next.js Server Actions** exclusively for backend logic. This reduces the boilerplate of creating REST API endpoints, improves type safety between client and server, and allows for progressive enhancement.

### AI Integration Strategy

We utilize the `generateObject` function from the Vercel AI SDK to force the LLM (Gemini) to return strictly typed JSON matching our Zod schema. This prevents "hallucinated" formats and ensures the UI never breaks due to malformed AI responses.

-----

## 🛡️ Real-World Considerations

If this application were to be deployed for thousands of users in a production environment (like House of EdTech), the following considerations would be addressed:

1.  **Rate Limiting**: To prevent abuse of the AI API and Database, I would implement a sliding window rate limiter (using Redis/Upstash) on the generation endpoint (e.g., max 5 roadmaps per hour per user).
2.  **Caching**: While Next.js caches fetch requests by default, I would implement `unstable_cache` for database queries to reduce load on MongoDB during high traffic.
3.  **Security**:
      - **Input Sanitization**: All inputs are validated via Zod to prevent NoSQL injection.
      - **Authorization**: Middleware ensures only authenticated users can access the dashboard or mutate data.
4.  **Scalability**: The MongoDB schema uses an **Embedded Document Pattern** for roadmap steps. This avoids expensive `JOIN` operations (or `$lookup`), ensuring read performance remains O(1) even as the database grows.

-----

## 👤 Author

**Muhammed Ameen T** *MERN Stack Developer | Full-Stack Engineer*

  - 🌐 [GitHub Profile](https://www.google.com/search?q=https://github.com/YOUR_GITHUB_USERNAME)
  - 💼 [LinkedIn Profile](https://www.google.com/search?q=https://linkedin.com/in/YOUR_LINKEDIN_USERNAME)

-----
s
*Submitted as part of the Full-Stack Developer Assignment for House of EdTech.*