import bcrypt from "bcryptjs";

import {
  createMember,
  findMemberById,
  findMembersByOrganization,
  updateMember,
  deleteMember,
} from "../repositories/member.repository.js";

import { findOrganizationById } from "../repositories/organization.repository.js";

// Create Organization Member
export const createMemberService = async ({
  organizationId,
  userId,
  name,
  loginId,
  password,
  email,
  role,
}) => {
  const organization = await findOrganizationById(organizationId);

  if (!organization) {
    throw new Error("Organization not found");
  }

  // Only the Owner can create members
  if (organization.createdBy.toString() !== userId.toString()) {
    throw new Error("Only the organization owner can create members");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const member = await createMember({
    organization: organizationId,
    name: name.trim(),
    loginId: loginId.trim().toUpperCase(),
    password: hashedPassword,
    email: email ? email.trim().toLowerCase() : undefined,
    role,
  });

  // Never return password
  const memberResponse = member.toObject();

  delete memberResponse.password;

  return memberResponse;
};

// Get all members
export const getMembersService = async ({ organizationId, userId }) => {
  const organization = await findOrganizationById(organizationId);

  if (!organization) {
    throw new Error("Organization not found");
  }

  // Only Owner can view members
  if (organization.createdBy.toString() !== userId.toString()) {
    throw new Error("Only the organization owner can access members");
  }

  return await findMembersByOrganization(organizationId);
};

// Get one member
export const getMemberService = async ({
  organizationId,
  memberId,
  userId,
}) => {
  const organization = await findOrganizationById(organizationId);

  if (!organization) {
    throw new Error("Organization not found");
  }

  if (organization.createdBy.toString() !== userId.toString()) {
    throw new Error("Only the organization owner can access members");
  }

  const member = await findMemberById(memberId);

  if (!member) {
    throw new Error("Member not found");
  }

  // Make sure member belongs to this organization
  if (member.organization.toString() !== organizationId.toString()) {
    throw new Error("Member does not belong to this organization");
  }

  return member;
};

// Update member
export const updateMemberService = async ({
  organizationId,
  memberId,
  userId,
  name,
  email,
  password,
  role,
}) => {
  const organization = await findOrganizationById(organizationId);

  if (!organization) {
    throw new Error("Organization not found");
  }

  // Only Owner can update members
  if (organization.createdBy.toString() !== userId.toString()) {
    throw new Error("Only the organization owner can update members");
  }

  const member = await findMemberById(memberId);

  if (!member) {
    throw new Error("Member not found");
  }

  if (member.organization.toString() !== organizationId.toString()) {
    throw new Error("Member does not belong to this organization");
  }

  const updateData = {};

  if (name !== undefined) {
    updateData.name = name.trim();
  }

  if (email !== undefined) {
    updateData.email = email.trim().toLowerCase();
  }

  if (role !== undefined) {
    updateData.role = role;
  }

  if (password !== undefined) {
    updateData.password = await bcrypt.hash(password, 10);
  }

  return await updateMember(memberId, updateData);
};

// Delete member
export const deleteMemberService = async ({
  organizationId,
  memberId,
  userId,
}) => {
  const organization = await findOrganizationById(organizationId);

  if (!organization) {
    throw new Error("Organization not found");
  }

  // Only Owner can delete members
  if (organization.createdBy.toString() !== userId.toString()) {
    throw new Error("Only the organization owner can delete members");
  }

  const member = await findMemberById(memberId);

  if (!member) {
    throw new Error("Member not found");
  }

  if (member.organization.toString() !== organizationId.toString()) {
    throw new Error("Member does not belong to this organization");
  }

  await deleteMember(memberId);
};
