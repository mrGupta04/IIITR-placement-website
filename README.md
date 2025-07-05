
# 🚀 IIITR Training & Placement Portal

> A full-stack web application built to manage training & placement operations for **IIIT Raichur** 🎓

🌐 **Live Website:** [iiitrplacementtrainingabc.vercel.app](https://iiitrplacementtrainingabc.vercel.app/)

---

## ✨ Features

- 🔐 JWT-based Student Authentication
- 🧑‍🎓 Student Profile Creation & Management
- 🗃️ Placement & Training Data Handling
- 💻 Clean, Responsive UI (Mobile-first)
- 📊 (Coming Soon) Admin Dashboard for Placement Cell

---

## 🧰 Tech Stack

| Category      | Tech Stack                          |
|---------------|--------------------------------------|
| 💻 Frontend    | Next.js, React.js, CSS              |
| 🔧 Backend     | Node.js, Express.js                 |
| 🗄️ Database    | MongoDB                             |
| 🔐 Auth        | JWT (JSON Web Tokens)               |
| ☁️ Deployment  | Vercel (Frontend), MongoDB Atlas    |
| 🔃 Versioning  | Git & GitHub                        |

---

## 📁 Project Folder Structure

```bash
src/
├── components/           # Reusable React components
├── data/                 # Static or seed data (if any)
├── lib/                  # Helper libraries or functions
├── models/               # Database models (e.g., Mongoose schemas)
├── pages/                # Next.js pages (routes)
│   ├── admin/            # Admin-facing pages
│   ├── api/              # API route handlers
│   │   ├── auth/
│   │   │   └── protected.js    # Protected route for auth
│   │   └── user/               # User-related API routes (add signup.js here!)
│   ├── _app.js           # App entry point for global config
│   ├── 404.js            # Custom 404 error page
│   ├── about.js          # About IIITR or the portal
│   ├── alumni.js         # Alumni page
│   ├── contact.js        # Contact us form/page
│   ├── index.js          # Homepage
│   ├── jobcard.js        # Component/page for displaying individual job
│   ├── jobs.js           # All jobs listing
│   ├── profile.js        # Student profile page
│   ├── recruiters.js     # List of recruiters
│   └── stats.js          # Stats dashboard
├── styles/               # CSS or Tailwind styling
└── utils/                # Utility functions
```

---

## 🛠️ Setup Instructions

### 1. 📦 Backend Setup

```bash
cd backend
cp .env.example .env   # Add your MongoDB URI & JWT secret
npm install
npm run dev
```

### 2. 🎨 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

> ⚠️ Make sure the backend is running before accessing the frontend

---

## 👨‍💻 Team & Role

**Lead Full Stack Developer**: [Aditya Gupta](https://github.com/mrGupta04)  
🧑‍🤝‍🧑 Team of 5 Developers:

- 🔧 Led full-stack architecture design
- 🔍 Managed GitHub workflows and code reviews
- ✅ Task distribution and sprint planning

**Team Members**:  
👤 Aryan Pratik  
👤 Abhinav Yadav  
👤 Vinay Kumar  
👤 Shivam Kumar

---

## 📌 .env Example

```env
# .env (Backend)
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

---

## 🧪 Future Improvements

- ✅ Admin Panel for Placement Officers
- 📄 Resume Upload & Verification
- 📊 Data Visualization with Charts
- 🔎 Search & Filter for Student Profiles

---

## 🤝 Contributing

Pull requests are welcome!  
Feel free to fork the repo and submit a PR to suggest improvements or features 💡
