export const calculateSavingsSummary = (entries) => {
  let totalSavings = 0;

  entries.forEach((e) => {
    if (e.type === "saving") {
      totalSavings += Number(e.amount);
    }
  });

  return totalSavings;
};