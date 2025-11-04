# 🧠 AI-Powered Virtual Teaching Assistant for Analysis of Algorithms (AoA)

An interactive web-based learning assistant designed to help students understand **Analysis of Algorithms (AoA)** concepts through **chat** and **voice interaction**.
The system uses the **Gemini API** to explain topics, solve problems, and provide examples in real time.

---

## 🚀 Features

* 💬 **AI Chat Assistant** — Ask questions about AoA and get instant, intelligent answers.
* 🎙️ **Voice Interaction** — Speak and listen to the assistant using the Web Speech API.
* 👥 **User Authentication** — Secure login and signup with JWT-based authentication.
* 📚 **Content Management** — Predefined AoA syllabus, topics, and quizzes.
* 📊 **Progress Tracking** — Save and view your learning progress.
* 🧑‍💼 **Admin Panel** — Manage users, monitor queries, and update learning content.

---

## 🏗️ Tech Stack

| Category           | Technology                                       |
| ------------------ | ------------------------------------------------ |
| **Frontend**       | React.js, Tailwind CSS, Vite, Web Speech API     |
| **Backend**        | Node.js, Express.js                              |
| **Database**       | MongoDB Atlas                                    |
| **AI Integration** | Gemini API                                       |
| **Auth**           | JWT + bcrypt                                     |
| **File Handling**  | Multer + Cloudinary (optional for media uploads) |

---

## 📂 Project Structure

```
aoa-virtual-teaching-assistant/
├── backend/
│   ├── server.js
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   ├── middleware/
│   ├── utils/
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   └── package.json
│
├── README.md
├── .gitignore
└── package.json
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/aoa-virtual-teaching-assistant.git
cd aoa-virtual-teaching-assistant
```

### 2️⃣ Backend setup

```bash
cd backend
npm install
```

Create a **`.env`** file:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
JWT_SECRET=your_secret_key
```

Run the backend server:

```bash
npm run dev
```

Server runs at: [http://localhost:5000](http://localhost:5000)

---

### 3️⃣ Frontend setup

```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs at: [http://localhost:5173](http://localhost:5173)

---

## 🧠 Example Workflow

1. User logs in or signs up.
2. Types or speaks an AoA question (e.g., “Explain merge sort with example”).
3. Request goes to backend → Gemini API → returns AI-generated explanation.
4. Response is shown on chat screen (and spoken aloud if enabled).
5. User progress stored in MongoDB for review.

---

## 🔒 Environment Variables

| Variable         | Description                       |
| ---------------- | --------------------------------- |
| `PORT`           | Server port (default 5000)        |
| `MONGODB_URI`    | MongoDB Atlas connection string   |
| `GEMINI_API_KEY` | Gemini API key for AI responses   |
| `JWT_SECRET`     | Secret key for JWT authentication |

---

## 🧩 Future Enhancements

* 📖 Add code snippet explanations using syntax highlighting.
* 🧑‍🏫 Include visual algorithm animations.
* 🔔 Real-time notifications for quiz results.
* 🌐 Multi-language support (English + Urdu).

---

## 📸 Screenshots (to add later)

|        Chat Interface        |        Voice Interaction       |           Admin Panel          |
| :--------------------------: | :----------------------------: | :----------------------------: |
| ![Chat UI](docs/chat-ui.png) | ![Voice UI](docs/voice-ui.png) | ![Admin](docs/admin-panel.png) |

---

## 👨‍💻 Contributors

| Name                               | Role               | Module                                 |
| ---------------------------------- | ------------------ | -------------------------------------- |
| **Noraiz Rana (BSIT51F22R003)**    | AI Developer       | AI Teaching Agent + Voice Interaction  |
| **Muhammad Abid (BSIT51F22R001)**  | Backend Developer  | Authentication & Profiles              |
| **Muhammad Imran (BSIT51F22R050)** | Frontend Developer | Content Management & Progress Tracking |

---

## 🧑‍🏫 Supervisor

**Dr. Khalid Mehmood Aamir**
Department of Information Technology,
University of Sargodha.

---

## 🪪 License

This project is for academic and research purposes only.
All rights reserved © 2025.

---

**Developed with 💙 by Team AoA Assistant**
