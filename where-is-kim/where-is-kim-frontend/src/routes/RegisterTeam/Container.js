import React, { useRef } from "react";
import { connect } from "react-redux";
import RegisterTeam from "./RegisterTeam";
import useInput from "../../hooks/useInput";
import { registerTeamAPI } from "../../api";
import { updateUserTeam } from "../../actions";

function RegisterTeamContainer({ userId, history, updateUserTeam }) {
  const teamName = useInput("");
  const latitude = useInput("");
  const longitude = useInput("");
  const workOnTime = useInput("09:00");
  const workOffTime = useInput("18:00");
  const fileInput = useRef(null);
  const getCurrentLocation = (e) => {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition((pos) => {
      const { coords } = pos;
      latitude.setValue(coords.latitude);
      longitude.setValue(coords.longitude);
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const thumbnail = fileInput.current.files[0];
    const response = await registerTeamAPI(
      teamName.value,
      userId,
      latitude.value,
      longitude.value,
      workOnTime.value,
      workOffTime.value,
      thumbnail
    );

    const { result } = await response.json();

    if (result !== "error") {
      updateUserTeam(result);
      history.push("/");
    }
  };

  return (
    <RegisterTeam
      teamName={teamName}
      longitude={longitude}
      latitude={latitude}
      workOnTime={workOnTime}
      workOffTime={workOffTime}
      fileInput={fileInput}
      onSubmit={onSubmit}
      OnlocaButtonClick={getCurrentLocation}
    />
  );
}

const mapStateToProps = (state) => ({
  userId: state.user.id,
});
const mapDispatchToProps = (dispatch) => ({
  updateUserTeam: (team) => dispatch(updateUserTeam(team)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterTeamContainer);
