import modal, { initialState, toggle } from '../../modules/modal';

describe('reducer <modal>', () => {
  describe('should handle action', () => {
    it('case: TOGGLE', () => {
      expect(modal(initialState, toggle())).toBe(true);

      expect(modal(true, toggle())).toBe(false);
    });
  });
});
