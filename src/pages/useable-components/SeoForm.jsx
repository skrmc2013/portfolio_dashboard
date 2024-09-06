import React, { useState, useEffect } from 'react';
import './SeoForm.css'; // Assume default CSS is provided, but customizable via props

const SeoForm = ({ onSubmit, defaultData = {}, isDisabled = false, useLibraryStyling = false }) => {
  const [metaTitle, setMetaTitle] = useState(defaultData.metaTitle || '');
  const [metaDescription, setMetaDescription] = useState(defaultData.metaDescription || '');
  const [keywords, setKeywords] = useState(defaultData.keywords || []);
  const [keywordInput, setKeywordInput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (defaultData.keywords) {
      setKeywords(defaultData.keywords);
    }
  }, [defaultData.keywords]);

  const handleKeywordInput = (e) => {
    setKeywordInput(e.target.value);
    setError('');
  };

  const handleKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && !isDisabled) {
      e.preventDefault();
      addKeyword(keywordInput.trim());
      setKeywordInput('');
    } else if (e.key === 'Backspace' && keywordInput === '') {
      removeLastKeyword();
    }
  };

  const addKeyword = (keyword) => {
    if (keyword === '') return;

    if (keywords.includes(keyword)) {
      setError('Duplicate keyword is not allowed.');
      return;
    }

    setKeywords([...keywords, keyword]);
  };

  const removeKeyword = (index) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  const removeLastKeyword = () => {
    if (keywords.length > 0) {
      setKeywords(keywords.slice(0, -1));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isDisabled) return; // Prevent submission if form is disabled
    onSubmit({ metaTitle, metaDescription, keywords });
  };

  return (
    <form onSubmit={handleSubmit} className={`seo-form w-full ${useLibraryStyling ? 'library-styling' : ''}`}>
      <div className="form-group">
        <label htmlFor="metaTitle">Meta Title</label>
        <input
          id="metaTitle"
          type="text"
          value={metaTitle}
          onChange={(e) => setMetaTitle(e.target.value)}
          required
          disabled={isDisabled}
          // autoFocus
        />
      </div>
      <div className="form-group">
        <label htmlFor="metaDescription">Meta Description</label>
        <textarea
          id="metaDescription"
          value={metaDescription}
          onChange={(e) => setMetaDescription(e.target.value)}
          required
          disabled={isDisabled}
        />
      </div>
      <div className="form-group keywords-container">
        <label>Keywords</label>
        <div className="keywords-input-wrapper">
          {keywords.map((keyword, index) => (
            <span key={index} className="keyword-tag">
              {keyword}
              <button
                type="button"
                onClick={() => removeKeyword(index)}
                aria-label={`Remove ${keyword}`}
                disabled={isDisabled}
              >
                ×
              </button>
            </span>
          ))}
          <input
            type="text"
            value={keywordInput}
            onChange={handleKeywordInput}
            onKeyDown={handleKeyDown}
            placeholder="Press Enter or comma to add keywords"
            disabled={isDisabled}
            className='keywordsinput'
          />
        </div>
        {error && <div className="error-message">{error}</div>}
      </div>
      <button type="submit" disabled={isDisabled}>
        Submit
      </button>
    </form>
  );
};

export default SeoForm;

// update ...

// import React, { useState, useEffect } from 'react';
// import './SeoForm.css'; // Assume default CSS is provided, but customizable via props

// const SeoForm = ({ onSubmit, defaultData = {}, isDisabled = false, useLibraryStyling = false }) => {
//   const [metaTitle, setMetaTitle] = useState(defaultData.metaTitle || '');
//   const [metaDescription, setMetaDescription] = useState(defaultData.metaDescription || '');
//   const [keywords, setKeywords] = useState(defaultData.keywords || []);
//   const [keywordInput, setKeywordInput] = useState('');

//   useEffect(() => {
//     if (defaultData.keywords) {
//       setKeywords(defaultData.keywords);
//     }
//   }, [defaultData.keywords]);

//   const handleKeywordInput = (e) => {
//     setKeywordInput(e.target.value);
//   };

//   const handleKeyDown = (e) => {
//     if ((e.key === 'Enter' || e.key === ',') && !isDisabled) {
//       e.preventDefault();
//       addKeyword(keywordInput.trim());
//       setKeywordInput('');
//     } else if (e.key === 'Backspace' && keywordInput === '') {
//       removeLastKeyword();
//     }
//   };

