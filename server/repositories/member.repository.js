import OrganizationMember from "../models/organizationMember.model.js";

export const createMember = async (memberData) => {
  return await OrganizationMember.create(memberData);
};

export const findMemberByLoginId = async (loginId) => {
  return await OrganizationMember.findOne({
    loginId: loginId.toUpperCase(),
  });
};

export const findMemberById = async (memberId) => {
  return await OrganizationMember.findById(memberId).select("-password");
};

export const findMemberByLoginIdAndOrganization = async ({
  loginId,
  organizationId,
}) => {
  return await OrganizationMember.findOne({
    loginId: loginId.toUpperCase(),
    organization: organizationId,
  });
};

export const findMembersByOrganization = async (organizationId) => {
  return await OrganizationMember.find({
    organization: organizationId,
  })
    .select("-password")
    .sort({ createdAt: -1 });
};

export const updateMember = async (memberId, memberData) => {
  return await OrganizationMember.findByIdAndUpdate(memberId, memberData, {
    new: true,
    runValidators: true,
  }).select("-password");
};

export const deleteMember = async (memberId) => {
  return await OrganizationMember.findByIdAndDelete(memberId);
};

export const deleteMembersByOrganization = async (organizationId) => {
  return await OrganizationMember.deleteMany({
    organization: organizationId,
  });
};
