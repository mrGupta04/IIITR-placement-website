import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    mobileno: {
      type: String,
      required: [true, "Mobile number is required"],
      match: [/^[0-9]{10}$/, "Please provide a valid 10-digit mobile number"],
    },
    batch: {
      type: String,
      required: [true, "Batch is required"],
    },
    rollno: {
      type: String,
      required: [true, "Roll number is required"],
    },
    department: {
      type: String,
      required: [true, "Department is required"],
    },
    cgpa: {
      type: Number,
      required: [true, "CGPA is required"],
      min: [0, "CGPA cannot be less than 0"],
      max: [10, "CGPA cannot be more than 10"],
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: [true, "Gender is required"],
    },
    
    linkedin: {
      type: String,
      default: "",
    },
    github: {
      type: String,
      default: "",
    },
    leetcode: {
      type: String,
      default: "",
    },
    portfolio: {
      type: String,
      default: "",
    },
    preferredLocation: {
      type: String,
      default: "",
    },
    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Internship"],
      required: [true, "Job Type is required"],
    },
    profilepic: {
      type: String, // URL or file path for the profile picture
      default: null,
    },
    resume: {
      type: String, // URL or file path for the resume
      default: null,
    },
    skills: {
      type: [String], // List of skills
      default: [],
    },
    projects: [
      {
        title: { type: String, required: true },
        skillused: { type: String, required: true },
        description: { type: String, required: true },
        date: { type: Date, required: true },
      },
    ],
    workExperience: [
      {
        company: { type: String, required: true },
        jobTitle: { type: String, required: true },
        duration: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
    
    leadership: [
      {
        activity: { type: String, required: true },
        role: { type: String, required: true },
        duration: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    resetPasswordToken: {
      type: String,
      default: null,
    },
    resetPasswordExpire: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, 
  }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
