import React, { useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import { MdAddCircle, MdOutlineEdit, MdOutlineDelete } from "react-icons/md";

import ProjectHeaderDropdown from "./ProjectHeaderDropdown";
import ProjectForm from "./ProjectForm";
import useModal from "../../hooks/useModal";
import { deleteProject } from "../../api/projectApi";
import { FORM, MESSAGE } from "../../config/constants";
import theme from "../../config/constants/theme";

export default function ProjectHeader({ currentProject, setCurrentProject }) {
  const [formType, setFormType] = useState("");

  const [projects, setProjects, sendToast] = useOutletContext();
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [Modal, toggleModal] = useModal();

  const handleDeleteProject = async () => {
    try {
      if (!projectId) {
        sendToast(MESSAGE.BAD_REQUEST);

        return;
      }

      const response = await deleteProject(projectId);

      if (response.result) {
        const filteredProjects = projects.filter(
          (project) => project._id !== projectId
        );

        if (!filteredProjects?.length) {
          navigate("/console/projects", { replace: true });
        } else {
          navigate(`/console/projects/${filteredProjects[0]._id}`, {
            replace: true,
          });
        }

        setProjects(filteredProjects);
        sendToast(MESSAGE.PROJECT_SUCCESS_DELETE);
      } else {
        sendToast(MESSAGE.REQUEST_FAILED);
      }
    } catch (error) {
      navigate("/error");
    }
  };

  const handleModalOpen = (event) => {
    event.preventDefault();

    const { name: eventType } = event.currentTarget;

    if (!projectId && eventType === FORM.EDIT) {
      sendToast(MESSAGE.BAD_REQUEST);

      return;
    }

    setFormType(eventType);
    toggleModal();
  };

  return (
    <Container>
      <StyledButton
        type="button"
        name={FORM.CREATE}
        onClick={handleModalOpen}
        data-testid="project-create-button"
      >
        <AddIcon />
      </StyledButton>
      <ProjectHeaderDropdown />
      <StyledButton
        type="button"
        name={FORM.EDIT}
        onClick={handleModalOpen}
        data-testid="project-edit-button"
      >
        <EditIcon />
      </StyledButton>
      <StyledButton>
        <DeleteIcon
          onClick={handleDeleteProject}
          data-testid="project-delete-button"
        />
      </StyledButton>
      <Modal>
        <ProjectForm
          formType={formType}
          toggleModal={toggleModal}
          currentProject={currentProject}
          setCurrentProject={setCurrentProject}
        />
      </Modal>
    </Container>
  );
}

ProjectHeader.propTypes = {
  currentProject: PropTypes.oneOfType([PropTypes.object]).isRequired,
  setCurrentProject: PropTypes.func.isRequired,
};

const Container = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 20vw;
  min-width: 400px;
  height: 60px;
  padding: 0px 8px;
`;

const StyledButton = styled.button`
  border: none;
  background: none;
`;

const AddIcon = styled(MdAddCircle)`
  flex: 1;
  margin-right: 0.7vw;
  font-size: 34px;
  cursor: pointer;

  &:hover {
    background-color: ${theme.blue};
    color: ${theme.white};
    transition: all 1s ease;
  }
`;

const EditIcon = styled(MdOutlineEdit)`
  flex: 1;
  margin-right: 0.7vw;
  font-size: 34px;
  cursor: pointer;

  &:hover {
    background-color: ${theme.blue};
    color: ${theme.white};
    transition: all 1s ease;
  }
`;

const DeleteIcon = styled(MdOutlineDelete)`
  flex: 1;
  margin-right: 0.7vw;
  font-size: 34px;
  cursor: pointer;

  &:hover {
    background-color: ${theme.blue};
    color: ${theme.white};
    transition: all 1s ease;
  }
`;
