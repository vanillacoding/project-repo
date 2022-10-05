import Lobby from "./Lobby";
import { connect } from "react-redux";
import { getToken } from "../../thunks";
import { logout } from "../../actions";

const mapStateToProps = (state) => ({
  isLogin: state.ui.lobby.isLogin,
  teams: state.user.allTeamIds.map((id) => state.user.teamById[id]),
});
const mapDispatchToProps = (dispatch) => ({
  login: (email, password) => dispatch(getToken(email, password)),
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
