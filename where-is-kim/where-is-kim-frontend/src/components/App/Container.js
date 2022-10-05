import { connect } from "react-redux";
import App from "./App";

const mapStateToProps = (state) => ({
  isLogin: state.ui.lobby.isLogin,
});

export default connect(mapStateToProps)(App);
