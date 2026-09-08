import { axiosInstance } from "../lib/axiosClient";

export const registerOwner = async ({
  name,
  email,
  password,
  organizationName,
  organizationCode,
}) => {
  const response = await axiosInstance.post("/auth/register", {
    name,
    email,
    password,
    organizationName,
    organizationCode,
  });

  return response.data;
};

export const loginOwner = async ({ email, password }) => {
  const response = await axiosInstance.post("/auth/login", {
    email,
    password,
  });

  return response.data;
};

export const loginMember = async ({ organizationCode, loginId, password }) => {
  const response = await axiosInstance.post("/auth/member-login", {
    organizationCode,
    loginId,
    password,
  });

  return response.data;
};
