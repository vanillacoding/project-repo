import aws from './aws';
import { translate } from './kakao';

jest.mock('./kakao', () => ({
    translate: jest.fn(),
  }
));

const FAKE_KEYWORD = 'fakeKeyword';
const FAKE_DATA = {
  Labels: [{ Name: FAKE_KEYWORD } ],
};

describe('aws util test', () => {
  it('compareLabels should return true when data include keyword', async () => {
    translate.mockImplementation((input) => input);

    const result = await aws.compareLabels({ keyword: FAKE_KEYWORD, data: FAKE_DATA });
    expect(result).toEqual(true);
    return;
  });
});
