import express from "express";
import cors from "cors";
import authRoutes from './routes/authRoutes'

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/auth", authRoutes )

// Health check
app.get("/", (req, res) => {
  res.send("Festora API is running 🚀");
});

export default app;
