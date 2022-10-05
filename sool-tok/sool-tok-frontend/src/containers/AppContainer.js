import { connect } from 'react-redux';

import * as userSelector from '../redux/user/user.selectors';
import { loginUserStart } from '../redux/user/user.actions';

import App from '../components/App';

const mapStateToProps = state => ({
  user: userSelector.selectCurrentUser(state),
});

const mapDispatchToProps = dispatch => ({
  loginUserWithToken: () => dispatch(loginUserStart('token')),
  loginUserWithGoogle: () => dispatch(loginUserStart('google')),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
