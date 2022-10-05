import React, { Component } from 'react';
import styles from './style/board.module.scss';

class Board extends Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.colorCanvas = React.createRef();
    this.editModeVertexLayer = React.createRef();
    this.snapGuideLayer = React.createRef();
    this.uploadedImage = React.createRef();
    this.backgroundLayer = React.createRef();
    this.flatten = React.createRef();
    this.state = {
      vertexId: 0,
      vertices: [],
      isMousedown: false,
      selectedVertexIndex: -1
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  componentDidMount() {
    document.body.addEventListener('keydown', this.handleKeyDown);
    document.body.addEventListener('keyup', this.handleKeyUp);
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.handleKeyDown);
    document.body.addEventListener('keyup', this.handleKeyUp);
  }

  handleKeyDown(ev) {
    if (ev.metaKey && ev.key === 'e') {
      if (this.props.polyEditMode) {
        this.props.noticeMessage('Change to Add Mode');
        this.props.editMode(false);
      } else {
        this.props.editMode(true);
        this.props.noticeMessage('Change to Edit Mode');
      }
    }

    if (ev.key === 'Escape' && this.state.vertices.length > 0) {
      for (let i = 0; i < this.state.vertices.length; i++) {
        this.props.makeVertex();
      }
      this.setState(prevState => {
        return {
          vertexId: prevState.vertexId - prevState.vertices.length,
          vertices: []
        }
      });
      this.props.noticeMessage('Remove Current Vertices');
    }

    if (this.props.polyEditMode) {
      console.log(ev.key, this.props.selectedFace);
      if (this.props.selectedFace && ev.key === 'Escape') {
        this.props.faceSelectHandler();
        this.props.noticeMessage('Poly Deselected');
      } else if (this.props.selectedFace && ev.key === 'Backspace') {
        this.props.deletePolyHandler(this.props.selectedFace);
      }
    }
  }

  handleKeyUp(ev) {
  }

  componentDidUpdate(prevProps) {
    this.drawPoly();
    if (this.props.polyEditMode) {
      this.drawEditModeVertex();
    }
    if (this.props.backgroundVertexNode.length) {
      const backgroundVertexNode = this.props.backgroundVertexNode.slice();
      this.drawBackground(backgroundVertexNode);
    }
    if (this.props.flattenImage) {
      this.flattenImage();
    }
  }

  handleMouseDown(ev) {
    console.log('ev mousedown');
    this.setState({
      isMousedown: true
    });
    let x = ev.nativeEvent.offsetX;
    let y = ev.nativeEvent.offsetY;
    const context = this.snapGuideLayer.current.getContext('2d');
    if (this.props.polyEditMode) {
      const vertexNode = this.props.vertexNode.slice();
      const { x, y, vertexId } = this.snapToPoint(ev.nativeEvent.offsetX, ev.nativeEvent.offsetY, vertexNode);
      if (vertexId >= 0) {
        this.setState({
          selectedVertexIndex: vertexId
        });
      }
    } else {
      context.beginPath();
      context.clearRect(x - 3, y - 3, 6, 6);
      context.arc(x, y, 3, 0, Math.PI * 2);
      context.fillStyle = 'orange';
      context.fill();
    }

  }

  handleMouseUp(ev) {
    const vertexNode = this.props.vertexNode.slice();
    if (this.props.polyEditMode && this.state.selectedVertexIndex > -1 && ev.metaKey) {
      const faceNode = this.props.faceNode.slice();
      for (let i = 0; i < faceNode.length; i++) {
        if (faceNode[i].vertices.indexOf(this.state.selectedVertexIndex) > -1) {
          let color = this.getColorAverage(vertexNode[faceNode[i].vertices[0]].x, vertexNode[faceNode[i].vertices[0]].y, vertexNode[faceNode[i].vertices[1]].x, vertexNode[faceNode[i].vertices[1]].y, vertexNode[faceNode[i].vertices[2]].x, vertexNode[faceNode[i].vertices[2]].y);
          this.props.selectedPolyColorChange(`rgb(${color.r}, ${color.g}, ${color.b})`, i);
          this.props.noticeMessage('Get Average Color');
        }
      }
    }

    this.setState({
      isMousedown: false,
      selectedVertexIndex: -1
    });
    if (this.props.polyEditMode) {
      // if (this.state.selectedVertexIndex) {
      //   const { x, y } = this.snapToPoint(ev.nativeEvent.offsetX, ev.nativeEvent.offsetY, vertexNode);
      //   this.props.selectedVertexAdjustPosition(x, y, this.state.selectedVertexIndex);
      // }
      if (ev.metaKey) {
        this.selectPoly(ev.nativeEvent.offsetX, ev.nativeEvent.offsetY);

      }
    } else {
      const { x, y } = this.snapToPoint(ev.nativeEvent.offsetX, ev.nativeEvent.offsetY, vertexNode);
      this.makeVertex(x, y);
    }
  }

  handleMouseMove(ev) {
    const vertexNode = this.props.vertexNode.slice();
    const { x, y } = this.snapToPoint(ev.nativeEvent.offsetX, ev.nativeEvent.offsetY, vertexNode);

    if (this.props.polyEditMode) {
      if (this.state.selectedVertexIndex > -1) {
        this.props.selectedVertexAdjustPosition(x, y, this.state.selectedVertexIndex);
      }
    }
    // if (this.state.isMousedown) {// when move wht mouse down
    //   if (this.props.polyEditMode) {
    //     for (let i = 0; i < vertexNode.length; i++) {
    //       if ((Math.abs(vertexNode[i].x - x) < vertexSnapGap) && (Math.abs(vertexNode[i].y - y) < vertexSnapGap)) {
    //         vertexNode[i].x = x;
    //         vertexNode[i].y = y;
    //         this.drawPoly();
    //       }
    //     }
    //   } else {
    //     const context = this.canvas.current.getContext('2d');//fixed
    //     const vertices = this.state.vertices.slice();
    //     context.beginPath();
    //     context.clearRect(x - 3, y - 3, 6, 6);
    //     context.arc(x, y, 3, 0, Math.PI * 2);
    //     context.fillStyle = 'orange';
    //     context.fill();
    //     for (let i = 0; i < vertices.length; i++) {
    //       context.clearRect(vertices[i].x - 3, vertices[i].y - 3, 6, 6);
    //       context.arc(x, y, 3, 0, Math.PI * 2);
    //       context.fillStyle = 'orange';
    //       context.fill();
    //     }
    //   }
    // }
  }

  makeVertex(x, y) {
    if (this.props.polyEditMode) {
      return;
    }
    const context = this.canvas.current.getContext('2d');
    context.beginPath();
    context.arc(x, y, 3, 0, Math.PI * 2);
    context.fillStyle = 'red';
    context.fill();
    let newVertex = {
      x,
      y,
      id: this.state.vertexId,
      next: []
    };
    const vertices = this.state.vertices.slice();

    for (let i = 0; i < vertices.length; i++) {
      if (vertices[i].x === x && vertices[i].y === y) {
        return;
      }
    }

    for (let i = 0; i < vertices.length; i++) {
      vertices[i].next.push(this.state.vertexId);
      newVertex.next.push(vertices[i].id);
    }

    vertices.push(newVertex);
    this.props.makeVertex(newVertex);
    let vertexId = this.state.vertexId + 1;
    if (vertices.length === 3) {
      const colorData = this.getColorAverage(vertices[0].x, vertices[0].y, vertices[1].x, vertices[1].y, vertices[2].x, vertices[2].y);
      this.props.makeFace(vertices, `rgb(${colorData.r}, ${colorData.g}, ${colorData.b})`);
      context.clearRect(0, 0, this.colorCanvas.current.width, this.colorCanvas.current.height);
      vertices.length = 0;
    }
    this.setState({
      vertices,
      vertexId
    });
  }

  getColorAverage(x1, y1, x2, y2, x3, y3) {
    const colorContext = this.colorCanvas.current.getContext('2d');
    colorContext.save();
    colorContext.beginPath();
    colorContext.moveTo(x1, y1);
    colorContext.lineTo(x2, y2);
    colorContext.lineTo(x3, y3);
    colorContext.closePath();
    colorContext.clip();
    let image = document.createElement('img');
    image.src = this.props.uploadedImage;
    colorContext.drawImage(image, 0, 0);
    let biggestX = Math.max(x1, x2, x3);
    let biggestY = Math.max(y1, y2, y3);
    let smallestX = Math.min(x1, x2, x3);
    let smallestY = Math.min(y1, y2, y3);
    let colorData = colorContext.getImageData(smallestX, smallestY, Math.ceil(biggestX - smallestX) || 1, Math.ceil(biggestY - smallestY) || 1);
    let count = 0;
    const rgb = { r: 0, g: 0, b: 0 };
    for (let i = -4; i < colorData.data.length; i += 20) {
      if (colorData.data[i + 3] > 200) {
        ++count;
        rgb.r += colorData.data[i];
        rgb.g += colorData.data[i + 1];
        rgb.b += colorData.data[i + 2];
      }
    }
    rgb.r = ~~(rgb.r / count);
    rgb.g = ~~(rgb.g / count);
    rgb.b = ~~(rgb.b / count);
    colorContext.restore();
    return rgb;
  }

  snapToPoint(x, y, layerVertexNodeArray) {
    const vertexSnapGap = this.props.vertexSnapGap;
    const snapGuideContext = this.snapGuideLayer.current.getContext('2d'); // vv this is for the snap
    let i;
    let vertexId;
    for (i = 0; i < layerVertexNodeArray.length; i++) {
      if ((Math.abs(layerVertexNodeArray[i].x - x) < vertexSnapGap) && (Math.abs(layerVertexNodeArray[i].y - y) < vertexSnapGap)) {
        x = layerVertexNodeArray[i].x;
        y = layerVertexNodeArray[i].y;
        snapGuideContext.beginPath();
        snapGuideContext.clearRect(0, 0, this.snapGuideLayer.current.width, this.snapGuideLayer.current.height); //this snapGuide layer clear all
        snapGuideContext.arc(x, y, 3, 0, Math.PI * 2);
        snapGuideContext.fillStyle = 'orange';
        snapGuideContext.fill();
        vertexId = layerVertexNodeArray[i].id;
        i = layerVertexNodeArray.length;
      } else if (x < vertexSnapGap || x > this.snapGuideLayer.current.width - vertexSnapGap || y < vertexSnapGap || y > this.snapGuideLayer.current.height - vertexSnapGap) {
        if (x < vertexSnapGap) {
          x = 0;
        }
        if (y < vertexSnapGap) {
          y = 0;
        }
        if (x > this.snapGuideLayer.current.width - vertexSnapGap) {
          x = this.snapGuideLayer.current.width;
        }
        if (y > this.snapGuideLayer.current.height - vertexSnapGap) {
          y = this.snapGuideLayer.current.height;
        }
        snapGuideContext.beginPath();
        snapGuideContext.clearRect(0, 0, this.snapGuideLayer.current.width, this.snapGuideLayer.current.height); //this snapGuide layer clear all
        snapGuideContext.arc(x, y, 3, 0, Math.PI * 2);
        snapGuideContext.fillStyle = 'orange';
        snapGuideContext.fill();
        i = layerVertexNodeArray.length;
      } else {
        snapGuideContext.clearRect(0, 0, this.snapGuideLayer.current.width, this.snapGuideLayer.current.height);
      }
    }
    return { x, y, vertexId };
  }

  selectPoly(x, y) {
    const vector = (from, to) => [to[0] - from[0], to[1] - from[1]];
    const dot = (u, v) => u[0] * v[0] + u[1] * v[1];
    const faceNode = this.props.faceNode.slice();
    const vertexNode = this.props.vertexNode.slice();
    for (let i = 0; i < faceNode.length; i++) {
      let p = [x, y];
      let a = [vertexNode[faceNode[i].vertices[0]].x, vertexNode[faceNode[i].vertices[0]].y];
      let b = [vertexNode[faceNode[i].vertices[1]].x, vertexNode[faceNode[i].vertices[1]].y];
      let c = [vertexNode[faceNode[i].vertices[2]].x, vertexNode[faceNode[i].vertices[2]].y];
      let v0 = vector(a, c);
      let v1 = vector(a, b);
      let v2 = vector(a, p);
      let dot00 = dot(v0, v0);
      let dot01 = dot(v0, v1);
      let dot02 = dot(v0, v2);
      let dot11 = dot(v1, v1);
      let dot12 = dot(v1, v2);
      let invDenom = 1.0 / (dot00 * dot11 - dot01 * dot01);
      let u = (dot11 * dot02 - dot01 * dot12) * invDenom;
      let v = (dot00 * dot12 - dot01 * dot02) * invDenom;
      if ((u >= 0) && (v >= 0) && (u + v < 1)) {
        this.props.faceSelectHandler(faceNode[i]);
        this.props.noticeMessage(`Select Indivisual Poly No. ${i}`);
        i = faceNode.length;
      }
    }
  }

  drawPoly() {//draw colored poly when component updated
    const context = this.canvas.current.getContext('2d');
    const vertexNode = this.props.vertexNode.slice();
    const faceNode = this.props.faceNode.slice();
    if (!this.state.vertices.length) {
      context.clearRect(0, 0, this.canvas.current.width, this.canvas.current.height);
    }
    faceNode.forEach(face => {
      context.beginPath();
      context.moveTo(vertexNode[face.vertices[0]].x, vertexNode[face.vertices[0]].y);
      context.lineTo(vertexNode[face.vertices[1]].x, vertexNode[face.vertices[1]].y);
      context.lineTo(vertexNode[face.vertices[2]].x, vertexNode[face.vertices[2]].y);
      context.closePath();
      context.fillStyle = face.backgroundColor;
      context.fill();
    });
  }

  drawEditModeVertex() { //draw vertices when editmode
    const context = this.editModeVertexLayer.current.getContext('2d');
    const vertexNode = this.props.vertexNode.slice();
    const selectedFaceVertices = this.props.selectedFace ? this.props.selectedFace.vertices.slice() : null;
    context.clearRect(0, 0, this.canvas.current.width, this.canvas.current.height);
    if (selectedFaceVertices) {
      context.beginPath();
      context.moveTo(vertexNode[selectedFaceVertices[0]].x, vertexNode[selectedFaceVertices[0]].y);
      context.lineTo(vertexNode[selectedFaceVertices[1]].x, vertexNode[selectedFaceVertices[1]].y);
      context.lineTo(vertexNode[selectedFaceVertices[2]].x, vertexNode[selectedFaceVertices[2]].y);
      context.closePath();
      context.strokeStyle = 'orange';
      context.stroke();
    }
    vertexNode.forEach(vertex => {
      context.beginPath();
      context.moveTo(vertex.x, vertex.y);
      context.arc(vertex.x, vertex.y, 3, 0, Math.PI * 2);
      context.closePath();
      context.fillStyle = 'red';
      context.fill();
    });
  }

  drawBackground(vertices) {
    const context = this.backgroundLayer.current.getContext('2d');
    let maxCols = this.props.backgroundMaxCols;
    let colorData;
    for (let i = 0; i < vertices.length; i++) {
      if (vertices[i].row % 2 === 0 && vertices[i + maxCols + 1] && vertices[i].col < maxCols - 1) {
        context.beginPath();
        context.moveTo(vertices[i].x, vertices[i].y);
        context.lineTo(vertices[i + maxCols].x, vertices[i + maxCols].y);
        context.lineTo(vertices[i + maxCols + 1].x, vertices[i + maxCols + 1].y);
        context.closePath();
        colorData = this.getColorAverage(vertices[i].x, vertices[i].y, vertices[i + maxCols].x, vertices[i + maxCols].y, vertices[i + maxCols + 1].x, vertices[i + maxCols + 1].y);
        context.fillStyle = `rgb(${colorData.r}, ${colorData.g}, ${colorData.b})`;
        context.fill();

        context.beginPath();
        context.moveTo(vertices[i].x, vertices[i].y);
        context.lineTo(vertices[i + 1].x, vertices[i + 1].y);
        context.lineTo(vertices[i + maxCols + 1].x, vertices[i + maxCols + 1].y);
        context.closePath();
        colorData = this.getColorAverage(vertices[i].x, vertices[i].y, vertices[i + 1].x, vertices[i + 1].y, vertices[i + maxCols + 1].x, vertices[i + maxCols + 1].y);
        context.fillStyle = `rgb(${colorData.r}, ${colorData.g}, ${colorData.b})`;
        context.fill();

      } else if (vertices[i - 1] && vertices[i + maxCols] && vertices[i].col > 0) {
        context.beginPath();
        context.moveTo(vertices[i].x, vertices[i].y);
        context.lineTo(vertices[i - 1].x, vertices[i - 1].y);
        context.lineTo(vertices[i + maxCols - 1].x, vertices[i + maxCols - 1].y);
        context.closePath();
        colorData = this.getColorAverage(vertices[i].x, vertices[i].y, vertices[i - 1].x, vertices[i - 1].y, vertices[i + maxCols - 1].x, vertices[i + maxCols - 1].y);
        context.fillStyle = `rgb(${colorData.r}, ${colorData.g}, ${colorData.b})`;
        context.fill();

        context.beginPath();
        context.moveTo(vertices[i].x, vertices[i].y);
        context.lineTo(vertices[i + maxCols].x, vertices[i + maxCols].y);
        context.lineTo(vertices[i + maxCols - 1].x, vertices[i + maxCols - 1].y);
        context.closePath();
        colorData = this.getColorAverage(vertices[i].x, vertices[i].y, vertices[i + maxCols].x, vertices[i + maxCols].y, vertices[i + maxCols - 1].x, vertices[i + maxCols - 1].y);
        context.fillStyle = `rgb(${colorData.r}, ${colorData.g}, ${colorData.b})`;
        context.fill();
      }
    }
  }

  imageLoad(ev) {
    this.props.setUpCanvasSize(this.uploadedImage.current.width, this.uploadedImage.current.height);
  }

  flattenImage() {
    const context = this.flatten.current.getContext('2d');
    context.drawImage(this.backgroundLayer.current, 0, 0, this.props.canvasWidth, this.props.canvasHeight);
    context.drawImage(this.canvas.current, 0, 0, this.props.canvasWidth, this.props.canvasHeight);

    let dataURL = this.flatten.current.toDataURL("image/png");
    this.props.downloadFlattenImage(false);
    let link = document.createElement('a');
    link.download = 'yourPoly.png';
    link.href = dataURL;
    link.click();
  }

  render() {
    return (
      <div
        className={styles.board}
        onMouseDown={this.handleMouseDown.bind(this)}
        onMouseMove={this.handleMouseMove.bind(this)}
        onMouseUp={this.handleMouseUp.bind(this)}
      >
        <img
          src={this.props.uploadedImage}
          ref={this.uploadedImage}
          alt="user uploaded"
          className={styles.uploaded_image}
          onLoad={this.imageLoad.bind(this)}
        />

        <canvas //this is only for snap
          className={styles.snapGuideLayer}
          width={this.props.canvasWidth}
          height={this.props.canvasHeight}
          ref={this.snapGuideLayer}
        />

        <canvas
          className={styles.colorCanvas}
          width={this.props.canvasWidth}
          height={this.props.canvasHeight}
          ref={this.colorCanvas}
        />

        {
          this.props.polyEditMode
            ? <canvas
              className={styles.editModeVertexLayer}
              width={this.props.canvasWidth}
              height={this.props.canvasHeight}
              ref={this.editModeVertexLayer}
              onLoad={this.drawEditModeVertex.bind(this)}
            />
            : null
        }

        <canvas
          className={styles.canvas}
          width={this.props.canvasWidth}
          height={this.props.canvasHeight}
          ref={this.canvas}
        />

        <canvas
          className={styles.backgroundLayer}
          width={this.props.canvasWidth}
          height={this.props.canvasHeight}
          ref={this.backgroundLayer}
        />

        <canvas
          className={styles.flatten}
          width={this.props.canvasWidth}
          height={this.props.canvasHeight}
          ref={this.flatten}
        />
      </div>
    );
  }
}

export default Board
