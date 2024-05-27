export const getYearObjects = (startYear: number) => {
  const currentYear = new Date().getFullYear();
  const yearArray = [];

  for (let year = startYear; year <= currentYear; year++) {
    yearArray.push({
      label: year.toString(),
      value: year.toString(),
    });
  }

  return yearArray;
};
