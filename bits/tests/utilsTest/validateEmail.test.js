import validateEmail from '../../utils/validateEmail';

describe('Validate email', () => {
  it('Should return boolean result depending on email input', () => {
    const email = 'test.fake';
    const email2 = 'test@fake'
    const email3 = 'test'
    const email4 = 'test@test.com';

    const result = validateEmail(email);
    const result2 = validateEmail(email2);
    const result3 = validateEmail(email3);
    const result4 = validateEmail(email4);

    expect(result).toEqual(false);
    expect(result2).toEqual(false);
    expect(result3).toEqual(false);
    expect(result4).toEqual(true);
  });
});
