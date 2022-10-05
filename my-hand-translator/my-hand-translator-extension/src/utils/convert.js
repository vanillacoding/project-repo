export const convertCsvToJson = (csv) => {
  const result = {};
  const pairs = csv.split("\r\n");

  for (let i = 0; i < pairs.length - 1; i += 1) {
    const [text, translation] = pairs[i].split(",");
    result[text] = translation;
  }

  return result;
};

export const convertObjectToCsv = (object) => {
  const glossaryKeys = Object.keys(object);
  let csv = "";

  for (let i = 0; i < glossaryKeys.length; i += 1) {
    const key = glossaryKeys[i];

    csv += `${key},${object[key]}\r\n`;
  }

  return csv;
};
