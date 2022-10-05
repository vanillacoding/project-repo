import { ALL } from "../constants/languages";

const getQuery = (addedQuery, defaultQuery) => {
  const queryList = {};

  if (defaultQuery) {
    const queries = defaultQuery.slice(1).split("&");

    for (let i = 0; i < queries.length; i++) {
      const query = queries[i].split("=");

      queryList[query[0]] = query[1];
    }
  }

  const query = addedQuery.split("=");

  queryList[query[0]] = query[1];

  if (query[1] === ALL) {
    delete queryList[query[0]];
  }

  const queries = Object.entries(queryList);

  for (let i = 0; i < queries.length; i++) {
    const separator = i ? "&" : "?";

    queries[i] = `${separator}${queries[i].join("=")}`;
  }

  const queryString = `/${queries.join("")}`;

  return queryString;
};

export default getQuery;
