import pickTextByType from '../../utils/pickTextByType';
import { STRINGS } from '../../constants/index';

describe('Pick text by type', () => {
  it('Should return proper habit text in KR', () => {
    const result = pickTextByType(STRINGS.CODE);
    const result2 = pickTextByType(STRINGS.READ);
    const result3 = pickTextByType(STRINGS.SWIM);
    const result4 = pickTextByType(STRINGS.MEDITATE);
    const result5 = pickTextByType(STRINGS.RUN);
    const result6 = pickTextByType(STRINGS.BICYCLE);
    const result7 = pickTextByType(STRINGS.YOGA);

    expect(result).toEqual(STRINGS.CODE_KR);
    expect(result2).toEqual(STRINGS.READ_KR);
    expect(result3).toEqual(STRINGS.SWIM_KR);
    expect(result4).toEqual(STRINGS.MEDITATE_KR);
    expect(result5).toEqual(STRINGS.RUN_KR);
    expect(result6).toEqual(STRINGS.BICYCLE_KR);
    expect(result7).toEqual(STRINGS.YOGA_KR);
  });
});
