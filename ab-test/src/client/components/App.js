import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { IoMdCheckmark } from 'react-icons/io';
import { FaAngleDoubleRight } from 'react-icons/fa';
import PropTypes from 'prop-types';

import './App.scss';
import ControlPanel from './ControlPanel';
import ProjectList from './ProjectList';
import TestListContainer from '../containers/TestListContainer';
import Screenshot from './Screenshot';
import Modal from './Modal';

export default class App extends Component {
  componentDidMount() {
    this.props.onProjectListMount();
  }

  render() {
    const {
      projects,
      onPlusBtnClick,
      onDeleteBtnClick,
      onListClick,
      screenCapture,
      onScreenshotUnmount,
      currentProject,
    } = this.props;

    const curProjectName = currentProject && projects.find(item => item._id === currentProject).name;

    return (
      <Router>
        <Switch>
          <Route
            path="/project/testlist/:uniq_id/screenshot"
            render={() => (
              <Screenshot screenshot={screenCapture} onUnmount={onScreenshotUnmount} />
            )}
          />
          <Fragment>
            <div className="app">
              <header className="header" />
              <div className="app-main">
                <ControlPanel />
                <div className="content-wrapper">
                  <div className="header-path">
                    <span className="header-path__project-label">Project</span>
                    <FaAngleDoubleRight className="header-path__icon-arrow" size={15} />
                    <span className="header-path__project-name">{curProjectName}</span>
                  </div>
                  <div className="list">
                    <Route
                      path="/"
                      render={() => (
                        <ProjectList
                          projects={projects}
                          onPlusBtnClick={onPlusBtnClick}
                          onDeleteBtnClick={onDeleteBtnClick}
                          onListClick={onListClick}
                        />
                      )}
                    />
                    <TestListContainer />
                  </div>
                </div>
              </div>
              {
                this.props.modal.showModal &&
                <Modal>
                  <span className="modal-message">{this.props.modal.message}</span>
                  <div className="btn btn-agree" onClick={this.props.onConfirmClick}>
                    <IoMdCheckmark size={20} />
                    <span>Confirm</span>
                  </div>
                </Modal>
              }
            </div>
          </Fragment>
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  onProjectListMount: PropTypes.func,
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      testIds: PropTypes.arrayOf(PropTypes.string),
    })
  ),
  onPlusBtnClick: PropTypes.func,
  onDeleteBtnClick: PropTypes.func,
  onListClick: PropTypes.func,
  screenCapture: PropTypes.shape({
    isLoading: PropTypes.bool,
    source: PropTypes.string,
  }),
  onScreenshotUnmount: PropTypes.func,
  currentProject: PropTypes.string,
  modal: PropTypes.shape({
    showModal: PropTypes.bool,
    message: PropTypes.string,
  }),
  onConfirmClick: PropTypes.func,
};
