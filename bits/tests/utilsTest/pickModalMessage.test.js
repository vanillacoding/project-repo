import pickModalMessage from '../../utils/pickModalMessage';
import { MESSAGE, STRINGS } from '../../constants/index';

describe('Pick modal message by message type', () => {
  it('Should return proper color hex cord', () => {
    const result = pickModalMessage(STRINGS.NONE);
    const result2 = pickModalMessage(STRINGS.INVALID_EMAIL);
    const result3 = pickModalMessage(STRINGS.PASSWORD_MISMATCH);

    expect(result).toEqual(MESSAGE.REGISTER_ALL_INFOS);
    expect(result2).toEqual(MESSAGE.INVALID_EMAIL_FORM);
    expect(result3).toEqual(MESSAGE.PASSWORD_MISMATCH_KR);
  });
});

