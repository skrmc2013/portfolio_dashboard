
import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faItalic, faUnderline, faStrikethrough, faHighlighter, faLink, faPalette, faFont, faTextHeight } from '@fortawesome/free-solid-svg-icons';

const CustomTextEditor = ({ value, onChange }) => {
  const [currentText, setCurrentText] = useState('');
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [fontSize, setFontSize] = useState('16px');
  const [fontType, setFontType] = useState('Arial');
  const textareaRef = useRef(null);

  useEffect(() => {
    // Update the editor's text when value changes
    setCurrentText(value.join('\n'));
  }, [value]);

  // Function to apply formatting to selected text
  const applyFormat = (format) => {
    if (!textareaRef.current) return;

    const { selectionStart, selectionEnd } = textareaRef.current;
    if (selectionStart === selectionEnd) return; // No text is selected

    let selectedText = currentText.slice(selectionStart, selectionEnd);
    let beforeText = currentText.slice(0, selectionStart);
    let afterText = currentText.slice(selectionEnd);

    let formattedText = selectedText;

    switch (format) {
      case 'bold':
        formattedText = `<b>${selectedText}</b>`;
        break;
      case 'italic':
        formattedText = `<i>${selectedText}</i>`;
        break;
      case 'underline':
        formattedText = `<u>${selectedText}</u>`;
        break;
      case 'strike':
        formattedText = `<strike>${selectedText}</strike>`;
        break;
      case 'highlight':
        formattedText = `<span style="background-color:yellow;">${selectedText}</span>`;
        break;
      case 'hyperlink':
        const url = prompt('Enter the URL:', 'https://');
        if (url) formattedText = `<a href="${url}" target="_blank">${selectedText}</a>`;
        break;
      case 'color':
        formattedText = `<span style="color:${selectedColor};">${selectedText}</span>`;
        break;
      case 'fontSize':
        formattedText = `<span style="font-size:${fontSize};">${selectedText}</span>`;
        break;
      case 'fontType':
        formattedText = `<span style="font-family:${fontType};">${selectedText}</span>`;
        break;
      default:
        break;
    }

    const newText = beforeText + formattedText + afterText;
    setCurrentText(newText);
  };

  const addText = () => {
    onChange([...value, currentText]);
    setCurrentText('');
  };

  const deleteItem = (index) => {
    const updatedValue = value.filter((_, i) => i !== index);
    onChange(updatedValue);
  };

  const deleteAll = () => {
    onChange([]);
  };

  return (
    // <div className="custom-text-editor max-w-xl mx-auto p-4">
    <div className="custom-text-editor w-full mx-auto p-4">
      {/* <div className="toolbar flex flex-wrap space-x-2 mb-4"> */}
      <div className="toolbar grid max-[430px]:grid-cols-3 max-[300px]:grid-cols-2 max-[900px]:grid-cols-6 grid-cols-6 justify-center align-middle space-x-2 mb-4 gap-x-1 gap-y-1">
        <button
          onClick={() => applyFormat('bold')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center space-x-2"
        >
          <FontAwesomeIcon icon={faBold} />
          {/* <span>Bold</span> */}
        </button>
        <button
          onClick={() => applyFormat('italic')}
          className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500 flex items-center space-x-2"
        >
          <FontAwesomeIcon icon={faItalic} />
          {/* <span>Italic</span> */}
        </button>
        <button
          onClick={() => applyFormat('underline')}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center space-x-2"
        >
          <FontAwesomeIcon icon={faUnderline} />
          {/* <span>Underline</span> */}
        </button>
        <button
          onClick={() => applyFormat('strike')}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center space-x-2"
        >
          <FontAwesomeIcon icon={faStrikethrough} />
          {/* <span>Strike</span> */}
        </button>
        <button
          onClick={() => applyFormat('highlight')}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 flex items-center space-x-2"
        >
          <FontAwesomeIcon icon={faHighlighter} />
          {/* <span>Highlight</span> */}
        </button>
        <button
          onClick={() => applyFormat('hyperlink')}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 flex items-center space-x-2"
        >
          <FontAwesomeIcon icon={faLink} />
          {/* <span>Hyperlink</span> */}
        </button>
        <input
          type="color"
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          className="rounded w-full h-full"
          title="Pick a color"
        />
        <button
          onClick={() => applyFormat('color')}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center space-x-2"
        >
          <FontAwesomeIcon icon={faPalette} />
          {/* <span>Color</span> */}
        </button>
        <input
          type="text"
          placeholder="Font Size (e.g., 16px)"
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
          className="rounded border px-2 py-1"
        />
        <button
          onClick={() => applyFormat('fontSize')}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 flex items-center space-x-2"
        >
          <FontAwesomeIcon icon={faTextHeight} />
          {/* <span>Font Size</span> */}
        </button>
        <input
          type="text"
          placeholder="Font Type (e.g., Arial)"
          value={fontType}
          onChange={(e) => setFontType(e.target.value)}
          className="rounded border px-2 py-1"
        />
        <button
          onClick={() => applyFormat('fontType')}
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 flex items-center space-x-2"
        >
          <FontAwesomeIcon icon={faFont} />
          {/* <span>Font Type</span> */}
        </button>
      </div>
      <textarea
        ref={textareaRef}
        value={currentText}
        onChange={(e) => setCurrentText(e.target.value)}
        className="w-full h-64 p-2 border border-gray-300 rounded"
      />
      <div className="flex space-x-2 mt-4">
        <button
          onClick={addText}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add
        </button>
        <button
          onClick={deleteAll}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete All
        </button>
      </div>
      <div className="preview mt-4 p-4 border border-gray-300 rounded">
        <h3 className="text-lg font-semibold mb-2">Preview:</h3>
        <div dangerouslySetInnerHTML={{ __html: currentText }} />
      </div>
    </div>
  );
};

export default CustomTextEditor;

// import { ALargeSmall, Bold, CirclePlus, Highlighter, Italic, Link, Palette, RemoveFormatting, SquareX, Strikethrough, Trash2, Underline } from 'lucide-react';
// import React, { useState } from 'react';
// // import './CustomTextEditor.css';
// const CustomTextEditor = ({ value, onChange }) => {
//   const [currentText, setCurrentText] = useState('');
//   const [selectedColor, setSelectedColor] = useState('#000000');
//   const [fontSize, setFontSize] = useState('16px');
//   const [fontType, setFontType] = useState('Arial');

//   // Function to apply formatting to selected text
//   const applyFormat = (format) => {
//     const selectionStart = document.getElementById('editor-input').selectionStart;
//     const selectionEnd = document.getElementById('editor-input').selectionEnd;

//     if (selectionStart === selectionEnd) return; // No text is selected

//     let selectedText = currentText.slice(selectionStart, selectionEnd);
//     let beforeText = currentText.slice(0, selectionStart);
//     let afterText = currentText.slice(selectionEnd);

//     let formattedText = selectedText;

//     switch (format) {
//       case 'bold':
//         formattedText = `<b>${selectedText}</b>`;
//         break;
//       case 'italic':
//         formattedText = `<i>${selectedText}</i>`;
//         break;
//       case 'underline':
//         formattedText = `<u>${selectedText}</u>`;
//         break;
//       case 'strike':
//         formattedText = `<strike>${selectedText}</strike>`;
//         break;
//       case 'highlight':
//         formattedText = `<span style="background-color:yellow;">${selectedText}</span>`;
//         break;
//       case 'hyperlink':
//         const url = prompt('Enter the URL:', 'https://');
//         if (url) formattedText = `<a href="${url}" target="_blank">${selectedText}</a>`;
//         break;
//       case 'color':
//         formattedText = `<span style="color:${selectedColor};">${selectedText}</span>`;
//         break;
//       case 'fontSize':
//         formattedText = `<span style="font-size:${fontSize};">${selectedText}</span>`;
//         break;
//       case 'fontType':
//         formattedText = `<span style="font-family:${fontType};">${selectedText}</span>`;
//         break;
//       default:
//         break;
//     }

//     const newText = beforeText + formattedText + afterText;
//     setCurrentText(newText);
//   };

//   // Add the current text to the editor
//   const addText = () => {
//     onChange([...value, currentText]);
//     setCurrentText('');
//   };

//   // Delete a specific item
//   const deleteItem = (index) => {
//     const updatedValue = value.filter((_, i) => i !== index);
//     onChange(updatedValue);
//   };

//   // Delete all items
//   const deleteAll = () => {
//     onChange([]);
//   };

//   return (
//     // <div className="custom-text-editor max-w-xl mx-auto p-4">
//     <div className="custom-text-editor w-full mx-auto p-4">
//       {/* <div className="toolbar flex flex-wrap space-x-2 mb-4 gap-x-1 gap-y-1"> */}
//       <div className="toolbar grid max-[430px]:grid-cols-3 max-[300px]:grid-cols-2 max-[900px]:grid-cols-6 grid-cols-6 justify-center align-middle space-x-2 mb-4 gap-x-1 gap-y-1">
//         <button
//           onClick={() => applyFormat('bold')}
//           className="bg-blue-500 text-white px- py-2 rounded hover:bg-blue-600 flex items-center space-x-1"
//         >
//           {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-4">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5M8.25 12.75h7.5M8.25 8.25h7.5M8.25 17.25h7.5" />
//           </svg> */}
//           <Bold />
//           {/* <span className='max-[900px]:hidden'>Bold</span> */}
//         </button>
//         <button
//           onClick={() => applyFormat('italic')}
//           className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500 flex items-center space-x-2"
//         >
//           {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-4">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M12 6l6 12m-12 0l6-12" />
//           </svg> */}
//           <Italic />
//           {/* <span className='max-[900px]:hidden'>Italic</span> */}
//         </button>
//         <button
//           onClick={() => applyFormat('underline')}
//           className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center space-x-2"
//         >
//           {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12M8.25 4.5v9a3.75 3.75 0 107.5 0v-9" />
//           </svg> */}
//           <Underline />
//           {/* <span className='max-[900px]:hidden'>Underline</span> */}
//         </button>
//         <button
//           onClick={() => applyFormat('strike')}
//           className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center space-x-2"
//         >
//           {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m-3.75 7.5H7.5m6.75-15H7.5" />
//           </svg> */}
//           <Strikethrough />
//           {/* <span className='max-[900px]:hidden'>Strike</span> */}
//         </button>
//         <button
//           onClick={() => applyFormat('highlight')}
//           className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 flex items-center space-x-2"
//         >
//           {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.75l4.5 4.5L9 18.75h6l.75-4.5 4.5-4.5m-7.5 4.5l1.5-6M9 18.75v3m6-3v3" />
//           </svg> */}

//             <Highlighter />
//           {/* <span className='max-[900px]:hidden'>Highlight</span> */}
//         </button>
//         <button
//           onClick={() => applyFormat('hyperlink')}
//           className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 flex items-center space-x-2"
//         >
//           {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6.75h3.75a4.5 4.5 0 010 9H16.5M9 6.75h-3.75a4.5 4.5 0 100 9H7.5m-1.5 3H16.5" />
//           </svg> */}
//           <Link />
//           {/* <span className='max-[900px]:hidden'>Hyperlink</span> */}
//         </button>
//         <input
//           type="color"
//           value={selectedColor}
//           onChange={(e) => setSelectedColor(e.target.value)}
//           className="rounded w-full px-0 h-auto"
//           title="Pick a color"
//         />
//         <button
//           onClick={() => applyFormat('color')}
//           className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center space-x-2"
//         >
//           {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75h10.5m-10.5-3h10.5m-10.5-3h10.5M9 18.75l3-9" />
//           </svg> */}
//           <Palette />
//           {/* <span className='max-[900px]:hidden'>Apply Color</span> */}
//         </button>
//         <input
//           type="text"
//           placeholder="Font size (e.g., 16px, 1rem)"
//           value={fontSize}
//           onChange={(e) => setFontSize(e.target.value)}
//           className="border px-2 py-1 rounded"
//         />
//         <button
//           onClick={() => applyFormat('fontSize')}
//           className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 flex items-center space-x-2"
//         >
//           {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M9 20.25l6-16.5m-6 4.5l6 4.5m-6 4.5h12" />
//           </svg> */}
//           <ALargeSmall />
//           {/* <span className='max-[900px]:hidden'>Font Size</span> */}
//         </button>
//         <input
//           type="text"
//           placeholder="Font type (e.g., Arial, Times)"
//           value={fontType}
//           onChange={(e) => setFontType(e.target.value)}
//           className="border px-2 py-1 rounded"
//         />
//         <button
//           onClick={() => applyFormat('fontType')}
//           className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 flex items-center space-x-2"
//         >
//           {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M6 15h12m-12 3h12M6 12h12m-7.5 6V5.25" />
//           </svg> */}
//           <RemoveFormatting />
//           {/* <span className='max-[900px]:hidden'>Font Type</span> */}
//         </button>
//       </div>

//       <textarea
//         id="editor-input"
//         value={currentText}
//         onChange={(e) => setCurrentText(e.target.value)}
//         className="w-full h-40 p-2 border rounded overflow-hidden"
//         placeholder="Type or paste your text here..."
//       />

//       <div className="mt-4">
//         <button
//           onClick={addText}
//           className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
//         >
//           {/* Add Text */}
//           <CirclePlus />
//         </button>
//         <button
//           onClick={deleteAll}
//           className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800 ml-4"
//         >
//           {/* Delete All */}
//           <Trash2 />
//         </button>
//       </div>

//       <div className="mt-4 space-y-2">
//         {value && value.map((item, index) => (
//           <div key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded mb-2">
//             <div dangerouslySetInnerHTML={{ __html: item }} className='overflow-x-hidden' />
//             <button
//               onClick={() => deleteItem(index)}
//               className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-2"
//             >
//               {/* Delete */}
//               <SquareX />
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CustomTextEditor;


// import React, { useState } from 'react';

// const CustomTextEditor = ({ value, onChange }) => {
//   const [currentText, setCurrentText] = useState('');
//   const [selectedColor, setSelectedColor] = useState('#000000');
//   const [fontSize, setFontSize] = useState('16px');
//   const [fontType, setFontType] = useState('Arial');

//   // Function to apply formatting to selected text
//   const applyFormat = (format) => {
//     const selectionStart = document.getElementById('editor-input').selectionStart;
//     const selectionEnd = document.getElementById('editor-input').selectionEnd;

//     if (selectionStart === selectionEnd) return; // No text is selected

//     let selectedText = currentText.slice(selectionStart, selectionEnd);
//     let beforeText = currentText.slice(0, selectionStart);
//     let afterText = currentText.slice(selectionEnd);

//     let formattedText = selectedText;

//     switch (format) {
//       case 'bold':
//         formattedText = `<b>${selectedText}</b>`;
//         break;
//       case 'italic':
//         formattedText = `<i>${selectedText}</i>`;
//         break;
//       case 'underline':
//         formattedText = `<u>${selectedText}</u>`;
//         break;
//       case 'strike':
//         formattedText = `<strike>${selectedText}</strike>`;
//         break;
//       case 'highlight':
//         formattedText = `<span style="background-color:yellow;">${selectedText}</span>`;
//         break;
//       case 'hyperlink':
//         const url = prompt('Enter the URL:', 'https://');
//         if (url) formattedText = `<a href="${url}" target="_blank">${selectedText}</a>`;
//         break;
//       case 'color':
//         formattedText = `<span style="color:${selectedColor};">${selectedText}</span>`;
//         break;
//       case 'fontSize':
//         formattedText = `<span style="font-size:${fontSize};">${selectedText}</span>`;
//         break;
//       case 'fontType':
//         formattedText = `<span style="font-family:${fontType};">${selectedText}</span>`;
//         break;
//       default:
//         break;
//     }

//     const newText = beforeText + formattedText + afterText;
//     setCurrentText(newText);
//   };

//   // Add the current text to the editor
//   const addText = () => {
//     onChange([...value, currentText]);
//     setCurrentText('');
//   };

//   // Delete a specific item
//   const deleteItem = (index) => {
//     const updatedValue = value.filter((_, i) => i !== index);
//     onChange(updatedValue);
//   };

//   // Delete all items
//   const deleteAll = () => {
//     onChange([]);
//   };

//   return (
//     <div className="custom-text-editor max-w-xl mx-auto p-4">
//       <div className="toolbar flex flex-wrap space-x-1 space-y-1 mb-2">
//         <button
//           onClick={() => applyFormat('bold')}
//           className="bg-blue-500 text-white px-4 py-2 rounded  hover:bg-blue-600"
//         >
//           Bold
//         </button>
//         <button
//           onClick={() => applyFormat('italic')}
//           className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500"
//         >
//           Italic
//         </button>
//         <button
//           onClick={() => applyFormat('underline')}
//           className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//         >
//           Underline
//         </button>
//         <button
//           onClick={() => applyFormat('strike')}
//           className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//         >
//           Strike
//         </button>
//         <button
//           onClick={() => applyFormat('highlight')}
//           className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
//         >
//           Highlight
//         </button>
//         <button
//           onClick={() => applyFormat('hyperlink')}
//           className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
//         >
//           Hyperlink
//         </button>
//         <input
//           type="color"
//           value={selectedColor}
//           onChange={(e) => setSelectedColor(e.target.value)}
//           className="rounded"
//           title="Pick a color"
//         />
//         <button
//           onClick={() => applyFormat('color')}
//           className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//         >
//           Apply Color
//         </button>
//         <input
//           type="text"
//           placeholder="Font size (e.g., 16px, 1rem)"
//           value={fontSize}
//           onChange={(e) => setFontSize(e.target.value)}
//           className="border px-2 py-1 rounded"
//         />
//         <button
//           onClick={() => applyFormat('fontSize')}
//           className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
//         >
//           Set Font Size
//         </button>
//         <input
//           type="text"
//           placeholder="Font type (e.g., Arial, 'Times New Roman')"
//           value={fontType}
//           onChange={(e) => setFontType(e.target.value)}
//           className="border px-2 py-1 rounded"
//         />
//         <button
//           onClick={() => applyFormat('fontType')}
//           className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
//         >
//           Set Font Type
//         </button>
//       </div>
//       <textarea
//         id="editor-input"
//         className="editor-input w-full h-24 p-2 border border-gray-300 rounded mb-4"
//         value={currentText}
//         onChange={(e) => setCurrentText(e.target.value)}
//         placeholder="Enter text here"
//       />
//       <div className="flex justify-between">
//         <button
//           className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//           onClick={addText}
//         >
//           Add to Editor
//         </button>
//         <button
//           className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//           onClick={deleteAll}
//         >
//           Delete All
//         </button>
//       </div>
//       <div className="editor-content mt-4">
//         <ul>
//           {value.map((item, index) => (
//             <li
//               key={index}
//               className="flex justify-between items-center bg-gray-100 p-2 rounded mb-2"
//             >
//               <span dangerouslySetInnerHTML={{ __html: item }}></span>
//               <button
//                 onClick={() => deleteItem(index)}
//                 className="text-red-500 hover:text-red-700 ml-4"
//               >
//                 Delete
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default CustomTextEditor;


// import React, { useState } from 'react';
// import './CustomTextEditor.css'
// import { Button } from '@/components/ui/button';
// const CustomTextEditor = ({ value, onChange }) => {
//   const [currentText, setCurrentText] = useState('');
//   const [selectedColor, setSelectedColor] = useState('#000000');

//   // Function to apply formatting to selected text
//   const applyFormat = (format) => {
//     const selectionStart = document.getElementById('editor-input').selectionStart;
//     const selectionEnd = document.getElementById('editor-input').selectionEnd;

//     if (selectionStart === selectionEnd) return; // No text is selected

//     let selectedText = currentText.slice(selectionStart, selectionEnd);
//     let beforeText = currentText.slice(0, selectionStart);
//     let afterText = currentText.slice(selectionEnd);

//     let formattedText = selectedText;

//     switch (format) {
//       case 'bold':
//         formattedText = `<b>${selectedText}</b>`;
//         break;
//       case 'highlight':
//         formattedText = `<span style="background-color:yellow;">${selectedText}</span>`;
//         break;
//       case 'color':
//         formattedText = `<span style="color:${selectedColor};">${selectedText}</span>`;
//         break;
//       default:
//         break;
//     }

//     const newText = beforeText + formattedText + afterText;
//     setCurrentText(newText);
//   };

//   // Add the current text to the editor
//   const addText = () => {
//     onChange([...value, currentText]);
//     setCurrentText('');
//   };

//   return (
//     <div className="custom-text-editor w-full">
//       <div className="toolbar">
//         {/* <button onClick={() => applyFormat('bold')}>Bold</button> */}
//         {/* <button onClick={() => applyFormat('bold')}>Bold</button> */}
//         <Button onClick={() => applyFormat('bold')}>Bold</Button>
//         <button onClick={() => applyFormat('highlight')}>
//         <svg xmlns="http://www.w3.org/2000/svg" height="32" width="28" viewBox="0 0 448 512"><path fill="#74C0FC" d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM336 152l0 104 0 104c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-80-128 0 0 80c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-208c0-13.3 10.7-24 24-24s24 10.7 24 24l0 80 128 0 0-80c0-13.3 10.7-24 24-24s24 10.7 24 24z"/></svg>
           
//         </button>
//         {/* <Button onClick={() => applyFormat('highlight')}>Highlight 
//             <svg xmlns="http://www.w3.org/2000/svg" height="32" width="28" viewBox="0 0 448 512"><path fill="#74C0FC" d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM336 152l0 104 0 104c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-80-128 0 0 80c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-208c0-13.3 10.7-24 24-24s24 10.7 24 24l0 80 128 0 0-80c0-13.3 10.7-24 24-24s24 10.7 24 24z"/></svg>
//             </Button> */}
//         <input
//           type="color"
//           value={selectedColor}
//           onChange={(e) => setSelectedColor(e.target.value)}
//           title="Pick a color"
//         />
//         {/* <button onClick={() => applyFormat('color')}>Apply Color</button> */}
//         <Button onClick={() => applyFormat('color')}>Apply Color</Button>
//       </div>
//       <textarea
//         id="editor-input"
//         className="editor-input"
//         value={currentText}
//         onChange={(e) => setCurrentText(e.target.value)}
//         placeholder="Enter text here"
//       />
//       <button className="add-btn" onClick={addText}>Add to Editor</button>
//       <div className="editor-content">
//         <ul>
//           {value && value.map((item, index) => (
//             <li key={index} dangerouslySetInnerHTML={{ __html: item }}></li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default CustomTextEditor;
