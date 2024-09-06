import React, { useState, useRef } from 'react';

const PreviewModal = ({ file, onClose, watermarkText, onSave }) => {
  const [editedFile, setEditedFile] = useState(file);
  const imgRef = useRef(null);

  const handleSave = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (file.type.startsWith('image')) {
      canvas.width = imgRef.current.width;
      canvas.height = imgRef.current.height;
      ctx.drawImage(imgRef.current, 0, 0);

      if (watermarkText) {
        ctx.font = '20px Arial';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fillText(watermarkText, canvas.width - 100, canvas.height - 20);
      }

      const updatedFile = {
        ...file,
        url: canvas.toDataURL(),
      };

      setEditedFile(updatedFile);
      onSave(updatedFile);
    } else if (file.type.startsWith('video')) {
      // Handle video editing (if needed)
    } else if (file.type === 'application/pdf') {
      // Handle PDF editing (if needed)
    } else if (file.type.startsWith('audio')) {
      // Handle audio editing (if needed)
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="relative max-w-4xl p-4 bg-white rounded-lg">
        <button onClick={onClose} className="absolute top-2 right-2 text-white bg-red-600 px-2 py-1 rounded">
          Close
        </button>
        <div className="overflow-auto max-h-96">
          {file.type.startsWith('image') && <img ref={imgRef} src={file.url} alt={file.name} className="w-full h-auto" />}
          {file.type.startsWith('video') && (
            <video controls className="w-full h-auto">
              <source src={file.url} type={file.type} />
              Your browser does not support the video tag.
            </video>
          )}
          {file.type === 'application/pdf' && (
            <embed src={file.url} type="application/pdf" className="w-full h-auto" />
          )}
          {file.type.startsWith('audio') && (
            <audio controls className="w-full h-auto">
              <source src={file.url} type={file.type} />
              Your browser does not support the audio tag.
            </audio>
          )}
        </div>
        <div className="mt-4 flex justify-between">
          <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;


// import React, { useState, useRef } from 'react';

// const PreviewModal = ({ file, onClose, watermark, onSave }) => {
//   const [crop, setCrop] = useState({ x: 0, y: 0, width: 100, height: 100 });
//   const [resize, setResize] = useState({ width: 300, height: 300 });
//   const imgRef = useRef(null);

//   const applyWatermark = (ctx, width, height) => {
//     if (typeof watermark === 'string') {
//       // Text watermark
//       ctx.font = '30px Arial';
//       ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
//       ctx.fillText(watermark, width - 150, height - 30);
//     } else if (watermark instanceof Image) {
//       // Image watermark
//       ctx.drawImage(watermark, width - 150, height - 100, 100, 100);
//     }
//   };

//   const handleCropAndSave = () => {
//     const canvas = document.createElement('canvas');
//     const ctx = canvas.getContext('2d');

//     canvas.width = crop.width;
//     canvas.height = crop.height;
//     ctx.drawImage(
//       imgRef.current,
//       crop.x, crop.y, crop.width, crop.height,
//       0, 0, crop.width, crop.height
//     );

//     if (watermark) {
//       applyWatermark(ctx, crop.width, crop.height);
//     }

//     const croppedImage = canvas.toDataURL('image/jpeg');
//     onSave({ ...file, url: croppedImage });
//     onClose();
//   };

//   const handleResizeAndSave = () => {
//     const canvas = document.createElement('canvas');
//     const ctx = canvas.getContext('2d');

//     canvas.width = resize.width;
//     canvas.height = resize.height;
//     ctx.drawImage(imgRef.current, 0, 0, resize.width, resize.height);

//     if (watermark) {
//       applyWatermark(ctx, resize.width, resize.height);
//     }

//     const resizedImage = canvas.toDataURL('image/jpeg');
//     onSave({ ...file, url: resizedImage });
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
//       <div className="relative max-w-4xl p-4 bg-white rounded-lg">
//         <button onClick={onClose} className="absolute top-2 right-2 text-white bg-red-600 px-2 py-1 rounded">
//           Close
//         </button>
//         <div className="overflow-auto max-h-96">
//           <img ref={imgRef} src={file.url} alt={file.name} className="w-full h-auto" />
//         </div>
//         <div className="mt-4">
//           {/* Cropping and Resizing Controls */}
//           <button onClick={handleCropAndSave} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Crop & Save</button>
//           <button onClick={handleResizeAndSave} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Resize & Save</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PreviewModal;
