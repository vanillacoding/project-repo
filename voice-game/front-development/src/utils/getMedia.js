/**
 *
 * @param {object} constraints Required media options to use
 * @returns mideaStream
 */
const getMedia = async (constraints) => {
  try {
    return await navigator.mediaDevices.getUserMedia(constraints);
  } catch (err) {
    console.error(err);
  }
};

export default getMedia;
