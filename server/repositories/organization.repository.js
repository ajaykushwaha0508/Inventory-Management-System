import Organization from "../models/organization.model.js";

export const createOrganization = async (organizationData) => {
  return await Organization.create(organizationData);
};

export const findOrganizationById = async (organizationId) => {
  return await Organization.findById(organizationId);
};

export const findOrganizationByName = async (name) => {
  return await Organization.findOne({
    name: name.trim(),
  });
};

export const updateOrganization = async (organizationId, organizationData) => {
  return await Organization.findByIdAndUpdate(
    organizationId,
    organizationData,
    {
      new: true,
      runValidators: true,
    },
  );
};

export const deleteOrganization = async (organizationId) => {
  return await Organization.findByIdAndDelete(organizationId);
};

export const findOrganizationByCode = async (code) => {
  return await Organization.findOne({
    code: code.trim().toUpperCase(),
  });
};
