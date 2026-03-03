import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import jobRoutes from "./routes/jobRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/jobs', jobRoutes);

app.get("/", (req, res) => {
  res.redirect("/jobs");
});

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
