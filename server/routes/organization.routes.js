import express from "express";

import {
  createOrganization,
  getMyOrganizations,
  getOrganization,
  updateOrganization,
  deleteOrganization,
  getOrganizationMembers,
} from "../controllers/organization.controller.js";

const router = express.Router();

router.post("/", createOrganization);

router.get("/", getMyOrganizations);

router.get("/:id", getOrganization);

router.put("/:id", updateOrganization);

router.delete("/:id", deleteOrganization);

router.get("/:id/members", getOrganizationMembers);

export default router;
