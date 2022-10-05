import { IHistoryFormData, IVisit } from "../../types/history.d";

const filterVisits = (visits: IVisit[], { start, end, domain }: IHistoryFormData) => {
  const ONE_DAY = 1000 * 60 * 60 * 24;
  const UTC_SEOUL_HOUR_DIFFERENCE = 1000 * 60 * 60 * 9;
  let filteredVisits = visits;

  if (start && end) {
    filteredVisits = filteredVisits.filter(({ visitTime }) => {
      const current = new Date(visitTime).getTime() + UTC_SEOUL_HOUR_DIFFERENCE;

      return new Date(start).getTime() <= current && current < new Date(end).getTime() + ONE_DAY;
    });
  }

  if (domain) {
    filteredVisits = filteredVisits.filter(
      ({ targetUrl, sourceUrl }) =>
        new URL(targetUrl).origin.includes(domain) ||
        (sourceUrl && new URL(sourceUrl).origin.includes(domain)),
    );
  }

  return filteredVisits;
};

export default filterVisits;