//   const addKeyword = (keyword) => {
//     if (keyword && !keywords.includes(keyword)) {
//       setKeywords([...keywords, keyword]);
//     }
//   };

//   const removeKeyword = (index) => {
//     setKeywords(keywords.filter((_, i) => i !== index));
//   };

//   const removeLastKeyword = () => {
//     if (keywords.length > 0) {
//       setKeywords(keywords.slice(0, -1));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (isDisabled) return; // Prevent submission if form is disabled
//     onSubmit({ metaTitle, metaDescription, keywords });
//   };

//   return (
//     <form onSubmit={handleSubmit} className={`seo-form ${useLibraryStyling ? 'library-styling' : ''}`}>
//       <div className="form-group">
//         <label htmlFor="metaTitle">Meta Title</label>
//         <input
//           id="metaTitle"
//           type="text"
//           value={metaTitle}
//           onChange={(e) => setMetaTitle(e.target.value)}
//           required
//           disabled={isDisabled}
//           autoFocus
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="metaDescription">Meta Description</label>
//         <textarea
//           id="metaDescription"
//           value={metaDescription}
//           onChange={(e) => setMetaDescription(e.target.value)}
//           required
//           disabled={isDisabled}
//         />
//       </div>
//       <div className="form-group keywords-container">
//         <label>Keywords</label>
//         <div className="keywords-input-wrapper">
//           {keywords.map((keyword, index) => (
//             <span key={index} className="keyword-tag">
//               {keyword}
//               <button
//                 type="button"
//                 onClick={() => removeKeyword(index)}
//                 aria-label={`Remove ${keyword}`}
//                 disabled={isDisabled}
//               >
//                 ×
//               </button>
//             </span>
//           ))}
//           <input
//             type="text"
//             value={keywordInput}
//             onChange={handleKeywordInput}
//             onKeyDown={handleKeyDown}
//             placeholder="Press Enter or comma to add keywords"
//             disabled={isDisabled}
//           />
//         </div>
//       </div>
//       <button type="submit" disabled={isDisabled}>
//         Submit
//       </button>
//     </form>
//   );
// };

// export default SeoForm;

// update ...

// import React, { useState } from 'react';
// import './SeoForm.css'; // Assuming you have a CSS file for styling

// const SeoForm = ({ onSubmit, defaultData = {} }) => {
//   const [metaTitle, setMetaTitle] = useState(defaultData.metaTitle || '');
//   const [metaDescription, setMetaDescription] = useState(defaultData.metaDescription || '');
//   const [keywords, setKeywords] = useState(defaultData.keywords || []);
//   const [keywordInput, setKeywordInput] = useState('');

//   const handleKeywordInput = (e) => {
//     setKeywordInput(e.target.value);
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter' || e.key === ',') {
//       e.preventDefault();
//       addKeyword(keywordInput.trim());
//       setKeywordInput('');
//     } else if (e.key === 'Backspace' && keywordInput === '') {
//       removeLastKeyword();
//     }
//   };

//   const addKeyword = (keyword) => {
//     if (keyword && !keywords.includes(keyword)) {
//       setKeywords([...keywords, keyword]);
//     }
//   };

//   const removeKeyword = (index) => {
//     setKeywords(keywords.filter((_, i) => i !== index));
//   };

//   const removeLastKeyword = () => {
//     if (keywords.length > 0) {
//       setKeywords(keywords.slice(0, -1));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit({ metaTitle, metaDescription, keywords });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="seo-form">
//       <div className="form-group">
//         <label htmlFor="metaTitle">Meta Title</label>
//         <input
//           id="metaTitle"
//           type="text"
//           value={metaTitle}
//           onChange={(e) => setMetaTitle(e.target.value)}
//           required
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="metaDescription">Meta Description</label>
//         <textarea
//           id="metaDescription"
//           value={metaDescription}
//           onChange={(e) => setMetaDescription(e.target.value)}
//           required
//         />
//       </div>
//       <div className="form-group keywords-container">
//         <label>Keywords</label>
//         <div className="keywords-input-wrapper">
//           {keywords.map((keyword, index) => (
//             <span key={index} className="keyword-tag">
//               {keyword}
//               <button type="button" onClick={() => removeKeyword(index)}>×</button>
//             </span>
//           ))}
//           <input
//             type="text"
//             value={keywordInput}
//             onChange={handleKeywordInput}
//             onKeyDown={handleKeyDown}
//             placeholder="Press Enter or comma to add keywords"
//           />
//         </div>
//       </div>
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default SeoForm;
