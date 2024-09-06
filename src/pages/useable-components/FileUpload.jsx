import { Minimize2, SquareX } from 'lucide-react';
import React, { useState, useRef } from 'react';

const FileUpload = ({ onFileUpload, allowMultiple = false }) => {
  const [filePreviews, setFilePreviews] = useState([]);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCropping, setIsCropping] = useState(false);
  const [cropData, setCropData] = useState({ x: 0, y: 0, width: 100, height: 100 });
  const [cropImage, setCropImage] = useState(null);
  const imgRef = useRef(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map(file => ({
      name: file.name,
      type: file.type,
      url: URL.createObjectURL(file)
    }));
    setFilePreviews(prev => allowMultiple ? [...prev, ...newPreviews] : newPreviews);
    onFileUpload(files);
  };

  const openModal = (index) => {
    setCurrentFileIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleNext = () => {
    setCurrentFileIndex((currentFileIndex + 1) % filePreviews.length);
  };

  const handlePrevious = () => {
    setCurrentFileIndex((currentFileIndex - 1 + filePreviews.length) % filePreviews.length);
  };

  const handleCropStart = () => {
    setIsCropping(true);
    const imgElement = imgRef.current;
    setCropImage(imgElement.src);
  };

  const handleCropMove = (e) => {
    if (!isCropping) return;

    const { offsetX, offsetY } = e.nativeEvent;
    setCropData({ ...cropData, width: offsetX - cropData.x, height: offsetY - cropData.y });
  };

  const handleCropEnd = () => {
    setIsCropping(false);
    // Process the cropped area, create a new image, etc.
  };

  const handleDelete = (index) => {
    setFilePreviews(prev => prev.filter((_, i) => i !== index));
    if (isModalOpen && index === currentFileIndex) {
      closeModal();
    }
  };

  const getPreviewSize = (file) => {
    if (file.type.startsWith('image/')) {
      return 'h-24 w-24';
    }
    if (file.type.startsWith('video/')) {
      return 'h-24 w-24';
    }
    if (file.type === 'application/pdf' || file.type.includes('web')) {
      return 'h-16 w-16';
    }
    return 'h-12 w-12';
  };

  const renderPreview = (file, index) => {
    const previewSize = getPreviewSize(file);
    return (
      <div key={index} className="relative">
        {file.type.startsWith('image/') && (
          <img
            src={file.url}
            alt={`Preview ${index}`}
            className={`mx-auto ${previewSize} object-contain cursor-pointer rounded-xl border-none border-gray-300`}
            onClick={() => openModal(index)}
          />
        )}
        {file.type.startsWith('video/') && (
          <video
            src={file.url}
            controls
            className={`mx-auto ${previewSize} object-cover cursor-pointer rounded-md border border-gray-300`}
            onClick={() => openModal(index)}
          />
        )}
        {file.type === 'application/pdf' && (
          <div
            className={`mx-auto ${previewSize} bg-gray-200 flex items-center justify-center cursor-pointer rounded-md border border-gray-300`}
            onClick={() => openModal(index)}
          >
            <span className="text-gray-500">PDF</span>
          </div>
        )}
        {file.type.includes('web') && (
          <div
            className={`mx-auto ${previewSize} bg-gray-200 flex items-center justify-center cursor-pointer rounded-md border border-gray-300`}
            onClick={() => openModal(index)}
          >
            {/* <span className="text-gray-500">HTML</span> */}
          </div>
        )}
        <button
          className="absolute top-0 right-0 text-red-600"
          onClick={() => handleDelete(index)}
        >
          {/* X */}
          <SquareX />
        </button>
      </div>
    );
  };

  const renderModalContent = () => {
    const file = filePreviews[currentFileIndex];
    if (!file) return null;

    if (file.type.startsWith('image/')) {
      return (
        <div className="relative">
          <img
            src={file.url}
            ref={imgRef}
            alt="Crop"
            className="max-w-full max-h-100"
            onMouseMove={handleCropMove}
            onMouseDown={handleCropStart}
            onMouseUp={handleCropEnd}
          />
          {isCropping && (
            <div
              className="absolute border-2 border-dashed border-gray-400"
              style={{
                top: `${cropData.y}px`,
                left: `${cropData.x}px`,
                width: `${cropData.width}px`,
                height: `${cropData.height}px`
              }}
            />
          )}
          <div className="mt-2">
            <button
              onClick={handleCropEnd}
              className="mr-2 px-4 py-2 bg-blue-600 text-white rounded"
            >
              Crop & Save
            </button>
          </div>
        </div>
      );
    } else if (file.type.startsWith('video/')) {
      return (
        <video src={file.url} controls className="max-w-full max-h-full" />
      );
    } else if (file.type.startsWith('audio/')) {
      return (
        <audio src={file.url} controls className="w-full" />
      );
    } else if (file.type === 'application/pdf') {
      return (
        <embed src={file.url} type="application/pdf" className="w-full h-80" />
      );
    } else if (file.type.includes('web')) {
      return (
        <iframe src={file.url} className="w-full h-80" />
      );
    } else {
      return <p>Unsupported file type</p>;
    }
  };

  return (
    <div className="col-span-full">
      <label htmlFor="file-upload" className="block text-sm font-medium leading-6 text-gray-900">
        Upload File
      </label>
      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 bg-gray-50">
        <div className="text-center">
          {filePreviews.length > 0 && (
            <div className="flex flex-wrap justify-center space-x-1 space-y-1">
              {filePreviews.map((file, index) => renderPreview(file, index))}
            </div>
          )}
          <div className="mt-4 flex text-sm leading-6 text-gray-600">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-lg bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
            >
              <span>Upload a file</span>
              <input
                id="file-upload"
                onChange={handleFileChange}
                name="file-upload"
                type="file"
                className="sr-only"
                multiple={allowMultiple}
                accept="image/*,video/*,audio/*,.pdf,.html,.webp"
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs leading-5 text-gray-600">Supported file types: Images, Videos, Audio, PDFs, HTML, Web files</p>
        </div>
      </div>

      {/* Modal for file preview */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative max-w-3xl p-4 bg-white rounded-lg">
            <button onClick={closeModal} className="absolute top-2 right-2 text-white bg-red-600 px-2 py-1 rounded z-20">
              {/* Close */}
              <Minimize2 />
            </button>
            <div className="overflow-auto max-h-96">
              {renderModalContent()}
            </div>
            <div className="mt-4 flex justify-between">
              <button onClick={handlePrevious} className="bg-blue-500 text-white px-4 py-2 rounded">Previous</button>
              <button onClick={handleNext} className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;

// import React, { useState, useRef } from 'react';

// const FileUpload = ({ onFileUpload, allowMultiple = false }) => {
//   const [filePreviews, setFilePreviews] = useState([]);
//   const [currentFileIndex, setCurrentFileIndex] = useState(0);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isCropping, setIsCropping] = useState(false);
//   const [cropData, setCropData] = useState({ x: 0, y: 0, width: 100, height: 100 });
//   const [cropImage, setCropImage] = useState(null);
//   const imgRef = useRef(null);

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     const newPreviews = files.map(file => ({
//       name: file.name,
//       type: file.type,
//       url: URL.createObjectURL(file)
//     }));
//     setFilePreviews(prev => allowMultiple ? [...prev, ...newPreviews] : newPreviews);
//     onFileUpload(files);
//   };

//   const openModal = (index) => {
//     setCurrentFileIndex(index);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleNext = () => {
//     setCurrentFileIndex((currentFileIndex + 1) % filePreviews.length);
//   };

//   const handlePrevious = () => {
//     setCurrentFileIndex((currentFileIndex - 1 + filePreviews.length) % filePreviews.length);
//   };

//   const handleCropStart = () => {
//     setIsCropping(true);
//     const imgElement = imgRef.current;
//     setCropImage(imgElement.src);
//   };

//   const handleCropMove = (e) => {
//     if (!isCropping) return;

//     const { offsetX, offsetY } = e.nativeEvent;
//     setCropData({ ...cropData, width: offsetX - cropData.x, height: offsetY - cropData.y });
//   };

//   const handleCropEnd = () => {
//     setIsCropping(false);
//     // Process the cropped area, create a new image, etc.
//   };

//   const handleDelete = (index) => {
//     setFilePreviews(prev => prev.filter((_, i) => i !== index));
//     if (isModalOpen && index === currentFileIndex) {
//       closeModal();
//     }
//   };

//   const renderPreview = (file, index) => {
//     return (
//       <div key={index} className="relative">
//         {file.type.startsWith('image/') && (
//           <img
//             src={file.url}
//             alt={`Preview ${index}`}
//             className="mx-auto h-12 w-12 object-contain cursor-pointer"
//             onClick={() => openModal(index)}
//           />
//         )}
//         {file.type.startsWith('video/') && (
//           <video
//             src={file.url}
//             controls
//             className="mx-auto h-12 w-12 object-cover cursor-pointer"
//             onClick={() => openModal(index)}
//           />
//         )}
//         {file.type === 'application/pdf' && (
//           <div className="mx-auto h-12 w-12 bg-gray-200 flex items-center justify-center cursor-pointer" onClick={() => openModal(index)}>
//             <span className="text-gray-500">PDF</span>
//           </div>
//         )}
//         {file.type.includes('web') && (
//           <div className="mx-auto h-12 w-12 bg-gray-200 flex items-center justify-center cursor-pointer" onClick={() => openModal(index)}>
//             <span className="text-gray-500">HTML</span>
//           </div>
//         )}
//         <button
//           className="absolute top-0 right-0 text-red-600"
//           onClick={() => handleDelete(index)}
//         >
//           X
//         </button>
//       </div>
//     );
//   };

//   const renderModalContent = () => {
//     const file = filePreviews[currentFileIndex];
//     if (!file) return null;

//     if (file.type.startsWith('image/')) {
//       return (
//         <div className="relative">
//           <img
//             src={file.url}
//             ref={imgRef}
//             alt="Crop"
//             className="max-w-full max-h-100"
//             onMouseMove={handleCropMove}
//             onMouseDown={handleCropStart}
//             onMouseUp={handleCropEnd}
//           />
//           {isCropping && (
//             <div
//               className="absolute border-2 border-dashed border-gray-400"
//               style={{
//                 top: `${cropData.y}px`,
//                 left: `${cropData.x}px`,
//                 width: `${cropData.width}px`,
//                 height: `${cropData.height}px`
//               }}
//             />
//           )}
//           <div className="mt-2">
//             <button
//               onClick={handleCropEnd}
//               className="mr-2 px-4 py-2 bg-blue-600 text-white rounded"
//             >
//               Crop & Save
//             </button>
//           </div>
//         </div>
//       );
//     } else if (file.type.startsWith('video/')) {
//       return (
//         <video src={file.url} controls className="max-w-full max-h-full" />
//       );
//     } else if (file.type.startsWith('audio/')) {
//       return (
//         <audio src={file.url} controls className="w-full" />
//       );
//     } else if (file.type === 'application/pdf') {
//       return (
//         <embed src={file.url} type="application/pdf" className="w-full h-80" />
//       );
//     } else if (file.type.includes('web')) {
//       return (
//         <iframe src={file.url} className="w-full h-80" />
//       );
//     } else {
//       return <p>Unsupported file type</p>;
//     }
//   };

//   return (
//     <div className="col-span-full">
//       <label htmlFor="file-upload" className="block text-sm font-medium leading-6 text-gray-900">
//         Upload File
//       </label>
//       <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
//         <div className="text-center">
//           {filePreviews.length > 0 && (
//             <div className="flex flex-wrap justify-center space-x-2 space-y-2">
//               {filePreviews.map((file, index) => renderPreview(file, index))}
//             </div>
//           )}
//           <div className="mt-4 flex text-sm leading-6 text-gray-600">
//             <label
//               htmlFor="file-upload"
//               className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
//             >
//               <span>Upload a file</span>
//               <input
//                 id="file-upload"
//                 onChange={handleFileChange}
//                 name="file-upload"
//                 type="file"
//                 className="sr-only"
//                 multiple={allowMultiple}
//                 accept="image/*,video/*,audio/*,.pdf,.html,.webp"
//               />
//             </label>
//             <p className="pl-1">or drag and drop</p>
//           </div>
//           <p className="text-xs leading-5 text-gray-600">Supported file types: Images, Videos, Audio, PDFs, HTML, Web files</p>
//         </div>
//       </div>

//       {/* Modal for file preview */}
//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
//           <div className="relative max-w-3xl p-4 bg-white rounded-lg">
//             <button onClick={closeModal} className="absolute top-2 right-2 text-white bg-red-600 px-2 py-1 rounded">
//               Close
//             </button>
//             <div className="overflow-auto max-h-96">
//               {renderModalContent()}
//             </div>
//             <div className="mt-4 flex justify-between">
//               <button onClick={handlePrevious} className="bg-blue-500 text-white px-4 py-2 rounded">Previous</button>
//               <button onClick={handleNext} className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FileUpload;

// import React, { useState, useRef } from 'react';

// const FileUpload = ({
//   onFileUpload,
//   onSave,
//   watermarkText = '',
//   watermarkImage = '',
//   allowMultiple = false,
//   viewOnly = false,
// }) => {
//   const [filePreviews, setFilePreviews] = useState([]);
//   const [currentFileIndex, setCurrentFileIndex] = useState(0);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [cropData, setCropData] = useState(null);
//   const [imageCrop, setImageCrop] = useState(null);
//   const fileInputRef = useRef(null);

//   // Generate image thumbnail
//   const generateImageThumbnail = (file) => {
//     const reader = new FileReader();
//     return new Promise((resolve) => {
//       reader.onload = (e) => {
//         const img = new Image();
//         img.onload = () => {
//           const canvas = document.createElement('canvas');
//           const context = canvas.getContext('2d');
//           canvas.width = 100;
//           canvas.height = 100;
//           context.drawImage(img, 0, 0, canvas.width, canvas.height);
//           resolve(canvas.toDataURL('image/jpeg'));
//         };
//         img.src = e.target.result;
//       };
//       reader.readAsDataURL(file);
//     });
//   };

//   // Generate PDF thumbnail
//   const generatePdfThumbnail = (file) => {
//     const reader = new FileReader();
//     return new Promise((resolve) => {
//       reader.onload = async (e) => {
//         const url = URL.createObjectURL(new Blob([e.target.result], { type: 'application/pdf' }));
//         const iframe = document.createElement('iframe');
//         iframe.style.visibility = 'hidden';
//         iframe.src = url;
//         document.body.appendChild(iframe);
        
//         iframe.onload = async () => {
//           const canvas = document.createElement('canvas');
//           const ctx = canvas.getContext('2d');
//           const iframeDocument = iframe.contentDocument;
//           const iframeWindow = iframe.contentWindow;
  
//           // Check if PDFViewerApplication is available
//           if (iframeWindow.PDFViewerApplication) {
//             const pdf = iframeWindow.PDFViewerApplication.pdfDocument;
//             const page = await pdf.getPage(1);
//             const viewport = page.getViewport({ scale: 0.2 });
//             canvas.width = viewport.width;
//             canvas.height = viewport.height;
//             await page.render({ canvasContext: ctx, viewport }).promise;
//             document.body.removeChild(iframe);
//             resolve(canvas.toDataURL('image/jpeg'));
//           } else {
//             document.body.removeChild(iframe);
//             resolve(null); // or some default image
//           }
//         };
//       };
//       reader.readAsArrayBuffer(file);
//     });
//   };
//   // Handle file changes
//   const handleFileChange = async (event) => {
//     const files = Array.from(event.target.files);
//     const previews = await Promise.all(
//       files.map(async (file) => {
//         let thumbnail = null;
//         if (file.type.startsWith('image/')) {
//           thumbnail = await generateImageThumbnail(file);
//         } else if (file.type === 'application/pdf') {
//           thumbnail = await generatePdfThumbnail(file);
//         } else if (file.type.startsWith('video/')) {
//           thumbnail = URL.createObjectURL(file);
//         }
//         return {
//           name: file.name,
//           type: file.type,
//           url: URL.createObjectURL(file),
//           thumbnail,
//           file,
//         };
//       })
//     );
//     setFilePreviews((prev) => (allowMultiple ? [...prev, ...previews] : previews));
//     onFileUpload(files);
//   };

//   // Handle modal open
//   const handleModalOpen = (index) => {
//     setCurrentFileIndex(index);
//     setIsModalOpen(true);
//   };

//   // Handle modal close
//   const handleModalClose = () => {
//     setIsModalOpen(false);
//   };

//   // Handle next file
//   const handleNext = () => {
//     setCurrentFileIndex((prevIndex) => (prevIndex + 1) % filePreviews.length);
//   };

//   // Handle previous file
//   const handlePrevious = () => {
//     setCurrentFileIndex((prevIndex) => (prevIndex - 1 + filePreviews.length) % filePreviews.length);
//   };

//   // Handle delete file
//   const handleDelete = (index) => {
//     setFilePreviews((prev) => prev.filter((_, i) => i !== index));
//   };

//   // Handle save file
//   const handleSave = () => {
//     const file = filePreviews[currentFileIndex];
//     onSave(file);
//     handleModalClose();
//   };

//   // Render file preview
//   const renderPreview = (file, index) => (
//     <div key={index} className="relative">
//       <img
//         src={file.thumbnail || file.url}
//         alt={`Thumbnail ${index}`}
//         className="mx-auto h-12 w-12 object-contain cursor-pointer"
//         onClick={() => handleModalOpen(index)}
//       />
//       {!viewOnly && (
//         <button
//           onClick={() => handleDelete(index)}
//           className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
//         >
//           ×
//         </button>
//       )}
//     </div>
//   );

//   // Render modal content
//   const renderModalContent = () => {
//     const file = filePreviews[currentFileIndex];
//     if (!file) return null;

//     if (file.type.startsWith('image/')) {
//       return (
//         <div className="relative">
//           <img
//             src={file.url}
//             alt={`Preview ${currentFileIndex}`}
//             style={{ maxWidth: '100%', maxHeight: '400px' }}
//           />
//         </div>
//       );
//     } else if (file.type.startsWith('video/')) {
//       return (
//         <div className="relative">
//           <video src={file.url} controls className="max-w-full max-h-full" />
//         </div>
//       );
//     } else if (file.type === 'application/pdf') {
//       return (
//         <iframe src={file.url} className="w-full h-96" />
//       );
//     } else {
//       return <p>Unsupported file type</p>;
//     }
//   };

//   return (
//     <div className="col-span-full">
//       <label htmlFor="file-upload" className="block text-sm font-medium leading-6 text-gray-900">
//         Upload File
//       </label>
//       <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
//         <div className="text-center">
//           {filePreviews.length > 0 && (
//             <div className="flex flex-wrap justify-center space-x-2 space-y-2">
//               {filePreviews.map((file, index) => renderPreview(file, index))}
//             </div>
//           )}
//           <div className="mt-4 flex text-sm leading-6 text-gray-600">
//             <label
//               htmlFor="file-upload"
//               className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
//             >
//               <span>{viewOnly ? 'View Only' : 'Upload a file'}</span>
//               <input
//                 id="file-upload"
//                 onChange={handleFileChange}
//                 name="file-upload"
//                 type="file"
//                 className="sr-only"
//                 multiple={allowMultiple}
//                 accept="image/*,video/*,audio/*,.pdf,.html,.webp"
//                 disabled={viewOnly}
//               />
//             </label>
//             <p className="pl-1">or drag and drop</p>
//           </div>
//           <p className="text-xs leading-5 text-gray-600">Supported file types: Images, Videos, Audio, PDFs, HTML, Web files</p>
//         </div>
//       </div>

//       {/* Modal for file preview */}
//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
//           <div className="relative bg-white p-4 rounded-lg shadow-lg max-w-3xl">
//             <button
//               onClick={handleModalClose}
//               className="absolute top-0 right-0 p-2 bg-red-500 text-white rounded-full"
//             >
//               ×
//             </button>
//             {renderModalContent()}
//             <div className="mt-4 flex justify-between">
//               <button
//                 onClick={handlePrevious}
//                 className="px-4 py-2 bg-gray-600 text-white rounded"
//               >
//                 Previous
//               </button>
//               <button
//                 onClick={handleNext}
//                 className="px-4 py-2 bg-gray-600 text-white rounded"
//               >
//                 Next
//               </button>
//               <button
//                 onClick={handleSave}
//                 className="px-4 py-2 bg-blue-600 text-white rounded"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FileUpload;

// update...
// import React, { useState, useRef } from 'react';

// const FileUpload = ({ 
//   onFileUpload, 
//   allowMultiple = false, 
//   watermarkText = '', 
//   watermarkImage = null, 
//   onSave, 
//   viewOnly = false 
// }) => {
//   const [filePreviews, setFilePreviews] = useState([]);
//   const [currentFileIndex, setCurrentFileIndex] = useState(0);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isCropping, setIsCropping] = useState(false);
//   const [cropData, setCropData] = useState({ x: 0, y: 0, width: 100, height: 100 });
//   const [cropImage, setCropImage] = useState(null);
//   const imgRef = useRef(null);

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     const newPreviews = files.map(file => ({
//       name: file.name,
//       type: file.type,
//       url: URL.createObjectURL(file)
//     }));
//     setFilePreviews(prev => allowMultiple ? [...prev, ...newPreviews] : newPreviews);
//     onFileUpload(files);
//   };

//   const openModal = (index) => {
//     setCurrentFileIndex(index);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleNext = () => {
//     setCurrentFileIndex((currentFileIndex + 1) % filePreviews.length);
//   };

//   const handlePrevious = () => {
//     setCurrentFileIndex((currentFileIndex - 1 + filePreviews.length) % filePreviews.length);
//   };

//   const handleCropStart = () => {
//     setIsCropping(true);
//     const imgElement = imgRef.current;
//     setCropImage(imgElement.src);
//   };

//   const handleCropMove = (e) => {
//     if (!isCropping) return;

//     const { offsetX, offsetY } = e.nativeEvent;
//     setCropData({ ...cropData, width: offsetX, height: offsetY });
//   };

//   const handleCropEnd = () => {
//     setIsCropping(false);
//     // Process the cropped area, create a new image, etc.
//   };

//   const applyWatermark = (ctx) => {
//     if (watermarkText) {
//       ctx.font = '20px Arial';
//       ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
//       ctx.fillText(watermarkText, 10, 30);
//     }
//     if (watermarkImage) {
//       const img = new Image();
//       img.src = watermarkImage;
//       img.onload = () => {
//         ctx.drawImage(img, 10, 10, 100, 100);
//       };
//     }
//   };

//   const handleSave = () => {
//     if (imgRef.current) {
//       const canvas = document.createElement('canvas');
//       const ctx = canvas.getContext('2d');
//       canvas.width = imgRef.current.width;
//       canvas.height = imgRef.current.height;

//       ctx.drawImage(imgRef.current, 0, 0);
//       applyWatermark(ctx);

//       const updatedFile = {
//         ...filePreviews[currentFileIndex],
//         url: canvas.toDataURL()
//       };

//       setFilePreviews(filePreviews.map((file, index) => 
//         index === currentFileIndex ? updatedFile : file
//       ));
//       onSave(updatedFile);
//       closeModal();
//     }
//   };

//   const renderPreview = (file, index) => (
//     <div key={index} className="relative">
//       {file.type.startsWith('image/') && (
//         <img
//           src={file.url}
//           alt={`Preview ${index}`}
//           className="mx-auto h-12 w-12 object-contain cursor-pointer"
//           onClick={() => openModal(index)}
//         />
//       )}
//       {file.type.startsWith('video/') && (
//         <video
//           src={file.url}
//           controls
//           className="mx-auto h-12 w-12 object-cover cursor-pointer"
//           onClick={() => openModal(index)}
//         />
//       )}
//       {file.type.startsWith('audio/') && (
//         <audio
//           src={file.url}
//           controls
//           className="mx-auto h-12 w-12 object-cover cursor-pointer"
//           onClick={() => openModal(index)}
//         />
//       )}
//       {file.type === 'application/pdf' && (
//         <embed
//           src={file.url}
//           type="application/pdf"
//           className="mx-auto h-12 w-12 object-cover cursor-pointer"
//           onClick={() => openModal(index)}
//         />
//       )}
//       {file.type.includes('web') && (
//         <iframe
//           src={file.url}
//           className="mx-auto h-12 w-12 object-cover cursor-pointer"
//           onClick={() => openModal(index)}
//         />
//       )}
//     </div>
//   );

//   const renderModalContent = () => {
//     const file = filePreviews[currentFileIndex];
//     if (!file) return null;

//     if (file.type.startsWith('image/')) {
//       return (
//         <div className="relative">
//           <img
//             src={file.url}
//             ref={imgRef}
//             alt="Crop"
//             className="max-w-full max-h-full"
//             onMouseMove={handleCropMove}
//             onMouseDown={handleCropStart}
//             onMouseUp={handleCropEnd}
//           />
//           {isCropping && (
//             <div
//               className="absolute border-2 border-dashed border-gray-400"
//               style={{
//                 top: `${cropData.y}px`,
//                 left: `${cropData.x}px`,
//                 width: `${cropData.width}px`,
//                 height: `${cropData.height}px`
//               }}
//             />
//           )}
//           <div className="mt-2 flex">
//             <button
//               onClick={handleCropEnd}
//               className="mr-2 px-4 py-2 bg-blue-600 text-white rounded"
//             >
//               Crop
//             </button>
//             <button
//               onClick={handleSave}
//               className="px-4 py-2 bg-green-600 text-white rounded"
//             >
//               Save
//             </button>
//           </div>
//         </div>
//       );
//     } else if (file.type.startsWith('video/')) {
//       return (
//         <video src={file.url} controls className="max-w-full max-h-full" />
//       );
//     } else if (file.type.startsWith('audio/')) {
//       return (
//         <audio src={file.url} controls className="w-full" />
//       );
//     } else if (file.type === 'application/pdf') {
//       return (
//         <embed src={file.url} type="application/pdf" className="w-full h-64" />
//       );
//     } else if (file.type.includes('web')) {
//       return (
//         <iframe src={file.url} className="w-full h-64" />
//       );
//     } else {
//       return <p>Unsupported file type</p>;
//     }
//   };

//   return (
//     <div className="col-span-full bg-slate-50">
//       {!viewOnly && (
//         <>
//           <label htmlFor="file-upload" className="block text-sm font-medium leading-6 text-gray-900">
//             Upload File
//           </label>
//           <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
//             <div className="text-center">
//               {filePreviews.length > 0 && (
//                 <div className="flex flex-wrap justify-center space-x-2 space-y-2">
//                   {filePreviews.map((file, index) => renderPreview(file, index))}
//                 </div>
//               )}
//               <div className="mt-4 flex text-sm leading-6 text-gray-600">
//                 <label
//                   htmlFor="file-upload"
//                   className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
//                 >
//                   <span>Upload a file</span>
//                   <input
//                     id="file-upload"
//                     onChange={handleFileChange}
//                     name="file-upload"
//                     type="file"
//                     className="sr-only"
//                     multiple={allowMultiple}
//                     accept="image/*,video/*,audio/*,.pdf,.html,.webp"
//                   />
//                 </label>
//                 <p className="pl-1">or drag and drop</p>
//               </div>
//               <p className="text-xs leading-5 text-gray-600">Supported file types: Images, Videos, Audio, PDFs, HTML, Web files</p>
//             </div>
//           </div>
//         </>
//       )}

//       {/* Modal for file preview */}
//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
//           <div className="relative max-w-3xl p-4 bg-white rounded-lg">
//             <button onClick={closeModal} className="absolute top-2 right-2 text-white bg-red-600 px-2 py-1 rounded">
//               Close
//             </button>
//             <div className="overflow-auto max-h-96">
//               {renderModalContent()}
//             </div>
//             <div className="mt-4 flex justify-between">
//               <button onClick={handlePrevious} className="bg-blue-500 text-white px-4 py-2 rounded">Previous</button>
//               <button onClick={handleNext} className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FileUpload;

//update ...
// import React, { useState, useRef } from 'react';
// import './FileUpload.css'
// const FileUpload = ({ onFileUpload, allowMultiple = false }) => {
//   const [filePreviews, setFilePreviews] = useState([]);
//   const [currentFileIndex, setCurrentFileIndex] = useState(0);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isCropping, setIsCropping] = useState(false);
//   const [cropData, setCropData] = useState({ x: 0, y: 0, width: 100, height: 100 });
//   const [cropImage, setCropImage] = useState(null);
//   const imgRef = useRef(null);

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     const newPreviews = files.map(file => ({
//       name: file.name,
//       type: file.type,
//       url: URL.createObjectURL(file)
//     }));
//     setFilePreviews(prev => allowMultiple ? [...prev, ...newPreviews] : newPreviews);
//     onFileUpload(files);
//   };

//   const openModal = (index) => {
//     setCurrentFileIndex(index);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleNext = () => {
//     setCurrentFileIndex((currentFileIndex + 1) % filePreviews.length);
//   };

//   const handlePrevious = () => {
//     setCurrentFileIndex((currentFileIndex - 1 + filePreviews.length) % filePreviews.length);
//   };

//   const handleCropStart = () => {
//     setIsCropping(true);
//     const imgElement = imgRef.current;
//     setCropImage(imgElement.src);
//   };

//   const handleCropMove = (e) => {
//     if (!isCropping) return;

//     const { offsetX, offsetY } = e.nativeEvent;
//     setCropData({ ...cropData, width: offsetX, height: offsetY });
//   };

//   const handleCropEnd = () => {
//     setIsCropping(false);
//     // Process the cropped area, create a new image, etc.
//   };

//   const renderPreview = (file, index) => {
//     return (
//       <div key={index} className="relative">
//         {file.type.startsWith('image/') && (
//           <img
//             src={file.url}
//             alt={`Preview ${index}`}
//             className="mx-auto h-12 w-12 object-contain cursor-pointer"
//             onClick={() => openModal(index)}
//           />
//         )}
//         {/* Add similar conditions for video, audio, PDF, and web files */}
//       </div>
//     );
//   };

//   const renderModalContent = () => {
//     const file = filePreviews[currentFileIndex];
//     if (!file) return null;

//     if (file.type.startsWith('image/')) {
//       return (
//         <div className="relative">
//           <img
//             src={file.url}
//             ref={imgRef}
//             alt="Crop"
//             className="max-w-full max-h-full"
//             onMouseMove={handleCropMove}
//             onMouseDown={handleCropStart}
//             onMouseUp={handleCropEnd}
//           />
//           {isCropping && (
//             <div
//               className="absolute border-2 border-dashed border-gray-400"
//               style={{
//                 top: `${cropData.y}px`,
//                 left: `${cropData.x}px`,
//                 width: `${cropData.width}px`,
//                 height: `${cropData.height}px`
//               }}
//             />
//           )}
//           <div className="mt-2">
//             <button
//               onClick={handleCropEnd}
//               className="mr-2 px-4 py-2 bg-blue-600 text-white rounded"
//             >
//               Crop & Save
//             </button>
//           </div>
//         </div>
//       );
//     } else if (file.type.startsWith('video/')) {
//       return (
//         <video src={file.url} controls className="max-w-full max-h-full" />
//       );
//     } else if (file.type.startsWith('audio/')) {
//       return (
//         <audio src={file.url} controls className="w-full" />
//       );
//     } else if (file.type === 'application/pdf') {
//       return (
//         <embed src={file.url} type="application/pdf" className="w-full h-64" />
//       );
//     } else if (file.type.includes('web')) {
//       return (
//         <iframe src={file.url} className="w-full h-64" />
//       );
//     } else {
//       return <p>Unsupported file type</p>;
//     }
//   };

//   return (
//     <div className="col-span-full">
//       <label htmlFor="file-upload" className="block text-sm font-medium leading-6 text-gray-900">
//         Upload File
//       </label>
//       <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
//         <div className="text-center">
//           {filePreviews.length > 0 && (
//             <div className="flex flex-wrap justify-center space-x-2 space-y-2">
//               {filePreviews.map((file, index) => renderPreview(file, index))}
//             </div>
//           )}
//           <div className="mt-4 flex text-sm leading-6 text-gray-600">
//             <label
//               htmlFor="file-upload"
//               className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
//             >
//               <span>Upload a file</span>
//               <input
//                 id="file-upload"
//                 onChange={handleFileChange}
//                 name="file-upload"
//                 type="file"
//                 className="sr-only"
//                 multiple={allowMultiple}
//                 accept="image/*,video/*,audio/*,.pdf,.html,.webp"
//               />
//             </label>
//             <p className="pl-1">or drag and drop</p>
//           </div>
//           <p className="text-xs leading-5 text-gray-600">Supported file types: Images, Videos, Audio, PDFs, HTML, Web files</p>
//         </div>
//       </div>

//       {/* Modal for file preview */}
//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
//           <div className="relative max-w-3xl p-4 bg-white rounded-lg">
//             <button onClick={closeModal} className="absolute top-2 right-2 text-white bg-red-600 px-2 py-1 rounded">
//               Close
//             </button>
//             <div className="overflow-auto max-h-96">
//               {renderModalContent()}
//             </div>
//             <div className="mt-4 flex justify-between">
//               <button onClick={handlePrevious} className="bg-blue-500 text-white px-4 py-2 rounded">Previous</button>
//               <button onClick={handleNext} className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FileUpload;


// import React, { useState } from 'react';

// const FileUpload = ({ onFileUpload, allowMultiple = false }) => {
//   const [filePreviews, setFilePreviews] = useState([]);

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     const newPreviews = files.map(file => ({
//       name: file.name,
//       type: file.type,
//       url: URL.createObjectURL(file)
//     }));
//     setFilePreviews(prev => allowMultiple ? [...prev, ...newPreviews] : newPreviews);
//     onFileUpload(files);  // Pass the selected files to the parent component
//   };

//   const renderPreview = (file, index) => {
//     const { type, url } = file;
//     if (type.startsWith('image/')) {
//       return <img key={index} src={url} alt={`Preview ${index}`} className="mx-auto h-12 w-12 object-contain" />;
//     } else if (type.startsWith('video/')) {
//       return <video key={index} src={url} controls className="mx-auto h-12 w-12 object-contain" />;
//     } else if (type.startsWith('audio/')) {
//       return <audio key={index} src={url} controls className="mx-auto h-12 w-12 object-contain" />;
//     } else if (type === 'application/pdf') {
//       return <embed key={index} src={url} type="application/pdf" className="mx-auto h-12 w-12 object-contain" />;
//     } else if (type === 'text/html' || type.includes('web')) {
//       return <iframe key={index} src={url} className="mx-auto h-12 w-12 object-contain" />;
//     } else {
//       return <p key={index} className="text-xs text-gray-500">Unsupported file type: {type}</p>;
//     }
//   };

//   return (
//     <div className="col-span-full">
//       <label htmlFor="file-upload" className="block text-sm font-medium leading-6 text-gray-900">
//         Upload File
//       </label>
//       <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
//         <div className="text-center">
//           {filePreviews.length > 0 && (
//             <div className="flex flex-wrap justify-center space-x-2 space-y-2">
//               {filePreviews.map((file, index) => renderPreview(file, index))}
//             </div>
//           )}
//           <div className="mt-4 flex text-sm leading-6 text-gray-600">
//             <label
//               htmlFor="file-upload"
//               className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
//             >
//               <span>Upload a file</span>
//               <input
//                 id="file-upload"
//                 onChange={handleFileChange}
//                 name="file-upload"
//                 type="file"
//                 className="sr-only"
//                 multiple={allowMultiple}
//                 accept="image/*,video/*,audio/*,.pdf,.html,.webp"
//               />
//             </label>
//             <p className="pl-1">or drag and drop</p>
//           </div>
//           <p className="text-xs leading-5 text-gray-600">Supported file types: Images, Videos, Audio, PDFs, HTML, Web files</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FileUpload;
