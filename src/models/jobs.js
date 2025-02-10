import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    jobType: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    email: { 
      type: String, 
      required: true, 
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"] 
    },
    location: { type: String, required: true, trim: true },
    salary: { type: String, required: true }, // Changed to Number
    description: { type: String, required: true },
    duration: { type: String, required: true },
    skills: { type: [String], default: [] },
    eligibleBatch: { type: [String], default: [] },
    eligibleBranch: { type: [String], default: [] },
    status:{type:String}
  },
  { timestamps: true }
);

// Check if the model is already compiled (for Hot Module Replacement in Next.js)
const Job = mongoose.models.Job || mongoose.model("Job", jobSchema);

export default Job;
