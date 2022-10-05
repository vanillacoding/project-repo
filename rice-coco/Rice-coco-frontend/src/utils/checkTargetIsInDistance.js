const checkTargetIsInDistance = (targetPoint, sourcePoint, m) => {
  const km = m / 1000;
  const ky = 40000 / 360;
  const kx = Math.cos((Math.PI * sourcePoint.latitude) / 180.0) * ky;
  const dx = Math.abs(sourcePoint.longitude - targetPoint.longitude) * kx;
  const dy = Math.abs(sourcePoint.latitude - targetPoint.latitude) * ky;

  return Math.sqrt(dx * dx + dy * dy) <= km;
};

export default checkTargetIsInDistance;
