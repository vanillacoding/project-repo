import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from './partials/Loading';
import Error from './partials/Error';
import Manual from './partials/Manual';
import Accordion from './partials/Accordion';
import Modal from './partials/Modal';
import BubbleChart from './partials/BubbleChart';
import LineChart from './partials/LineChart';
import moment from 'moment';
import './css/project_detail.scss';

const ProjectDetail = (props) => {
  const {
    jwtoken,
    isLoading,
    isError,
    errorList,
    project,
    statistics,
    currentPageNo,
    isDescSorting,
    onProjectDetailLoad,
    totalErrorListLength,
    onProjectDelete,
    match: { params }
  } = props;

  const ERROR_LIST_LIMIT = 20;

  const [ istimelineTabOpened, setTimelineTab ] = useState(true);
  const [ isGraphTabOpened, setGraphTab ] = useState(false);
  const [ isModalOpened, setModal ] = useState(false);
  const [ projectName, setProjectName ] = useState('');
  const [ isProjectNameWrong, matchProjectName ] = useState(false);

  useEffect(() => {
    if (jwtoken) {
      onProjectDetailLoad(jwtoken, params.token);
    }
  }, [ jwtoken, onProjectDetailLoad, params ]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <div className="app-content">
      {isModalOpened && (
        <Modal
          onModalClose={() => {
            setModal(false);
          }}
          inputValue={projectName}
          onInputChange={(e) => {
            setProjectName(e.target.value);
          }}
          hasFailMessage={!!isProjectNameWrong}
          failMessage="Project Name not matched!"
          labelMessage01="Please type in the name of the project to confirm."
          labelMessage02="Once you delete a project, there is no going back. Please be certain."
        >
          <button
            type="button"
            className="btn-basic block"
            onClick={() => {
              if (projectName !== project.name) {
                matchProjectName(true);
                return;
              }
              onProjectDelete(jwtoken, params.token);
            }}
          >
            Are you absolutely sure?
          </button>
        </Modal>
      )}
      <div className="content-header">
        {project && (
          <>
            <div>
              <h2 className="content-title">
                {project.name}
                <span className="project-date">
                  {moment(project.created_at).format('YYYY.MM.DD')}
                </span>
              </h2>
              <p className="project-token">
                Project Token: {project.token}
              </p>
            </div>
            <div className="align-right">
              <button
                type="button"
                className="btn-basic btn-icon sm"
                title="Refresh"
                onClick={() => {
                  onProjectDetailLoad(jwtoken, params.token);
                }}
              >
              </button>
              <button
                type="button"
                className="btn-basic btn-delete sm"
                onClick={() => {
                  setModal(true);
                }}
              >
                DELETE
              </button>
              <Link
                to="/"
                className="btn-basic sm"
              >
                LIST
              </Link>
            </div>
          </>
        )}
      </div>
      {errorList.length === 0 && (
        <Manual
          projectToken={params.token}
        />
      )}
      {errorList.length > 0 && (
        <div className="detail-content">
          <ul className="tab-header">
            <li>
              <button
                type="button"
                className={istimelineTabOpened ? "btn-tab active" : "btn-tab"}
                onClick={() => {
                  setTimelineTab(true);
                  setGraphTab(false);
                }}
              >
                Timeline
              </button>
            </li>
            <li>
              <button
                type="button"
                className={isGraphTabOpened ? "btn-tab active" : "btn-tab"}
                onClick={() => {
                  setTimelineTab(false);
                  setGraphTab(true);
                }}
              >
                Graph
              </button>
            </li>
          </ul>
          {istimelineTabOpened && (
            <div className="tab-content">
              <div className="toggle-switch">
                <input
                  type="checkbox"
                  id="sortingCheck"
                  defaultChecked={isDescSorting}
                  onChange={() => {
                    const sort = isDescSorting ? 'asc' : 'desc';
                    onProjectDetailLoad(jwtoken, params.token, 0, sort);
                  }}
                />
                <label htmlFor="sortingCheck">
                  <span className="toggle-track"></span>
                </label>
              </div>
              <ul className="timeline-list">
                {errorList.map(errorItem => (
                  <Accordion
                    key={errorItem._id}
                    errorItem={errorItem}
                  />
                ))}
              </ul>
              {totalErrorListLength > ERROR_LIST_LIMIT && (
                <div className="pagination">
                  <button
                    type="button"
                    className={currentPageNo === 0 ? 'btn-page disabled' : 'btn-page'}
                    onClick={() => {
                      if (currentPageNo === 0) {
                        return;
                      }
                      const sort = isDescSorting ? 'desc' : 'asc';
                      onProjectDetailLoad(jwtoken, params.token, currentPageNo - 1, sort);
                    }}
                  >
                    Prev
                  </button>
                  <button
                    type="button"
                    className={totalErrorListLength / ERROR_LIST_LIMIT <= currentPageNo + 1 ? 'btn-page disabled' : 'btn-page'}
                    onClick={() => {
                      const pageLimit = totalErrorListLength / ERROR_LIST_LIMIT;
                      if (pageLimit <= currentPageNo + 1) {
                        return;
                      }
                      const sort = isDescSorting ? 'desc' : 'asc';
                      onProjectDetailLoad(jwtoken, params.token, currentPageNo + 1, sort);
                    }}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}
          {isGraphTabOpened && (
            <div className="tab-content graph">
              {statistics && statistics.name ? (
                <>
                  <h3 className="chart-title">
                    Hourly Error Occurrence
                  </h3>
                  <LineChart
                    data={statistics.time}
                    width={1160}
                    height={450}
                  />
                  <h3 className="chart-title">
                    Error Types
                  </h3>
                  <BubbleChart
                    data={statistics.name}
                    width={1160}
                    height={600}
                  />
                </>
              ) : (
                <div className="no-data">NO DATA</div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
