export const commonErrorMessage = Object.freeze({
  INVALID_EMAIL: 'E-mail is invalid',
  INVALID_PASSWORD: 'Password is invalid',
});

export const registerErrorMessage = Object.freeze({
  INVALID_NAME: 'Name is invalid',
  INVALID_PASSWORDCONFIRM: 'Password confirm is not same as password',
  INVALID_COMPANYNAME: 'Company name is invalid',
  INVALID_COMPANYEMAIL: 'Company email is invalid',
  INVALID_COMPANYREGISTRATIONNUMBER: 'Company registration number is invalid',
});

export const createCampaignErrorMessage = Object.freeze({
  INVALID_TITLE: 'Title is invalid',
  INVALID_CAMPAIGNTYPE: 'Campaign type must be [banner, text, video]',
  INVALID_EXPIRESTYPE: 'Expires type must be [continue, expired]',
  INVALID_CONTENT: 'Content is invalid',
  INVALID_EXPIRESAT: 'ExpiresAt is invalid',
  INVALID_DAILYBUDGET: 'Daily budget is invalid',
});
