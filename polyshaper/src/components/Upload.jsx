import React, { Component } from 'react';
import styles from './style/upload.module.scss';

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      target: false,
      hover: false
    };
    this.imageFileValidater = this.imageFileValidater.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleDragEnter = this.handleDragEnter.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
    this.dropTarget = this.dropTarget.bind(this);
    this.dropLeave = this.dropLeave.bind(this);
  }

  componentDidMount() {
    window.addEventListener('dragover', this.dropTarget);
    window.addEventListener('dragleave', this.dropLeave);
    window.addEventListener('drop', this.handleDrop);
  }

  componentWillUnmount() {
    window.removeEventListener('dragover', this.dropTarget);
    window.removeEventListener('dragleave', this.dropLeave);
    window.removeEventListener('drop', this.handleDrop);
  }

  imageFileValidater(ev) {
    let uploadedImageFile = URL.createObjectURL(ev.target.files[0]);
    let fileExtension = ev.target.files[0].name.substring(ev.target.files[0].name.lastIndexOf('.') + 1).toLowerCase();

    if (fileExtension === "gif" || fileExtension === "png" || fileExtension === "bmp" || fileExtension === "jpeg" || fileExtension === "jpg") {
      if (uploadedImageFile && ev.target.files[0]) {
        let fileSize = ev.target.files[0].size;
        if (fileSize > 10485760) {
          alert('image file size must under the 10MB');
          this.props.uploadImageHandler(null);
        }
      }
      this.props.uploadImageHandler(uploadedImageFile);
    } else {
      alert('only image file available');
      this.props.uploadImageHandler(null);
    }
  }

  dropTarget(ev) {
    if (!this.state.active) {
      this.setState({
        target: true
      });
    }
  }

  dropLeave(ev) {
    if(ev.screenX === 0 && ev.screenY === 0) {
    	this.setState({
    	  target: false
    	});
    }
  }

  handleDrop(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    
    var uploadObj = {
      target: ev.nativeEvent.dataTransfer
    };
    
    this.setState({
      target: false,
      hover: false
    });
    
    this.imageFileValidater(uploadObj);
  }

  handleDragEnter(ev) {
    ev.preventDefault();
    
    if (!this.state.active) {
      this.setState({
        hover: true
      });
    }
  }

  handleDragLeave(ev) {
		this.setState({
      hover: false
    });
  }

  handleDragOver(ev) {
    ev.preventDefault();
  }

  render() {
    return (
      <div
        className={this.state.hover ? styles['filedrop-on'] : styles['filedrop']}
        onDrop={this.handleDrop}
        onDragEnter={this.handleDragEnter}
        onDragOver={this.handleDragOver}
        onDragLeave={this.handleDragLeave}
      >
        <h2>Drop the image file here</h2>
        <input type="file" name="upload" id="upload" onChange={this.imageFileValidater}/>
        <label htmlFor="upload" className="">or Select a image file</label>
      </div>
    );
  }
}

export default Upload
