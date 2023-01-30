import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";

import Sidebar from "./Sidebar";
import useToast from "../../hooks/useToast";
import { getAuthUser } from "../../api/authApi";

export default function ConsoleLayOut() {
  const [authUserData, setAuthUserData] = useState({});
  const [projects, setProjects] = useState([]);
  const [isProjectLoaded, setIsProjectLoaded] = useState(false);

  const [Toast, sendToast] = useToast();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthUserData = async () => {
      try {
        const data = await getAuthUser();

        if (data?.message) {
          navigate("/");

          return;
        }

        setAuthUserData(data);
        setProjects(data.projects);
      } catch (error) {
        navigate("/error");
      }
    };

    fetchAuthUserData();
  }, [navigate]);

  if (!authUserData?._id) {
    return <StyledLoading>콘솔 페이지로 이동합니다!</StyledLoading>;
  }

  return (
    <Container>
      <Sidebar authUserData={authUserData} />
      <Outlet
        context={[
          projects,
          setProjects,
          sendToast,
          setIsProjectLoaded,
          isProjectLoaded,
        ]}
      />
      {isProjectLoaded && <Toast />}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const StyledLoading = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  font-size: 60px;
  transform: translate(-50%, -50%);
`;
