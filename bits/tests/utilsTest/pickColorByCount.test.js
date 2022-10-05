import pickColorByCount from '../../utils/pickColorByCount';

describe('Pick color by complete count', () => {
  it('Should return proper color hex cord', () => {
    const result = pickColorByCount(0);
    const result2 = pickColorByCount(1);
    const result3 = pickColorByCount(2);
    const result4 = pickColorByCount(3);

    expect(result).toEqual('#fff200');
    expect(result2).toEqual('#4cd137');
    expect(result3).toEqual('#00a8ff');
    expect(result4).toEqual('#7f8fa6');
  });
});
