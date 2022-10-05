const makeDataToQuery = ({ type, key, data }) => {
  let query = "";

  data.forEach(target => {
    if (!target[key]) return;

    query += `${type}=${target[key]}&`;
  });

  return query;
};

export default makeDataToQuery;
