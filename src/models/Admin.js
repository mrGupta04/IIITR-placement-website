import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const RecruiterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    mobileno: {
      type: String,
      required: [true, "Mobile number is required"],
      unique: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    aboutCompany: {
      type: String,
      required: true,
    },
    industryType: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
    profilepic: {
      type: String,
      default: null, 
    },
    logo: {
      type: String,
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);


RecruiterSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


RecruiterSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


const Recruiter = mongoose.models.Admin || mongoose.model("recruiters", RecruiterSchema);
export default Recruiter;
