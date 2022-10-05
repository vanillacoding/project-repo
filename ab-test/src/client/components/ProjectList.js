import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import './ProjectList.scss';
import { IoIosArrowForward, IoMdCheckmark, IoMdClose } from 'react-icons/io';
import PropTypes from 'prop-types';
import Button from './Button';
import Modal from './Modal';

class ProjectList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      showDeleteModal: false,
      name: '',
      origin: '',
      selectedProjectId: '',
    };

    this.inputRef = React.createRef();
    this.inputOrigin = React.createRef();
    this.inputPassword = React.createRef();

    this.closeModal = this.closeModal.bind(this);
    this.closeConfirmModal = this.closeConfirmModal.bind(this);
    this.displayListCreationModal = this.displayListCreationModal.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDeleteModal = this.handleDeleteModal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleOriginInputChange = this.handleOriginInputChange.bind(this);
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  closeConfirmModal() {
    this.setState({ showDeleteModal: false });
  }

  displayListCreationModal() {
    this.setState({ showModal: true });
  }

  handleClick(ev) {
    const { id } = ev.currentTarget;
    const deleteBtn = ev.target.closest('.project__list--btn-delete');

    if (!id) {
      return;
    }

    if (!deleteBtn) {
      return this.props.onListClick(id);
    }
  }

  handleDelete(ev) {
    const btnDelete = ev.currentTarget.classList.contains('delete-btn');

    if (this.inputPassword.current.value === 'Chanai6979*' && btnDelete) {
      this.props.onDeleteBtnClick(this.state.selectedProjectId);
      this.setState({
        selectedProjectId: '',
        showDeleteModal: false,
      });
    }
  }

  handleDeleteModal(ev) {
    const { id } = ev.currentTarget;

    this.setState({
      selectedProjectId: id,
      showDeleteModal: true,
    });
  }

  handleInputChange(ev) {
    this.setState({ name: ev.target.value });
  }

  handleOriginInputChange(ev) {
    this.setState({ origin: ev.target.value });
  }

  handleKeyDown(ev) {
    if (ev.keyCode === 13) {
      this.handleSubmit();
    }
  }

  handleSubmit() {
    const projectName = this.state.name.trim();
    const { origin } = this.state;

    if (!projectName && !origin) {
      return;
    }

    this.props.onPlusBtnClick(projectName, origin);

    this.inputRef.current.value = '';
    this.inputOrigin.current.value = '';

    this.setState({
      name: '',
      origin: '',
      showModal: false,
    });
  }

  renderList() {
    return this.props.projects.map(item => (
      <Link to={`/project/${item._id}`} key={item._id}>
        <li className="project__list" id={item._id} onClick={this.handleClick}>
          <IoIosArrowForward size={15} className="project__list--icon-arrow" />
          <IoMdClose
            size={17}
            className="project__list--btn-delete"
            id={item._id}
            onClick={this.handleDeleteModal}
          />
          <span className="project__list--name">{item.name}</span>
        </li>
      </Link>
    ));
  }

  render() {
    return (
      <ul className="project">
        <Button
          onClick={this.displayListCreationModal}
        >
        Set up project
        </Button>
        {
          this.renderList()
        }
        {
          this.state.showModal &&
          <Modal onBackgroundClick={this.closeModal}>
            <span className="new-project__title">New Project</span>
            <input
              type="text"
              className="new-project__input name"
              onChange={this.handleInputChange}
              ref={this.inputRef}
              onKeyDown={this.handleKeyDown}
              placeholder="Project name"
              autoFocus
            />
            <input
              type="text"
              className="new-project__input origin"
              placeholder="Origin URI"
              onChange={this.handleOriginInputChange}
              ref={this.inputOrigin}
            />
            <p className="new-project__description">For use with requests from a browser. This is the origin URI of the client application. It can't contain a wildcard (https://*.example.com) or a path (https://example.com/subdir).</p>
            <div className="popup__buttons">
              <div className="btn btn-agree">
                <IoMdCheckmark size={20} />
                <span onClick={this.handleSubmit}>Submit</span>
              </div>
              <div className="btn btn-agree" onClick={this.closeModal}>
                <IoMdClose size={20} />
                <span>Cancel</span>
              </div>
            </div>
          </Modal>
        }
        {
          this.state.showDeleteModal &&
          <Modal onBackgroundClick={this.closeConfirmModal}>
            <p className="delete-modal-description">Are you sure you want to delete it?</p>
            <input
              type="password"
              className="password"
              placeholder="Please input password"
              ref={this.inputPassword}
            />
            <div className="popup__buttons">
              <div className="btn btn-agree delete-btn" onClick={this.handleDelete}>
                <IoMdCheckmark size={20} />
                <span>Delete</span>
              </div>
              <div className="btn btn-agree" onClick={this.closeConfirmModal}>
                <IoMdClose size={20} />
                <span>Cancel</span>
              </div>
            </div>
          </Modal>
        }
      </ul>
    );
  }
}

export default ProjectList;

ProjectList.propTypes = {
  onDeleteBtnClick: PropTypes.func,
  onListClick: PropTypes.func,
  onPlusBtnClick: PropTypes.func,
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      testIds: PropTypes.arrayOf(PropTypes.string),
    })
  ),
};
