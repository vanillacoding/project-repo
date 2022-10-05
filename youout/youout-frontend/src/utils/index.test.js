import {
  getUserLocation,
  convertMsToMinutes,
  convertMsToSeconds,
  convertTimeToMs,
  convertTimeFormat,
} from './index';
import { MOCK_LAT, MOCK_LNG } from '../setupTests';

describe('utils test', () => {
  it('getUserLocation test', async () => {
    const { lat, lng } = await getUserLocation();

    expect(lat).toEqual(MOCK_LAT);
    expect(lng).toEqual(MOCK_LNG);

    return;
  });

  it('convertMsToMinutes test', () => {
    expect(convertMsToMinutes(60000)).toEqual(1);
    expect(convertMsToMinutes(120000)).toEqual(2);
    expect(convertMsToMinutes(130000)).toEqual(2);
  });

  it('convertMsToSeconds test', () => {
    expect(convertMsToSeconds(1000)).toEqual(1);
    expect(convertMsToSeconds(59000)).toEqual(59);
    expect(convertMsToSeconds(61000)).toEqual(1);
  });

  it('convertTimeToMs test', () => {
    const minutes = 1;
    const seconds = 1;
    expect(convertTimeToMs(minutes, seconds)).toEqual(61000);
  });

  it('convertTimeFormat test', () => {
    const minutes = 1;
    const seconds = 1;
    expect(convertTimeFormat(minutes, seconds)).toEqual('01:01');
  });
});
