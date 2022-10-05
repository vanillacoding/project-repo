import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../reducers/user';

export default function useHeader() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  function handleLogoutClick() {
    dispatch(logout());
  }

  return {
    user,
    handleLogoutClick,
  };
}
