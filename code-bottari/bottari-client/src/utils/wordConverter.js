const wordConverter = (value) => {
  const query = `?search=${value.split("#").slice(1).map((value)=>`%23${value}`).join("+")}`;

  return query;
};

export default wordConverter;
