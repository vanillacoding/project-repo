
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Modal from './partials/Modal';
import './css/project_list.scss';

const ProjectList = (props) => {
  const {
    jwtoken,
    projectList,
    totalProjectsLength,
    currentPageNo,
    handleModalOpen,
    handleModalClose,
    isModalOpened,
    listCreateFailMessage,
    onProjectCreate,
    onProjectListLoad
  } = props;

  const [ projectName, setProjectName ] = useState('');
  const PAGE_LIST_LIMIT = 10;

  return (
    <>
      {isModalOpened && (
        <Modal
          onModalClose={handleModalClose}
          onInputChange={(e) => {
            setProjectName(e.target.value);
          }}
          inputValue={projectName}
          hasFailMessage={!!listCreateFailMessage}
          failMessage={listCreateFailMessage}
          labelMessage01="Upper, lower, numeric characters, single space allowed."
          labelMessage02="1-25 characters long."
        >
          <button
            type="button"
            className="btn-basic block"
            onClick={() => {
              if (!projectName.trim()) {
                return;
              }
              const newProject = {
                name: projectName,
                created_at: new Date()
              };
              onProjectCreate(jwtoken, newProject);
              setProjectName('');
            }}
          >
            SUBMIT
          </button>
        </Modal>
      )}
      <div className="app-content">
        <div className="content-header">
          <h2 className="content-title">My Projects</h2>
          <button
            type="button"
            className="btn-basic sm"
            onClick={handleModalOpen}
          >
            Create New Project
          </button>
        </div>
        <table className="project-table">
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {projectList.length === 0 && (
              <tr className="no-data">
                <td colSpan={2}>
                  <p>Empty List!</p>
                  <p>
                    Click "Create New Project" to start.
                  </p>
                </td>
              </tr>
            )}
            {projectList.length > 0 && (
              projectList.map(project => (
                <tr key={project.token}>
                  <td>
                    <Link
                      to={`/project/${project.token}`}
                    >
                      {project.name}
                    </Link>
                  </td>
                  <td>
                    {moment(project.created_at).format('YYYY.MM.DD hh:mm a')}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {totalProjectsLength > PAGE_LIST_LIMIT && (
          <div className="pagination">
            <button
              type="button"
              className={currentPageNo === 0 ? 'btn-page disabled' : 'btn-page'}
              onClick={() => {
                if (currentPageNo === 0) {
                  return;
                }
                onProjectListLoad(jwtoken, currentPageNo - 1);
              }}
            >
              Prev
            </button>
            <button
              type="button"
              className={totalProjectsLength / PAGE_LIST_LIMIT <= currentPageNo + 1 ? 'btn-page disabled' : 'btn-page'}
              onClick={() => {
                const pageLimit = totalProjectsLength / PAGE_LIST_LIMIT;
                if (pageLimit <= currentPageNo + 1) {
                  return;
                }
                onProjectListLoad(jwtoken, currentPageNo + 1);
              }}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ProjectList;
