import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Organization name is required"],
      unique: true,
      trim: true,
      minlength: [2, "Organization name must be at least 2 characters"],
      maxlength: [100, "Organization name cannot exceed 100 characters"],
    },

    code: {
      type: String,
      required: [true, "Organization code is required"],
      unique: true,
      uppercase: true,
      trim: true,
      minlength: [3, "Organization code must be at least 3 characters"],
      maxlength: [20, "Organization code cannot exceed 20 characters"],
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Created by user is required"],
    },
  },
  {
    timestamps: true,
  },
);

const Organization = mongoose.model("Organization", organizationSchema);

export default Organization;
