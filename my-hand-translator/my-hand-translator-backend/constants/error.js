const ERROR = {
  SIGNUP: {
    NO_EMAIL: "Email must be passed.",
    NO_NAME: "Name must be passed.",
    NO_KEYWORDS: "Keywords must be entered.",
    INVALID_EMAIL: "Email is invalid.",
    INVALID_NAME_LENGTH: "Username's length is invalid.",
    INVALID_KEYWORD_LENGTH: "Keyword's length is invalid.",
    REGISTERED_USER: "Already registered user.",
    CANNOT_CREATE_USER: "Error occurred while creating user.",
    CANNOT_CREATE_GLOSSARY: "Error occurred while creating glossary.",
    CANNOT_CREATE_OR_UPDATE_KEYWORD:
      "Error occurred while creating or updating keyword.",
  },
  LOGIN: {
    EMAIL_EMPTY: "Email must be passed.",
    EMAIL_INVALID: "Email is invalid.",
    UNAUTHORIZED_USER: "Unauthorized user.",
    GOOGLE_LOGIN_FAILED: "Google verifying process failed.",
  },
  TRANSLATIONS: {
    NO_TEXT: "Text must be passed.",
    NO_TRANSLATED: "Translated must be passed.",
    NO_URL: "URL must be passed.",
    NO_USER_ID: "User_id must be passed.",
    NO_PAGE: "Page must be passed.",
    NAN_PAGE: "Page must be number.",
    NAN_LIMIT: "Limit must be number.",
    INVALID_USER_ID: "User_id is invalid.",
    INVALID_TRANSLATED_ID: "Translated is invalid.",
    NO_ID: "Translation id must be passed.",
    NO_NANO_ID: "NanoId must be passed.",
    NO_CREATED_AT: "CreatedAt is invalid.",
  },
  GLOSSARY: {
    NO_GLOSSARY: "Glossary must be passed.",
    INVALID_GLOSSARY_TARGET_LENGTH: "Glossary's target length is invalid.",
    INVALID_ID: "Glossary's id is invalid.",
    NO_ID: "Glossary id must be passed.",
    NO_SEARCH_KEYWORD: "Search Keyword must be passed.",
  },
  DB: {
    UNKNOWN_DB_ERROR: "Unknown database error occurred.",
    MONGOOSE_ERROR: "Mongoose error occurred.",
  },
  SERVER: {
    INTERNAL_ERROR: "Internal server error.",
  },
  WORD: {
    NO_WORD: "Word must be passed.",
  },
};

module.exports = ERROR;
