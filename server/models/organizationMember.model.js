import mongoose from "mongoose";

const organizationMemberSchema = new mongoose.Schema(
  {
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: [true, "Organization is required"],
    },

    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },

    loginId: {
      type: String,
      required: [true, "Login ID is required"],
      trim: true,
      uppercase: true,
      minlength: [3, "Login ID must be at least 3 characters"],
      maxlength: [50, "Login ID cannot exceed 50 characters"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },

    role: {
      type: String,
      enum: ["ADMIN", "MANAGER", "USER"],
      default: "USER",
    },
  },
  {
    timestamps: true,
  },
);

organizationMemberSchema.index(
  {
    organization: 1,
    loginId: 1,
  },
  {
    unique: true,
  },
);

const OrganizationMember = mongoose.model(
  "OrganizationMember",
  organizationMemberSchema,
);

export default OrganizationMember;
