import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth/auth.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// auth routes
app.use("/auth", authRoutes);

// test route
app.get("/", (req, res) => res.send("Linkr API Running ✅"));

if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;