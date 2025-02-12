import mongoose from "mongoose";

const appliedJobSchema = new mongoose.Schema(
  {
    job_id: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    status: { 
      type: String, 
      enum: ["Pending", "Accepted", "Rejected"], 
      default: "Pending" 
    }
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
);

// Ensure the model is not recompiled (for Next.js Hot Module Replacement)
const AppliedJob = mongoose.models.AppliedJob || mongoose.model("AppliedJob", appliedJobSchema);

export default AppliedJob;
