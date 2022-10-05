const NUMBER = {
  ONEDAY: 1000 * 60 * 60 * 24,
  PRESCRIPTION_PER_PAGE: 7,
};

const USER_TYPE = {
  PHARMACIST: "pharmacist",
  PATIENT: "patient",
};

const MESSAGE = {
  INVALID_USER_DATA: "invalid user information",
  INVALID_PRESCRIPTION_DATA: "invalid prescription data",
  INVALID_PRESCRIPTION_ID: "invalid prescription id",
  INVALID_PUSH_NOTIFICATION_TOKEN: "invalid push notification token",
  INVALID_DOSE_HISTORY: "invalid dose history",
  INVALID_MEDICINE_NAME: "invalid medicine name",
  INVALID_INFORMATION: "invalid information",
  INVALID_ACCESS: "invalid access",
  UNAUTHORIZED_USER: "Unauthorized user",
  LOGOUT_SUCCESS: "logged out successfully",
  AUTHORIZED: "user authorized successfully",
};

module.exports = { NUMBER, USER_TYPE, MESSAGE };
