import React, { Component } from 'react';
import { debounce } from 'lodash';
import styles from './style/panel.module.scss';
import { ChromePicker } from 'react-color';

export class Panel extends Component {
  constructor(props) {
    super(props);
    this.setWidth = React.createRef();
    this.handleAutoPopulateValueChange = debounce(this.handleAutoPopulateValueChange.bind(this), 500, {
      leading: false,
      trailing: true
    });
    this.handlePolyColorSelect = debounce(this.handlePolyColorSelect.bind(this), 500, {
      leading: false,
      trailing: true
    });
    this.handleSizeChange = debounce(this.handleSizeChange.bind(this), 500);
  }

  componentDidUpdate() {
    this.setWidth.current.value = this.props.canvasWidth;
  }

  handleSizeChange(size) {
    console.log(size);
  }

  handlieImageDownloadClick() {
    this.props.downloadFlattenImage(true);
  }

  onEditmode(ev) {
    if (ev.target.checked) {
      this.props.editMode(true);
    } else {
      if (this.props.selectedFace) {
        this.props.faceSelectHandler();
        this.props.noticeMessage('Poly Deselected');
      }
      this.props.editMode(false);
    }
  }

  handleAutoPopulateValueChange(data, category) {
    this.props.setBackgroundPoly(data, category);
  }

  handleAutoPopulateButtonClick() {
    this.props.autoPopulate();
  }

  handlePolyColorSelect(color) {
    this.props.selectedPolyColorChange(color);
  }

  render() {
    return (
      <div className={styles.panel}>
        <fieldset className={styles.editmode}>
          <label htmlFor="editmode">Edit Mode </label>
          <input
            type="checkbox"
            name="editmode"
            id="editmode"
            checked={this.props.polyEditMode}
            onChange={this.onEditmode.bind(this)}
          />
        </fieldset>

        <fieldset className={styles.size}>
          <legend>Image Size Setting</legend>
          <label htmlFor="">Width : </label>
          <input type="text" name="setWidth" id="setWidth" ref={this.setWidth} onChange={(ev) => {
            this.handleSizeChange(ev.target.value);
          }}/>
          <p>height : {this.props.canvasHeight}</p>
        </fieldset>

        <fieldset>
          <legend>Auto Populate Settings</legend>
          <label htmlFor="variance">Variance</label>
          <input
            type="range"
            id="variance"
            name="variance"
            defaultValue={this.props.backgroundVariance}
            step="0.01"
            min="0"
            max="1"
            onChange={(ev) => {
              this.handleAutoPopulateValueChange(ev.target.value, 'variance');
            }}
          />

          <label htmlFor="cellsize">Cellsize</label>
          <input
            type="range"
            id="cellsize"
            name="cellsize"
            min="10"
            max="200"
            defaultValue={this.props.backgroundCellSize}
            step="2"
            onChange={(ev) => {
              this.handleAutoPopulateValueChange(ev.target.value, 'cellsize');
            }}
          />
          <button className={styles["auto-populate"]} onClick={this.handleAutoPopulateButtonClick.bind(this)}>Auto Populate</button>
        </fieldset>

        {
          this.props.selectedFace 
          ? <fieldset className={styles.colorPick}>
            <legend>Indivisual Poly Setting</legend>
            <ChromePicker
              color={this.props.selectedFace.backgroundColor}
              disableAlpha={true}
              onChangeComplete={color => {
                let rgb = `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}`;
                this.handlePolyColorSelect(rgb);
              }}
            />
          </fieldset>
          : null
        }

        <button className={styles["download-image"]} onClick={this.handlieImageDownloadClick.bind(this)}>Download Image</button>
      </div>
    );
  }
}

export default Panel
