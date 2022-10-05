const getDate = (date) => {
  const dateFormat = new Date(date).toLocaleDateString("ko-KR").slice(0, -1);

  return dateFormat;
};

export default getDate;
