import Job from "../models/jobModel.js";

export const createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }

};

export const getAllJobs = async (req, res) => {
  try {
    const { location, jobType, salary, jobTitle } = req.query;
    let filter = {};

    if (location)
      filter.location = { $regex: location, $options: "i" };

    if (jobType && jobType !== "All")
      filter.jobType = jobType;

    if (salary)
      filter.salary = { $gte: Number(salary) };

    if (jobTitle)
      filter.jobTitle = { $regex: jobTitle, $options: "i" };

    const jobs = await Job.find(filter).sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs" });
  }
};

export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch {
    res.status(500).json({ message: "Error fetching job" });
  }
};

export const updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch {
    res.status(500).json({ message: "Error updating job" });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json({ message: "Job deleted successfully" });
  } catch {
    res.status(500).json({ message: "Error deleting job" });
  }
};
