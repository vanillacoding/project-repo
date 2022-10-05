/**
 * @function it returns date list from specific year and month
 * @params {String} year
 * @params {String} month
 * @return {Array} date list
 */

const getDateFromMonth = (year, month) => {
  const date = [];
  let total = 31;

  switch (month) {
    case "4":
    case "6":
    case "9":
    case "11":
      total = 30;
      break;

    case "2":
      total = parseInt(year, 10) % 4 === 0 ? 29 : 28;
      break;
    default:
      break;
  }

  for (let i = 0; i < total; i++) {
    date.push(`${i + 1}`);
  }

  return date;
};

export default getDateFromMonth;
