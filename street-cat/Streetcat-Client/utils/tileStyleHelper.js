const tileStyleHelper = (array) => {
  if (array.length !== 0  && array.length % 2 !== 0) {
    array.push({ name: 'blank', empty: true })
  }

  return array;
};

export default tileStyleHelper;
