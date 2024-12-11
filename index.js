// server.js

const express = require("express");
const cors = require("cors");
const connectDb = require("./Config/db"); // Make sure your DB config is correct
const dotenv = require("dotenv"); // Ensure environment variables are loaded

dotenv.config();
// Initialize express app
const app = express();

// Connect to the database
connectDb();

// Middleware
app.use(cors());
app.use(express.json()); // To parse incoming requests with JSON payloads

// Routes
// app.use("/api/auth", require("./Router/userRouter")); // Ensure userRouter.js exists and is correctly defined

// Optional: Uncomment other routes as needed
app.use("/api/auth", require("./Router/AddEmployeeRouter"));
app.use("/api/employee", require("./Router/UserRouter"));
app.use("/api/department", require("./Router/DepartmentRouter"));
app.use("/api/leave", require("./Router/LeaveRouter"));


// Example root 
app.get("/", (req, res) => {
  return res.status(200).send("<h1>Hello Server Start</h1>");
});

const PORT = process.env.PORT || 8000; // Get port from environment or default to 8000

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export for Vercel (or other deployment)
module.exports = app;
