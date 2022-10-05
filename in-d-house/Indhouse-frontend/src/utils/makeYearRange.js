const makeYearRange = createdAt => {
  let startYear = new Date(createdAt).getFullYear() - 1;
  const currentYear = new Date().getFullYear();
  const yearDifference = currentYear - startYear;
  const yearRange = [];

  for (let i = 0; i < yearDifference; i++) {
    startYear += 1;

    yearRange.push(startYear);
  }

  return yearRange;
};

export default makeYearRange;
