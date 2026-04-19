export const formatCurrency = (amount) => {
  return `INR ${Number(amount).toFixed(2)}`;
};

export const shortId = (id) => {
  return id?.slice(0, 6) + "...";
};