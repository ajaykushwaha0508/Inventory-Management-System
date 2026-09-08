import bcrypt from "bcryptjs";

import {
  createUser,
  findUserByEmail,
  findUserById,
} from "../repositories/user.repository.js";

import {
  createOrganization,
  findOrganizationByCode,
} from "../repositories/organization.repository.js";

import { findMemberByLoginIdAndOrganization } from "../repositories/member.repository.js";

import { generateToken } from "../utils/jwt.js";

export const registerUser = async ({
  name,
  email,
  password,
  organizationName,
  organizationCode,
}) => {
  const normalizedEmail = email.toLowerCase().trim();

  const existingUser = await findUserByEmail(normalizedEmail);

  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await createUser({
    name: name.trim(),
    email: normalizedEmail,
    password: hashedPassword,
  });

  const organization = await createOrganization({
    name: organizationName.trim(),
    createdBy: user._id,
    code: organizationCode,
  });

  return {
    user,
    organization,
  };
};

export const loginOwner = async ({ email, password }) => {
  const normalizedEmail = email.toLowerCase().trim();

  const user = await findUserByEmail(normalizedEmail);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken({
    userId: user._id.toString(),
    role: "ADMIN",
  });

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      accountType: "OWNER",
    },
  };
};

export const loginMember = async ({ organizationCode, loginId, password }) => {
  const organization = await findOrganizationByCode(organizationCode);

  if (!organization) {
    throw new Error("Invalid organization code");
  }

  const member = await findMemberByLoginIdAndOrganization({
    loginId,
    organizationId: organization._id,
  });

  if (!member) {
    throw new Error("Invalid Login ID or password");
  }

  const isPasswordValid = await bcrypt.compare(password, member.password);

  if (!isPasswordValid) {
    throw new Error("Invalid Login ID or password");
  }

  const token = generateToken({
    memberId: member._id.toString(),

    organizationId: member.organization.toString(),

    role: member.role,

    accountType: "MEMBER",
  });

  return {
    token,

    member: {
      id: member._id,
      name: member.name,
      loginId: member.loginId,
      organizationId: member.organization,
      role: member.role,
      accountType: "MEMBER",
    },
  };
};

export const getCurrentUser = async (userId) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};
