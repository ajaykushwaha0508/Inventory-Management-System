import { axiosInstance } from "../lib/axiosClient";

export const getMyOrganizationsService = async () => {
  const response = await axiosInstance.get("/organizations");

  return response.data;
};
