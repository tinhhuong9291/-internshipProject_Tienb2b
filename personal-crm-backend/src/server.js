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
app.use(
  cors({
    origin: [
      "http://localhost:3001",
      "http://localhost:3000",
      "https://internshipproject-tienb2b.onrender.com",
    ],
    credentials: true,
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

// Example route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
