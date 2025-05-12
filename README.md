

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
- Fetch API 

---

## 🚀 Getting Started

### 1. Clone the repository


git clone https://github.com/tinhhuong9291/-internshipProject_Tienb2b.git



cd personal-crm


### 2. Setup the Backend


cd backend


yarn install


🔐 Create a \`.env\` file:


MONGO_URI=mongodb+srv://tiendev:wtcrF8gcBd6QOOJz@cluster0.8mdyaai.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0


PORT=8080




Start the backend server:


yarn start dev


### 3. Setup the Frontend


cd frontend


npm install



npm run dev


Frontend: http://localhost:3000  
Backend API: http://localhost:8080

---

## 📘 API Endpoints

### Customer


GET /api/customers


GET /api/customers/:id


POST /api/customers


PUT /api/customers/:id


DELETE /api/customers/:id



---

## 🧪 Testing

Use Postman or Swagger to test. Ensure MongoDB is connected and the backend is running.

---

## 🛠 Deployment

- Frontend → Vercel → https://internship-project-tienb2b-thanhtiens-projects-32a8cd95.vercel.app/


- Backend → Render → https://internshipproject-tienb2b.onrender.com

  
- Database → MongoDB Atlas

---

## ✍️ Author

Made with 💙 by [ThanhTien](https://github.com/tinhhuong9291)
