import * as type from "../constants/actionTypes";

export const savePasswords = (passwords) => ({
  type: type.SAVE_PASSWORDS,
  passwords
});
