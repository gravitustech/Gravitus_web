import React, { useState } from "react";
import ReactCrop from 'react-image-crop';

import 'react-image-crop/dist/ReactCrop.css';
import demoImage from "./demo-image.jpg";
import '../_cropper/index.css';

function ImageCropper(props) {
  const { imageToCrop, onImageCropped } = props;

  const [cropConfig, setCropConfig] = useState(
    // Default Crop Config
    // {
    //     unit: '%',
    //     width: 100,
    //     aspect: 16 / 9,
    // }

    // Center Crop Config
    {
      unit: '%',
      width: 50,
      height: 50,
      x: 25,
      y: 25
    }
  );

  const [imageRef, setImageRef] = useState();

  async function cropImage(crop) {
    if (imageRef && crop.width && crop.height) {
      const croppedImage = await getCroppedImage(
        imageRef,
        crop,
        'croppedImage.jpeg' // destination filename
      );

      // calling the props function to expose
      // croppedImage to the parent component
      onImageCropped(croppedImage);
    }
  }

  function getCroppedImage(sourceImage, cropConfig, fileName) {
    // creating the cropped image from the source image
    const canvas = document.createElement('canvas');
    const scaleX = sourceImage.naturalWidth / sourceImage.width;
    const scaleY = sourceImage.naturalHeight / sourceImage.height;
    canvas.width = cropConfig.width;
    canvas.height = cropConfig.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      sourceImage,
      cropConfig.x * scaleX,
      cropConfig.y * scaleY,
      cropConfig.width * scaleX,
      cropConfig.height * scaleY,
      0,
      0,
      cropConfig.width,
      cropConfig.height
    );

    return new Promise((resolve, reject) => {
      // Coded by Me  
      const blobToBase64 = blob => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);

        return new Promise(resolve => {
          reader.onloadend = () => {
            resolve(reader.result);
          };
        });
      };

      var imgData = canvas.toDataURL();
      resolve(imgData);

      // canvas.toBlob(
      //     (blob) => {
      //         // returning an error
      //         if (!blob) {
      //             reject(new Error('Canvas is empty'));
      //             return;
      //         }

      //         blob.name = fileName;
      //         // creating a Object URL representing the Blob object given
      //         const croppedImageUrl = window.URL.createObjectURL(blob);

      //         resolve(croppedImageUrl);
      //     }, 'image/jpeg'
      // );
    });
  }

  return (
    <ReactCrop
      src={imageToCrop} // demoImage - Changed by Me
      crop={cropConfig}
      ruleOfThirds
      onImageLoaded={(imageRef) => setImageRef(imageRef)}
      onComplete={(cropConfig) => cropImage(cropConfig)}
      onChange={(cropConfig) => setCropConfig(cropConfig)}
      crossorigin="anonymous" // to avoid CORS-related problems
    />
  );
}

ImageCropper.defaultProps = {
  onImageCropped: () => { }
}

export default ImageCropper;