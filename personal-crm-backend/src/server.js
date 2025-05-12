const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware or static file serving
app.use(express.static(path.join(__dirname, "../vue_project/dist")));
// Middleware

// // Middleware
const allowedOrigins = [
  "http://localhost:3000",
  "https://internship-project-tienb2b-mnkw4j2gy.vercel.app",
  "https://internshipproject-tienb2b.onrender.com/api/interactions",
  "https://internshipproject-tienb2b.onrender.com/api/interactions-all",
  "https://internshipproject-tienb2b.onrender.com/api/customers",
  "https://internshipproject-tienb2b.onrender.com/api/tasks",
  "https://internshipproject-tienb2b.onrender.com/api/users",
  "https://internshipproject-tienb2b.onrender.com/api/email",
];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // allow requests with no origin
//       // (like mobile apps or curl requests)
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.indexOf(origin) === -1) {
//         const msg = "The CORS policy for this site does not " + "allow access from the specified Origin.";
//         return callback(new Error(msg), false);
//       }
//       return callback(null, true);
//     },
//   })
// );

app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser.json());

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

// Import routes

app.use("/api/customers", require("./routes/customerRoutes"));
app.use("/api/interactions", require("./routes/interactionRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/email", require("./routes/emailRoutes"));
// Example route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
