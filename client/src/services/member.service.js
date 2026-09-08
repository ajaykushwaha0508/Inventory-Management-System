import { axiosInstance } from "../lib/axiosClient";

export const createMember = async (organizationId, memberData) => {
  const response = await axiosInstance.post(
    `/organizations/${organizationId}/members`,
    memberData,
  );

  return response.data;
};

export const getOrganizationMembers = async (organizationId) => {
  const response = await axiosInstance.get(
    `/organizations/${organizationId}/members`,
  );

  return response.data;
};
