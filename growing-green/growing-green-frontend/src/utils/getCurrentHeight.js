export const getCurrentHeight = (temp, height) => {
  const borderWidth = 7;
  const totalTemperature = 70;
  const minusTemperature = 30;

  return (
    ((Number(temp) + minusTemperature) / totalTemperature) * height +
    borderWidth
  );
};
