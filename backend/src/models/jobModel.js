import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    jobTitle: { type: String, required: true },
    jobDescription: { type: String, required: true },
    companyName: { type: String, required: true },
    jobType: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Internship", "Contract"],
      required: true,
    },
    location: { type: String, required: true },
    experienceLevel: {
      type: String,
      enum: ["Fresher", "Junior", "Mid", "Senior"],
      required: true,
    },
    salary: { type: Number, required: true },
    contactEmail: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
