
import express from "express";
import logger from "./middleware/logger.js";
import studentRoutes from "./routes/studentRoutes.js";

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(logger);

// Routes
app.use("/students", studentRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
