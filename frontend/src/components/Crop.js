import React, { useState, useRef } from "react";

function ImageCrop() {
  const [image, setImage] = useState(null);
  const [canvasWidth, setCanvasWidth] = useState(0);
  const [canvasHeight, setCanvasHeight] = useState(0);
  const [cropRect, setCropRect] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const canvasRef = useRef();

  // handle file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        setCanvasWidth(img.width);
        setCanvasHeight(img.height);
        setImage(img);
        setCropRect(null);
        setCroppedImage(null);
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  // handle canvas mouse down event
  const handleCanvasMouseDown = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setCropRect({ x, y, width: 0, height: 0 });
  };

  // handle canvas mouse move event
  const handleCanvasMouseMove = (event) => {
    if (cropRect) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      setCropRect((cropRect) => ({
        ...cropRect,
        width: x - cropRect.x,
        height: y - cropRect.y,
      }));
    }
  };

  // handle canvas mouse up event
  const handleCanvasMouseUp = () => {
    if (cropRect.width !== 0 && cropRect.height !== 0) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const { x, y, width, height } = cropRect;
      const cropImage = ctx.getImageData(x, y, width, height);
      const cropCanvas = document.createElement("canvas");
      cropCanvas.width = width;
      cropCanvas.height = height;
      const cropCtx = cropCanvas.getContext("2d");
      cropCtx.putImageData(cropImage, 0, 0);
      setCroppedImage(cropCanvas.toDataURL());
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {image && (
        <canvas
          ref={canvasRef}
          width={canvasWidth}
          height={canvasHeight}
          onMouseDown={handleCanvasMouseDown}
          onMouseMove={handleCanvasMouseMove}
          onMouseUp={handleCanvasMouseUp}
        >
          Your browser does not support the HTML canvas tag.
        </canvas>
      )}
      {cropRect && (
        <div
          style={{
            position: "absolute",
            left: cropRect.x,
            top: cropRect.y,
            width: cropRect.width,
            height: cropRect.height,
            border: "1px solid red",
          }}
        />
      )}
      {croppedImage && <img src={croppedImage} alt="Cropped Image" />}
    </div>
  );
}

export default ImageCrop;
