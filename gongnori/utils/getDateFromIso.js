/**
 * @function it returns date list from specific iso string
 * @params {String} isoDate - ISO 8601 format (e.g YYYY-MM-DDTHH:mm:ss.sssZ)
 * @return {Array} - date list of year, month, date, hour and minute
 */

const getDateFromIso = (isoDate) => {
  const dates = new Date(isoDate);

  const year = dates.getFullYear();
  const month = dates.getMonth() + 1;
  const date = dates.getDate();
  const hour = dates.getHours();
  const minute = dates.getMinutes();

  return [year, month, date, hour, minute];
};

export default getDateFromIso;
