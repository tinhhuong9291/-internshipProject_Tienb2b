const fs = require('fs');

const content = `

# 🧠 Personal CRM App

A full-stack personal CRM system to manage your customers, clients, partners, or even gift ideas — built with the **MEVN** stack (MongoDB, Express.js, Vue.js, Node.js).

---

## 📦 Features

- Create, view, update, and delete profiles
- Organize contact info, notes, tasks, and interaction history
- Real-time search/filtering
- Tabbed interface for profile details (Profile | Task | Interaction)
- Responsive UI with Vue.js
- RESTful API using Express.js
- MongoDB database

---

## 🧰 Tech Stack

### Backend:

- Node.js + Express.js
- MongoDB + Mongoose
- CORS, dotenv, body-parser

### Frontend:

- Vue 3 (Options API)
- Tailwind CSS (optional)
- Fetch API for communication

---

## 🚀 Getting Started

### 1. Clone the repository

\`\`\`bash
git clone https://github.com/tinhhuong9291/-internshipProject_Tienb2b.git
cd personal-crm
\`\`\`

### 2. Setup the Backend

\`\`\`bash
cd backend
yarn install
\`\`\`

🔐 Create a \`.env\` file:

\`\`\`
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority
PORT=8080
\`\`\`

Start the backend server:

\`\`\`bash
yarn start dev
\`\`\`

### 3. Setup the Frontend

\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

Frontend: http://localhost:3000  
Backend API: http://localhost:8080

---

## 📘 API Endpoints

### Customer

\`\`\`
GET /api/customers
GET /api/customers/:id
POST /api/customers
PUT /api/customers/:id
DELETE /api/customers/:id
\`\`\`

---

## 🧪 Testing

Use Postman or Swagger to test. Ensure MongoDB is connected and the backend is running.

---

## 🛠 Deployment

- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas

---

## ✍️ Author

Made with 💙 by [ThanhTien](https://github.com/tinhhuong9291)
