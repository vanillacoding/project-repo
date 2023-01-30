import React, { useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import { BsCheckLg } from "react-icons/bs";

import StyledInput from "../shared/StyledInput";
import { createProject, editProject } from "../../api/projectApi";
import { DEFAULT_VALUES, MESSAGE, FORM } from "../../config/constants";
import theme from "../../config/constants/theme";

export default function ProjectForm({
  formType,
  toggleModal,
  currentProject,
  setCurrentProject,
}) {
  const [titleInput, setTitleInput] = useState(
    formType === FORM.EDIT ? currentProject.title : ""
  );
  const [projects, setProjects, sendToast] = useOutletContext();
  const { projectId } = useParams();
  const navigate = useNavigate();

  const handleCreateProject = async () => {
    try {
      if (!titleInput) {
        sendToast(MESSAGE.INVALID_INPUT);

        return;
      }

      const data = await createProject(titleInput);

      if (data.id) {
        navigate(`/console/projects/${data.id}`);
        sendToast(MESSAGE.PROJECT_SUCCESS_CREATE);
      } else {
        sendToast(MESSAGE.REQUEST_FAILED);
      }
    } catch (error) {
      navigate("/error");
    }
  };

  const handleEditProject = async () => {
    try {
      if (!titleInput) {
        sendToast(MESSAGE.INVALID_INPUT);

        return;
      }

      const data = await editProject(titleInput, projectId);

      if (data.result) {
        const modifiedProjects = projects.map((project) => {
          if (project._id === projectId) {
            const editedProject = { ...project, title: titleInput };
            setCurrentProject(editedProject);

            return editedProject;
          }

          return project;
        });

        setProjects(modifiedProjects);
        sendToast(MESSAGE.PROJECT_SUCCESS_EDIT);
      } else {
        sendToast(MESSAGE.REQUEST_FAILED);
      }
    } catch (error) {
      navigate("/error");
    }
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();

    if (formType === FORM.EDIT) {
      await handleEditProject();
    } else {
      await handleCreateProject();
    }

    toggleModal(false);
  };

  return (
    <Container>
      <h1>{formType === FORM.EDIT ? FORM.EDIT_TITLE : FORM.CREATE_TITLE}</h1>
      <form onSubmit={handleSubmitForm}>
        <InputContainer>
          <StyledInput
            type="text"
            name="title"
            value={titleInput}
            onChange={(event) => setTitleInput(event.target.value)}
            maxLength={DEFAULT_VALUES.PROJECT_TITLE_MAX_LENGTH}
            data-testid="projectInput"
          />
          <StyledText>
            {`(${DEFAULT_VALUES.PROJECT_TITLE_MAX_LENGTH}자 이내)`}
          </StyledText>
        </InputContainer>
        <StyledButton type="submit" data-testid="projectSubmit">
          <SubmitIcon />
        </StyledButton>
      </form>
    </Container>
  );
}

ProjectForm.propTypes = {
  formType: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
  currentProject: PropTypes.oneOfType([PropTypes.object]).isRequired,
  setCurrentProject: PropTypes.func.isRequired,
};

const Container = styled.div`
  padding-top: 3vh;
  text-align: center;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: baseline;
  margin-left: 68px;
`;

const StyledText = styled.p`
  font-size: 14px;
  text-align: right;
`;

const StyledButton = styled.button`
  display: inline;
  width: 60px;
  height: 42px;
  margin-top: 22px;
  margin-left: 350px;
  border: none;
  border-radius: 5px;
  background-color: ${theme.blue};
`;

const SubmitIcon = styled(BsCheckLg)`
  font-size: 26px;
  cursor: pointer;

  &:hover {
    background-color: ${theme.blue};
    color: ${theme.white};
    transition: all 1s ease;
  }
`;
