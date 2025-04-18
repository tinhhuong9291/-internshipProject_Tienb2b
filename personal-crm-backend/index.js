require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

// Middleware
const cors = require("cors");
app.use(cors());

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI;
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

// Basic route
app.use("/api/customers", require("./routes/customerRoutes"));
app.use("/api/interactions", require("./routes/interactionRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
