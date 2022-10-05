import convertTimeStrToSec from '../../utils/convertTimeStrToSec';

describe('convert timeString to seconds', () => {
  it('Should return seconds', () => {
    const result = convertTimeStrToSec('100 s');
    const result2 = convertTimeStrToSec('137 s');
    const result3 = convertTimeStrToSec('3333 s');

    expect(result).toEqual(100);
    expect(result2).toEqual(137);
    expect(result3).toEqual(3333);
  });

  it('Should return minutes to seconds', () => {
    const result = convertTimeStrToSec('30 m');
    const result2 = convertTimeStrToSec('100 m');
    const result3 = convertTimeStrToSec('2000 m');

    expect(result).toEqual(1800);
    expect(result2).toEqual(6000);
    expect(result3).toEqual(120000);
  });

  it('Should return hours to seconds', () => {
    const result = convertTimeStrToSec('2 h');
    const result2 = convertTimeStrToSec('10 h');
    const result3 = convertTimeStrToSec('30 h');

    expect(result).toEqual(7200);
    expect(result2).toEqual(36000);
    expect(result3).toEqual(108000);
  });
});
