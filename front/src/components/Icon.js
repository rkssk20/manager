// https://codesandbox.io/s/react-image-crop-demo-with-react-hooks-y831o?file=/src/App.js:0-3132
import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Backdrop from '@material-ui/core/Backdrop';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const back = {
  zIndex: 8,
};
const paper = {
  width: '80%',
  maxWidth: 560,
  height: 500,
  padding: 30,
};
const image = {
  marginBottom: 10,
};
const box = {
  width: 130,
  height: 130,
  margin: 'auto',
  marginBottom: 10,
};
const canvas = {
  width: 130,
  height: 130,
  borderRadius: '50%'
};
const button = {
  width: 100,
  height: 40,
  fontSize: '1.5rem',
};

export default function App(props){
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 1 / 1 });
  const [canvasResult, setCanvasResult] = useState('');
  const [completedCrop, setCompletedCrop] = useState(null);
  
  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);
  
  // 範囲を決定して閉じる
  function onCanvas(){
    props.setCropResult(canvasResult);
    props.setInputImage('');
  };
  
  // 決定せず破棄して閉じる
  function noCanvas(e){
    if(e.currentTarget){
      props.setInputImage('');
    }
  };

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
    <Backdrop style={ back } open={ true }>
      <ClickAwayListener onClickAway={ noCanvas }>
        <Paper style={ paper }>
          <div>
            {/* 画像全体 */}
            <ReactCrop
              style={ image }
              src={props.inputImage}
              onImageLoaded={onLoad}
              crop={crop}
              circularCrop={ true }
              onChange={(e) => setCrop(e)}
              onComplete={(e) => setCompletedCrop(e)}
            />
              
            {/* 切り取った画像 */}
            <div style={ box }>
              <canvas style={ canvas } ref={previewCanvasRef} />
            </div>

            <Button
              style={ button }
              color="primary"
              variant="contained"
              disableElevation
              fontSize="large"
              onClick={ onCanvas }
            >
              決定
            </Button>
          </div>
        </Paper>
      </ClickAwayListener>
    </Backdrop>
  );
}