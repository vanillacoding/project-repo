import { NAV } from '../../constant';
import navReducer, {
  setMenu,
  setSideMenuButtonStatus,
  closeSideMenuButtonStatus,
  openSideMenuButtonStatus,
} from './navSlice';

describe('nav reducer', () => {
  const initialState = {
    status: 'none',
    isSideMenuOpen: false,
  };

  it('should handle initial state', () => {
    expect(navReducer(undefined, { type: 'unknown' })).toEqual({
      status: 'none',
      isSideMenuOpen: false,
    });
  });

  it('should handle set menu', () => {
    const actual = navReducer(initialState, setMenu(NAV.ALGORITHMS));
    expect(actual.status).toEqual(NAV.ALGORITHMS);
  });

  it('should handle set side menu button status', () => {
    const actual = navReducer(initialState, setSideMenuButtonStatus());
    expect(actual.isSideMenuOpen).toEqual(true);
  });

  it('should handle close side menu button status', () => {
    const actual = navReducer(initialState, closeSideMenuButtonStatus());
    expect(actual.isSideMenuOpen).toEqual(false);
  });

  it('should handle open side menu button status', () => {
    const actual = navReducer(initialState, openSideMenuButtonStatus());
    expect(actual.isSideMenuOpen).toEqual(true);
  });
});
