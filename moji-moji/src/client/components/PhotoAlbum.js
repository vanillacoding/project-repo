import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './PhotoAlbum.scss';

class PhotoAlbum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPhotoActive: false,
      activePhotoSrc: ''
    };

    this.handleBackgroundClick = this.handleBackgroundClick.bind(this);
  }

  handleBackgroundClick() {
    this.setState({
      isPhotoActive: false
    });
  }

  handlePhotoClick(photoSrc) {
    this.setState({
      isPhotoActive: true,
      activePhotoSrc: photoSrc
    });
  }

  renderActivePhoto(photoSrc) {
    return (
      <div
        className="PhotoAlbum__photo-active"
        onClick={this.handleBackgroundClick}
      >
        <img src={photoSrc} alt="pic-active" />
      </div>
    );
  }

  renderEndGamePhotos() {
    const { endGamePhotos } = this.props;

    return endGamePhotos.map((photo, index) => {
      return (
        <li
          className="PhotoAlbum__list__item"
          key={index}
          onClick={this.handlePhotoClick.bind(this, photo.src)}
        >
          <img src={photo.src} alt={`pic-${index}`} />
        </li>
      );
    });
  }

  render() {
    const { isPhotoActive, activePhotoSrc } = this.state;
    const { endGamePhotos } = this.props;

    return (
      <div className="PhotoAlbum">
        <h2 className="PhotoAlbum__message">
          Great! You found {endGamePhotos.length} items
        </h2>
        <ul className="PhotoAlbum__list">{this.renderEndGamePhotos()}</ul>
        {isPhotoActive && this.renderActivePhoto(activePhotoSrc)}
      </div>
    );
  }
}

PhotoAlbum.propTypes = {
  endGamePhotos: PropTypes.instanceOf(Array).isRequired
};

export default PhotoAlbum;
