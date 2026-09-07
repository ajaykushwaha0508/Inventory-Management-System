import express from "express";

import {
  createMember,
  getMembers,
  getMember,
  updateMember,
  deleteMember,
} from "../controllers/member.controller.js";

const router = express.Router();

// Create member
router.post("/:organizationId/members", createMember);

// Get all members
router.get("/:organizationId/members", getMembers);

// Get one member
router.get("/:organizationId/members/:memberId", getMember);

// Update member
router.put("/:organizationId/members/:memberId", updateMember);

// Delete member
router.delete("/:organizationId/members/:memberId", deleteMember);

export default router;
