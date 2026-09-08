import {
  createOrganizationSchema,
  updateOrganizationSchema,
} from "../validatorsSchema/organization.validator.js";

import {
  createOrganizationService,
  getOrganizationByIdService,
  updateOrganizationService,
  deleteOrganizationService,
  getOrganizationMembersService,
  getMyOrganizationsService,
} from "../services/organization.service.js";

export const createOrganization = async (req, res) => {
  const result = createOrganizationSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      errors: result.error.flatten(),
    });
  }

  const organization = await createOrganizationService({
    name: result.data.name,
    userId: req.user.userId,
    code: result.data.code,
  });

  return res.status(201).json({
    success: true,
    message: "Organization created successfully",
    data: organization,
  });
};

export const getMyOrganizations = async (req, res) => {
  const organizations = await getMyOrganizationsService(req.user.userId);

  return res.status(200).json({
    success: true,
    data: organizations,
  });
};

export const getOrganization = async (req, res) => {
  const organization = await getOrganizationByIdService({
    organizationId: req.params.id,
    userId: req.user.userId,
  });

  return res.status(200).json({
    success: true,
    data: organization,
  });
};

export const updateOrganization = async (req, res) => {
  const result = updateOrganizationSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      errors: result.error.flatten(),
    });
  }

  const organization = await updateOrganizationService({
    organizationId: req.params.id,
    userId: req.user.userId,
    name: result.data.name,
  });

  return res.status(200).json({
    success: true,
    message: "Organization updated successfully",
    data: organization,
  });
};

export const deleteOrganization = async (req, res) => {
  await deleteOrganizationService({
    organizationId: req.params.id,
    userId: req.user.userId,
  });

  return res.status(200).json({
    success: true,
    message: "Organization deleted successfully",
  });
};

export const getOrganizationMembers = async (req, res) => {
  const members = await getOrganizationMembersService({
    organizationId: req.params.id,
    userId: req.user.userId,
  });

  return res.status(200).json({
    success: true,
    data: members,
  });
};
