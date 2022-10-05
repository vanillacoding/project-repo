/**
 *
 * @param {object} option Option for audioContext
 * @returns Created audioContext
 */
const getAudioContext = (option) => {
  return new (window.AudioContext || window.webkitAudioContext)(option);
};

export default getAudioContext;
