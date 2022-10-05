import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import useToken from "../hooks/useToken";
import { finishInterview, getInterviewee } from "../redux/reducers/interviewees";
import { addMyProject, getJoinedProjects, getMyProjects } from "../redux/reducers/projects";
import { loginUser } from "../redux/reducers/user";

export default function Dummy() {
  const { token, setToken } = useToken();
  const history = useHistory();

  useEffect(() => {
    
  }, []);

  const dispatch = useDispatch();

  function handleLoginClick() {
    dispatch(loginUser({
      email: "hayeong28@naver.com",
      imgURL: "dfdsfasf",
      name: "최하영",
    }));
  }

  function handleGetMyProjectsClick() {
    dispatch(getMyProjects("userId"));
  }

  function handleGetJoinedProjectsClick() {
    dispatch(getJoinedProjects("userId"));
  }

  function handleAddMyProjectClick() {
    dispatch(addMyProject({
      userId: "asdfasdf",
      newProject: {
        title: "test",
        filter: ["컬쳐핏", "커뮤니케이션"],
        creator: "asdfasdf",
        participants: ["interviewer1", "interviewer2"],
      },
    }));
  }

  function handleGetIntervieweeClick() {
    dispatch(getInterviewee({
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im15UHJvamVjdHMiOlsiNjA3ZThlZThjMGQ2NGEwYjkwNjM5MmZlIiwiNjA3ZWE4ZGMwNmE0MDU1YTMxNWFkMGNjIiwiNjA4M2JmMDkxYmMzOGU3ZTNmMGE0YmM4IiwiNjA4M2MzN2IxYmMzOGU3ZTNmMGE0YmM5IiwiNjA4NDdhZTdiYjQyM2VhODc4YmM1NGI5IiwiNjA4NTFkMzU1YjUxOTZjYTU2M2M5OTY5IiwiNjA4NTFkNDE1YjUxOTZjYTU2M2M5OTZhIiwiNjA4NTFkNDQ1YjUxOTZjYTU2M2M5OTZiIiwiNjA4NTFkNDg1YjUxOTZjYTU2M2M5OTZjIiwiNjA4NTFkNGI1YjUxOTZjYTU2M2M5OTZkIiwiNjA4NTFkNGU1YjUxOTZjYTU2M2M5OTZlIiwiNjA4NTFkNTE1YjUxOTZjYTU2M2M5OTZmIiwiNjA4NTFkNTU1YjUxOTZjYTU2M2M5OTcwIiwiNjA4NTFkNTk1YjUxOTZjYTU2M2M5OTcxIiwiNjA4NTVkNmQ1YjUxOTZjYTU2M2M5OTc0IiwiNjA4NTdkMWMyZjRmMDA4NWJlMzFiZTM3Il0sImpvaW5lZFByb2plY3RzIjpbIjYwN2U4ZjJiYzBkNjRhMGI5MDYzOTJmZiIsIjYwN2U4ZjMyYzBkNjRhMGI5MDYzOTMwMCIsIjYwODEwYTI3MzE1ZDA3MGYzNzI0OGIxMSJdLCJfaWQiOiI2MDdkNWYyMWE2OTg1NWY4Y2Y5NzZiZDYiLCJlbWFpbCI6ImhheWVvbmcyOEBnbWFpbC5jb20iLCJhdmF0YXIiOiJodHRwczovL2xoNS5nb29nbGV1c2VyY29udGVudC5jb20vLUhROEtycUM5QUJnL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFBL0FNWnV1Y2t3RmFPVEZMVEpLcDgyNFh4dXJENy1zWU9MUVEvczk2LWMvcGhvdG8uanBnIiwidXNlcm5hbWUiOiLstZztlZjsmIEiLCJfX3YiOjB9LCJpYXQiOjE2MTk0MzU2MjEsImV4cCI6MTYxOTUyMjAyMX0.60TuioVeDDVuPWHLbNCrhzMxycfDXODhnjQOBw2eHxM",
      projectId: "60847ae7bb423ea878bc54b9",
      intervieweeId: "60847c78bb423ea878bc54c0",
    }));
  }

  return (
    <div>
      <button onClick={handleLoginClick}>login</button>
      <button onClick={handleGetMyProjectsClick}>get my projects</button>
      <button onClick={handleGetJoinedProjectsClick}>get joined project</button>
      <button onClick={handleAddMyProjectClick}>add my project</button>
      <button onClick={handleGetIntervieweeClick}>get interviewee</button>
    </div>
  );
}
