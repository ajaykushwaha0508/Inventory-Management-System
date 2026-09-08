export const formatLocalDate = (date) => {
  if (!date) return "-";

  return new Date(date).toLocaleString();
};
