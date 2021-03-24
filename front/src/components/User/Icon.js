// https://codesandbox.io/s/react-image-crop-demo-with-react-hooks-y831o?file=/src/App.js:0-3132

import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import '../../css/User.css';

import Button from '../../Atoms/Button';

export default function App(props){
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 1 / 1 });
  const [canvasResult, setCanvasResult] = useState('');
  const [completedCrop, setCompletedCrop] = useState(null);

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  function onCanvas(){
    props.setCropResult(canvasResult);
    props.setInputImage('');
  }

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    // setCanvasResult(canvas.toDataURL());
    canvas.toBlob((b) => {
      setCanvasResult(b);
    }, 'image/jpeg', 1.0);
    
  }, [completedCrop]);

  return (
    <div className="icon-back">
      <div className="icon-box">
        <div className="icon-crop">
          <ReactCrop
            src={props.inputImage}
            onImageLoaded={onLoad}
            crop={crop}
            circularCrop={ true }
            onChange={(e) => setCrop(e)}
            onComplete={(e) => setCompletedCrop(e)}
          />
          <div>
            <canvas className="icon-canvas" ref={previewCanvasRef} />
          </div>
          <Button color={ 'Thema' } pushSubmit={ onCanvas } text={ '決定' } />
        </div>
      </div>
    </div>
  );
}