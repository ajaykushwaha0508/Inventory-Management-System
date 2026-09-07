import {
  createOrganization,
  findOrganizationById,
  findOrganizationByName,
  findOrganizationByCode,
  updateOrganization,
  deleteOrganization,
} from "../repositories/organization.repository.js";

import {
  findMembersByOrganization,
  deleteMembersByOrganization,
} from "../repositories/member.repository.js";

// ========================================
// Create Organization
// ========================================

// Only Owner creates an organization.
export const createOrganizationService = async ({ name, code, userId }) => {
  const normalizedName = name.trim();

  const normalizedCode = code.trim().toUpperCase();

  // Check organization name
  const existingOrganizationByName =
    await findOrganizationByName(normalizedName);

  if (existingOrganizationByName) {
    throw new Error("Organization with this name already exists");
  }

  // Check organization code
  const existingOrganizationByCode =
    await findOrganizationByCode(normalizedCode);

  if (existingOrganizationByCode) {
    throw new Error("Organization code already exists");
  }

  // Create organization
  return await createOrganization({
    name: normalizedName,
    code: normalizedCode,
    createdBy: userId,
  });
};

// ========================================
// Get Organization
// ========================================

export const getOrganizationByIdService = async ({
  organizationId,
  userId,
}) => {
  const organization = await findOrganizationById(organizationId);

  if (!organization) {
    throw new Error("Organization not found");
  }

  // Check Owner
  if (organization.createdBy.toString() === userId.toString()) {
    return organization;
  }

  throw new Error("You are not authorized to access this organization");
};

// ========================================
// Update Organization
// ========================================

// Only Owner can update organization.
export const updateOrganizationService = async ({
  organizationId,
  userId,
  name,
}) => {
  const organization = await findOrganizationById(organizationId);

  if (!organization) {
    throw new Error("Organization not found");
  }

  // Check Owner
  if (organization.createdBy.toString() !== userId.toString()) {
    throw new Error("Only the organization owner can update the organization");
  }

  // Check duplicate organization name
  const existingOrganization = await findOrganizationByName(name);

  if (
    existingOrganization &&
    existingOrganization._id.toString() !== organizationId.toString()
  ) {
    throw new Error("Organization with this name already exists");
  }

  return await updateOrganization(organizationId, {
    name: name.trim(),
  });
};

// ========================================
// Delete Organization
// ========================================

// Only Owner can delete organization.
export const deleteOrganizationService = async ({ organizationId, userId }) => {
  const organization = await findOrganizationById(organizationId);

  if (!organization) {
    throw new Error("Organization not found");
  }

  // Check Owner
  if (organization.createdBy.toString() !== userId.toString()) {
    throw new Error("Only the organization owner can delete the organization");
  }

  // Delete all members first
  await deleteMembersByOrganization(organizationId);

  // Delete organization
  await deleteOrganization(organizationId);
};

// ========================================
// Get Organization Members
// ========================================

export const getOrganizationMembersService = async ({
  organizationId,
  userId,
}) => {
  const organization = await findOrganizationById(organizationId);

  if (!organization) {
    throw new Error("Organization not found");
  }

  // Only Owner can currently
  // manage/view members.
  if (organization.createdBy.toString() !== userId.toString()) {
    throw new Error("Only the organization owner can access members");
  }

  return await findMembersByOrganization(organizationId);
};
