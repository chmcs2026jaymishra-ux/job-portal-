import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import jobRoutes from "./routes/jobRoutes.js";
import { connectDB } from "./config/db.js"
dotenv.config()
const app = express();
const port = process.env.PORT || 3001
app.use(cors(
    {
        origin: 'http://localhost:5173'
    }
))
app.use(express.json())
app.use("/jobs", jobRoutes)
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`http://localhost:${port}/jobs`)
    })
})
