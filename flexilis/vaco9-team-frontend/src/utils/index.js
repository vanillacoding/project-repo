const KILO_BYTE = 1024;

export const checkFileSize = (file) => {
  return file.size > 1024 * KILO_BYTE ? false : true;
};
