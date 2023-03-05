import React, { Component } from 'react';

class ImageCropper extends Component {
  constructor(props) {
    super(props);

    this.lolRef = React.createRef();
    this.canvasRef = React.createRef();
    this.imageRef = React.createRef();

    this.isDragging = false;
    this.startX = 0;
    this.startY = 0;
    this.endX = 0;
    this.endY = 0;
  }

  componentDidMount() {
    const lol = this.lolRef.current;
    const image = this.imageRef.current;
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Add event listeners to the image element to handle the mouse events
    image.addEventListener('mousedown', this.handleMouseDown);
    image.addEventListener('mousemove', this.handleMouseMove);
    image.addEventListener('mouseup', this.handleMouseUp);

    this.setState({ lol, image, canvas, ctx });
  }

  componentWillUnmount() {
    const { image } = this.state;

    // Remove event listeners when component is unmounted
    image.removeEventListener('mousedown', this.handleMouseDown);
    image.removeEventListener('mousemove', this.handleMouseMove);
    image.removeEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseDown = (event) => {
    const { lol } = this.state;

    this.isDragging = true;
    this.startX = event.offsetX + lol.offsetLeft;
    this.startY = event.offsetY + lol.offsetTop;
  };

  handleMouseMove = (event) => {
    const { lol, canvas, ctx } = this.state;

    if (!this.isDragging) return;

    this.endX = event.offsetX + lol.offsetLeft;
    this.endY = event.offsetY + lol.offsetTop;

    // Clear the canvas and draw the selected area
    canvas.width = lol.offsetWidth;
    canvas.height = lol.offsetHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(this.startX, this.startY, this.endX - this.startX, this.endY - this.startY);
  };

  handleMouseUp = () => {
    const { image, canvas, ctx } = this.state;

    this.isDragging = false;

    // Calculate the selected area and crop the image
    const x = Math.min(this.startX, this.endX);
    const y = Math.min(this.startY, this.endY);
    const width = Math.abs(this.startX - this.endX);
    const height = Math.abs(this.startY - this.endY);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image, x, y, width, height, 0, 0, width, height);

    // Replace the image with the cropped image
    image.src = canvas.toDataURL();
  };

  render() {
    const { src } = this.props;

    return (
      <div ref={this.lolRef} style={{ position: 'relative' }}>
        <img ref={this.imageRef} src={src} style={{ width: '100%' }} />
        <canvas ref={this.canvasRef} style={{ display: 'none' }}></canvas>
      </div>
    );
  }
}

export default ImageCropper;