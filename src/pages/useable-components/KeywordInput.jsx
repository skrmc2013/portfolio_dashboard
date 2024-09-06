import { Input } from '@/components/ui/input';
import React, { useState } from 'react';

const KeywordInput = ({ onKeywordsChange , placeholderData, classNameData, icon}) => {
  const [inputValue, setInputValue] = useState('');
  const [keywords, setKeywords] = useState([]);

  const handleAddKeyword = () => {
    if (inputValue.trim() !== '') {
      const newKeywords = [...keywords, inputValue.trim()];
      setKeywords(newKeywords);
      onKeywordsChange(newKeywords);
      setInputValue('');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent the default action for the Enter key
      handleAddKeyword(); // Call the function to add the keyword
    }
  };

  const handleRemoveKeyword = (index) => {
    const newKeywords = keywords.filter((_, i) => i !== index);
    setKeywords(newKeywords);
    onKeywordsChange(newKeywords);
  };

  return (
    <div className=''>
      <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>


        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown} // Attach the keydown event handler
          placeholder={placeholderData}
          className={classNameData}
        />
      </div>
      {/* <button onClick={handleAddKeyword} className="ml-2 p-2 bg-blue-500 text-white rounded">
        Add
      </button> */}
      <div className="mt-2">
        {keywords.map((keyword, index) => (
          <span key={index} className="inline-flex items-center m-0 mb-1 ml-1 pl-1 pr-2 pb-1 bg-blue-300 rounded-md">
            {keyword}
            <button onClick={() => handleRemoveKeyword(index)} className="ml-1 text-red-500">
              {icon}
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default KeywordInput;
// block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6

// import React, { useState } from 'react';

// const KeywordInput = ({ onKeywordsChange , placeholderData}) => {
//   const [inputValue, setInputValue] = useState('');
//   const [keywords, setKeywords] = useState([]);

//   const handleAddKeyword = () => {
//     if (inputValue.trim() !== '') {
//       const newKeywords = [...keywords, inputValue.trim()];
//       setKeywords(newKeywords);
//       onKeywordsChange(newKeywords);
//       setInputValue('');
//     }
//   };

//   const handleKeyDown = (event) => {
//     if (event.key === 'Enter') {
//       event.preventDefault(); // Prevent the default action for the Enter key
//       handleAddKeyword(); // Call the function to add the keyword
//     }
//   };

//   const handleRemoveKeyword = (index) => {
//     const newKeywords = keywords.filter((_, i) => i !== index);
//     setKeywords(newKeywords);
//     onKeywordsChange(newKeywords);
//   };

//   return (
//     <div className=''>
//       <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>


//         <input
//           type="text"
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           onKeyDown={handleKeyDown} // Attach the keydown event handler
//           placeholder={placeholderData}
//           className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
//         />
//       </div>
//       {/* <button onClick={handleAddKeyword} className="ml-2 p-2 bg-blue-500 text-white rounded">
//         Add
//       </button> */}
//       <div className="mt-2">
//         {keywords.map((keyword, index) => (
//           <span key={index} className="inline-flex items-center m-1 p-1 bg-gray-200 rounded">
//             {keyword}
//             <button onClick={() => handleRemoveKeyword(index)} className="ml-1 text-red-500">
//               x
//             </button>
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default KeywordInput;


// import React, { useState } from 'react';

// const KeywordInput = ({ onKeywordsChange }) => {
//   const [inputValue, setInputValue] = useState('');
//   const [keywords, setKeywords] = useState([]);

//   const handleAddKeyword = () => {
//     if (inputValue.trim() !== '') {
//       const newKeywords = [...keywords, inputValue.trim()];
//       setKeywords(newKeywords);
//       onKeywordsChange(newKeywords);
//       setInputValue('');
//     }
//   };

//   const handleRemoveKeyword = (index) => {
//     const newKeywords = keywords.filter((_, i) => i !== index);
//     setKeywords(newKeywords);
//     onKeywordsChange(newKeywords);
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={inputValue}
//         onChange={(e) => setInputValue(e.target.value)}
//         placeholder="Add a keyword"
//         className="border p-2 rounded"
//       />
//       <button onClick={handleAddKeyword} className="ml-2 p-2 bg-blue-500 text-white rounded">
//         Add
//       </button>
//       <div className="mt-2">
//         {keywords.map((keyword, index) => (
//           <span key={index} className="inline-flex items-center m-1 p-1 bg-gray-200 rounded">
//             {keyword}
//             <button onClick={() => handleRemoveKeyword(index)} className="ml-1 text-red-500">
//               x
//             </button>
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default KeywordInput;



// // KeywordInput.js
// import React, { useState } from 'react';

// const KeywordInput = ({ onKeywordsSubmit }) => {
//   const [newKeyword, setNewKeyword] = useState('');
//   const [keywords, setKeywords] = useState([]);

//   const handleKeywordChange = (e) => {
//     const value = e.target.value;
//     const lastChar = value[value.length - 1];

//     // Check if the last character is a comma or the Enter key was pressed
//     if (lastChar === ',' || e.key === 'Enter') {
//       e.preventDefault(); // Prevent the default action for the Enter key
//       addKeyword(value.slice(0, -1).trim()); // Remove the last character and trim
//     } else {
//       setNewKeyword(value);
//     }
//   };

//   const addKeyword = (keyword) => {
//     if (keyword && !keywords.includes(keyword)) {
//       setKeywords([...keywords, keyword]);
//       setNewKeyword('');
//     }
//   };

//   const handleSubmit = () => {
//     onKeywordsSubmit(keywords);
//     setKeywords([]); // Reset after submission
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={newKeyword}
//         onChange={handleKeywordChange}
//         onKeyDown={handleKeywordChange}
//         placeholder="Enter keyword and press Enter or comma"
//       />
//       <button onClick={() => addKeyword(newKeyword)}>Add Keyword</button>
//       <ul>
//         {keywords.map((keyword, index) => (
//           <li key={index}>{keyword}</li>
//         ))}
//       </ul>
//       <button onClick={handleSubmit}>Submit Keywords</button>
//     </div>
//   );
// };

// export default KeywordInput;
