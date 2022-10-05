import React from "react";
import Admin from "./Admin";
import { connect } from "react-redux";

function AdminContainer({ isAdmin }) {
  return <Admin isAdmin={isAdmin} />;
}

const mapStateToProps = (state) => ({
  isAdmin: state.ui.admin.isAdmin,
});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AdminContainer);
