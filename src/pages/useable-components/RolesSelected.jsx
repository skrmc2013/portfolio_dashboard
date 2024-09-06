import React, { useState, useEffect, useRef } from 'react';

const RolesSelected = ({ label, options = [], onSelect, maxSelection = null }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [error, setError] = useState(null);
  const dropdownRef = useRef(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    const handleMouseLeave = () => {
      setDropdownOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    dropdownRef.current?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      dropdownRef.current?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleChange = (event) => {
    const value = event.target.value;
    let updatedSelection = [...selectedOptions];

    if (selectedOptions.includes(value)) {
      updatedSelection = updatedSelection.filter((item) => item !== value);
    } else {
      if (!maxSelection || updatedSelection.length < maxSelection) {
        if (updatedSelection.includes(value)) {
          setError('Duplicate value selected.');
        } else {
          updatedSelection.push(value);
          setError(null);
        }
      }
    }

    setSelectedOptions(updatedSelection);
    onSelect(updatedSelection);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSelectAll = () => {
    if (options.length === selectedOptions.length) {
      setSelectedOptions([]);
      onSelect([]);
    } else {
      const allOptions = options.map((option) => option.value);
      setSelectedOptions(allOptions);
      onSelect(allOptions);
    }
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      setFocusedIndex((prevIndex) => (prevIndex + 1) % filteredOptions.length);
    } else if (event.key === 'ArrowUp') {
      setFocusedIndex((prevIndex) => (prevIndex === 0 ? filteredOptions.length - 1 : prevIndex - 1));
    } else if (event.key === 'Enter' && focusedIndex >= 0) {
      const option = filteredOptions[focusedIndex];
      handleChange({ target: { value: option.value } });
      setFocusedIndex(-1);
    }
  };

  return (
    <div 
    // ref={dropdownRef} 
    // className="flex flex-col w-full gap-5  items-center justify-center"
    >
      <div className="flex flex-col w-full gap-5">
        <p className="text-primary">
          Your selection: {selectedOptions.join(', ') || 'None'}
        </p>
        <div
          tabIndex="-1"
          className="relative flex flex-col w-full h-auto overflow-visible bg-transparent rounded-md"
          onClick={toggleDropdown}
        >
          <label className="sr-only" htmlFor="multi-select-input">
            {label}
          </label>
          <div
            className={`min-h-10 cursor-text rounded-md border border-input text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 px-3 py-2 ${
              dropdownOpen ? 'ring-2 ring-primary' : ''
            }`}
          >
            <div className="relative flex flex-wrap gap-1">
              {selectedOptions.map((option, index) => (
                <div
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 text-xs font-semibold transition-colors rounded-full bg-primary text-primary-foreground hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent"
                >
                  {options.find((opt) => opt.value === option)?.label || option}
                  <button
                    className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onClick={() => handleChange({ target: { value: option } })}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-x h-3 w-3 text-muted-foreground hover:text-foreground"
                    >
                      <path d="M18 6 6 18"></path>
                      <path d="m6 6 12 12"></path>
                    </svg>
                  </button>
                </div>
              ))}
              <input
                id="multi-select-input"
                placeholder="Select frameworks you like..."
                className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground ml-1"
                value={searchTerm}
                onChange={handleSearch}
                onKeyDown={handleKeyDown}
                onClick={(e) => e.stopPropagation()}
                autoComplete="off"
                spellCheck="false"
              />
              <button
                type="button"
                className="absolute right-0 h-6 w-6 p-0"
                onClick={toggleDropdown}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevron-down"
                >
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </button>
            </div>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <div
            className={`absolute top-full left-0 right-0 mt-2 w-full bg-white border border-input rounded-md shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${
              dropdownOpen ? 'max-h-[300px] opacity-100 z-10' : 'max-h-0 opacity-0'
            }`}
            onKeyDown={handleKeyDown}
          >
            <div className="flex items-center p-3">
              <button
                className="text-sm text-primary underline"
                onClick={handleSelectAll}
              >
                {options.length === selectedOptions.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>
            <div className="max-h-[300px] overflow-y-auto overflow-x-hidden">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, index) => (
                  <div
                    key={index}
                    className={`relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm cursor-pointer outline-none ${
                      focusedIndex === index
                        ? 'bg-accent text-accent-foreground'
                        : 'aria-[selected="true"]:bg-accent aria-[selected="true"]:text-accent-foreground'
                    }`}
                    onClick={() => handleChange({ target: { value: option.value } })}
                  >
                    {option.label}
                  </div>
                ))
              ) : (
                <div className="p-2 text-sm text-muted-foreground">
                  No options available
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RolesSelected;


// update .....

// import React, { useState, useEffect, useRef } from 'react';

// const RolesSelected = ({ label, options = [], onSelect, maxSelection = null }) => {
//   const [selectedOptions, setSelectedOptions] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [error, setError] = useState(null);
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const handleChange = (event) => {
//     const value = event.target.value;
//     let updatedSelection = [...selectedOptions];

//     if (selectedOptions.includes(value)) {
//       updatedSelection = updatedSelection.filter((item) => item !== value);
//     } else {
//       if (!maxSelection || updatedSelection.length < maxSelection) {
//         if (updatedSelection.includes(value)) {
//           setError('Duplicate value selected.');
//         } else {
//           updatedSelection.push(value);
//           setError(null);
//         }
//       }
//     }

//     setSelectedOptions(updatedSelection);
//     onSelect(updatedSelection);
//   };

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const handleSelectAll = () => {
//     if (options.length === selectedOptions.length) {
//       setSelectedOptions([]);
//       onSelect([]);
//     } else {
//       const allOptions = options.map((option) => option.value);
//       setSelectedOptions(allOptions);
//       onSelect(allOptions);
//     }
//   };

//   const filteredOptions = options.filter((option) =>
//     option.label.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   const handleKeyDown = (event) => {
//     if (event.key === 'ArrowDown') {
//       // Move focus to the next option
//       // Implement logic to focus on the next item in the dropdown
//     } else if (event.key === 'ArrowUp') {
//       // Move focus to the previous option
//       // Implement logic to focus on the previous item in the dropdown
//     } else if (event.key === 'Enter') {
//       // Select the currently focused option
//       // Implement logic to select the focused item
//     }
//   };

//   return (
//     <div ref={dropdownRef} className="flex flex-col w-full gap-5 px-10 py-10 items-center justify-center">
//       <div className="flex flex-col w-full gap-5">
//         <p className="text-primary">
//           {/* Your selection: {selectedOptions.join(', ') || 'None'} */}
//         </p>
//         <div
//           tabIndex="-1"
//           className="relative flex flex-col w-full h-auto overflow-visible bg-transparent rounded-md"
//         >
//           <label className="sr-only" htmlFor="multi-select-input">
//             {label}
//           </label>
//           <div
//             className={`min-h-10 cursor-text rounded-md border border-input text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 px-3 py-2 ${
//               dropdownOpen ? 'ring-2 ring-primary' : ''
//             }`}
//             onClick={toggleDropdown}
//           >
//             <div className="relative flex flex-wrap gap-1">
//               {selectedOptions.map((option, index) => (
//                 <div
//                   key={index}
//                   className="inline-flex items-center px-2.5 py-0.5 text-xs font-semibold transition-colors rounded-full bg-primary text-primary-foreground hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent"
//                 >
//                   {options.find((opt) => opt.value === option)?.label || option}
//                   <button
//                     className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
//                     onClick={() => handleChange({ target: { value: option } })}
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="24"
//                       height="24"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       className="lucide lucide-x h-3 w-3 text-muted-foreground hover:text-foreground"
//                     >
//                       <path d="M18 6 6 18"></path>
//                       <path d="m6 6 12 12"></path>
//                     </svg>
//                   </button>
//                 </div>
//               ))}
//               <input
//                 id="multi-select-input"
//                 placeholder="Select frameworks you like..."
//                 className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground ml-1"
//                 value={searchTerm}
//                 onChange={handleSearch}
//                 onKeyDown={handleKeyDown}
//                 onClick={(e) => e.stopPropagation()}
//                 autoComplete="off"
//                 spellCheck="false"
//               />
//               <button
//                 type="button"
//                 className="absolute right-0 h-6 w-6 p-0"
//                 onClick={toggleDropdown}
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   className="lucide lucide-chevron-down"
//                 >
//                   <path d="M6 9l6 6 6-6"></path>
//                 </svg>
//               </button>
//             </div>
//           </div>
//           {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
//           <div
//             className={`absolute top-full left-0 right-0 mt-2 w-full bg-white border border-input rounded-md shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${
//               dropdownOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
//             }`}
//           >
//             <div className="flex items-center p-3">
//               <button
//                 className="text-sm text-primary underline"
//                 onClick={handleSelectAll}
//               >
//                 {options.length === selectedOptions.length ? 'Deselect All' : 'Select All'}
//               </button>
//             </div>
//             <select
//               multiple
//               value={selectedOptions}
//               onChange={handleChange}
//               className="w-full h-40 p-2 border-none outline-none overflow-auto"
//             >
//               {filteredOptions.length > 0 ? (
//                 filteredOptions.map((option, index) => (
//                   <option key={index} value={option.value}>
//                     {option.label}
//                   </option>
//                 ))
//               ) : (
//                 <option disabled>No options available</option>
//               )}
//             </select>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RolesSelected;

// update .. ..

// import React, { useState, useRef, useEffect } from 'react';

// const RolesSelected = ({ label, options = [], onSelect, maxSelection = null }) => {
//   const [selectedOptions, setSelectedOptions] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [error, setError] = useState('');
//   const dropdownRef = useRef(null);

//   const handleChange = (event) => {
//     const value = event.target.value;
//     let updatedSelection = [...selectedOptions];

//     if (selectedOptions.includes(value)) {
//       updatedSelection = updatedSelection.filter(item => item !== value);
//     } else {
//       if (!maxSelection || updatedSelection.length < maxSelection) {
//         if (selectedOptions.some(option => option === value)) {
//           setError('Duplicate selection not allowed');
//           return;
//         } else {
//           updatedSelection.push(value);
//           setError('');
//         }
//       }
//     }

//     setSelectedOptions(updatedSelection);
//     onSelect(updatedSelection); // Pass the selected options to the parent component
//   };

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const handleSelectAll = () => {
//     if (options.length === selectedOptions.length) {
//       setSelectedOptions([]);
//       onSelect([]);
//     } else {
//       const allOptions = options.map(option => option.value);
//       setSelectedOptions(allOptions);
//       onSelect(allOptions);
//     }
//   };

//   const filteredOptions = options.filter(option =>
//     option.label.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   const handleClickOutside = (event) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//       setDropdownOpen(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="flex flex-col w-full gap-5 px-10 py-10 items-center justify-center">
//       <div className="flex flex-col w-full gap-5" ref={dropdownRef}>
//         <p className="text-primary">Your selection: {selectedOptions.join(', ') || 'None'}</p>
//         {error && <p className="text-red-500">{error}</p>}
//         <div
//           tabIndex="-1"
//           className="relative flex flex-col w-full h-auto overflow-visible bg-transparent rounded-md"
//         >
//           <label
//             className="sr-only"
//             htmlFor="multi-select-input"
//           >
//             {label}
//           </label>
//           <div
//             className={`min-h-10 cursor-text rounded-md border border-input text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 px-3 py-2 ${
//               dropdownOpen ? 'ring-2 ring-primary' : ''
//             }`}
//             onClick={toggleDropdown}
//           >
//             <div className="relative flex flex-wrap gap-1">
//               {selectedOptions.map((option, index) => (
//                 <div
//                   key={index}
//                   className="inline-flex items-center px-2.5 py-0.5 text-xs font-semibold transition-colors rounded-full bg-primary text-primary-foreground hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent"
//                 >
//                   {options.find(opt => opt.value === option)?.label || option}
//                   <button
//                     className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
//                     onClick={() => handleChange({ target: { value: option } })}
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="24"
//                       height="24"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       className="lucide lucide-x h-3 w-3 text-muted-foreground hover:text-foreground"
//                     >
//                       <path d="M18 6 6 18"></path>
//                       <path d="m6 6 12 12"></path>
//                     </svg>
//                   </button>
//                 </div>
//               ))}
//               <input
//                 id="multi-select-input"
//                 placeholder="Select frameworks you like..."
//                 className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground ml-1"
//                 value={searchTerm}
//                 onChange={handleSearch}
//                 onClick={(e) => e.stopPropagation()}
//                 autoComplete="off"
//                 spellCheck="false"
//               />
//               <button
//                 type="button"
//                 className="absolute right-0 h-6 w-6 p-0"
//                 onClick={toggleDropdown}
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   className="lucide lucide-chevron-down"
//                 >
//                   <path d="M6 9l6 6 6-6"></path>
//                 </svg>
//               </button>
//             </div>
//           </div>
//           <div
//             className={`absolute top-full left-0 right-0 mt-2 w-full bg-white border border-input rounded-md shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${
//               dropdownOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
//             }`}
//           >
//             <div className="flex items-center p-3">
//               <button
//                 className="text-sm text-primary underline"
//                 onClick={handleSelectAll}
//               >
//                 {options.length === selectedOptions.length ? 'Deselect All' : 'Select All'}
//               </button>
//             </div>
//             <select
//               multiple
//               value={selectedOptions}
//               onChange={handleChange}
//               className="w-full h-40 p-2 border-none outline-none overflow-auto"
//             >
//               {filteredOptions.length > 0 ? (
//                 filteredOptions.map((option, index) => (
//                   <option key={index} value={option.value}>
//                     {option.label}
//                   </option>
//                 ))
//               ) : (
//                 <option disabled>No options available</option>
//               )}
//             </select>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RolesSelected;

// import React, { useState } from 'react';

// const RolesSelected = ({ label, options = [], onSelect, maxSelection = null }) => {
//   const [selectedOptions, setSelectedOptions] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const handleChange = (event) => {
//     const value = event.target.value;
//     let updatedSelection = [...selectedOptions];

//     if (selectedOptions.includes(value)) {
//       updatedSelection = updatedSelection.filter(item => item !== value);
//     } else {
//       if (!maxSelection || updatedSelection.length < maxSelection) {
//         updatedSelection.push(value);
//       }
//     }

//     setSelectedOptions(updatedSelection);
//     onSelect(updatedSelection); // Pass the selected options to the parent component
//   };

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const handleSelectAll = () => {
//     if (options.length === selectedOptions.length) {
//       setSelectedOptions([]);
//       onSelect([]);
//     } else {
//       const allOptions = options.map(option => option.value);
//       setSelectedOptions(allOptions);
//       onSelect(allOptions);
//     }
//   };

//   const filteredOptions = options.filter(option =>
//     option.label.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   return (
//     <div className="flex flex-col w-full gap-5 px-10 py-10 items-center justify-center">
//       <div className="flex flex-col w-full gap-5">
//         <p className="text-primary">Your selection: {selectedOptions.join(', ') || 'None'}</p>
//         <div
//           tabIndex="-1"
//           className="relative flex flex-col w-full h-auto overflow-visible bg-transparent rounded-md"
//         >
//           <label
//             className="sr-only"
//             htmlFor="multi-select-input"
//           >
//             {label}
//           </label>
//           <div
//             className={`min-h-10 cursor-text rounded-md border border-input text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 px-3 py-2 ${
//               dropdownOpen ? 'ring-2 ring-primary' : ''
//             }`}
//             onClick={toggleDropdown}
//           >
//             <div className="relative flex flex-wrap gap-1">
//               {selectedOptions.map((option, index) => (
//                 <div
//                   key={index}
//                   className="inline-flex items-center px-2.5 py-0.5 text-xs font-semibold transition-colors rounded-full bg-primary text-primary-foreground hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent"
//                 >
//                   {options.find(opt => opt.value === option)?.label || option}
//                   <button
//                     className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
//                     onClick={() => handleChange({ target: { value: option } })}
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="24"
//                       height="24"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       className="lucide lucide-x h-3 w-3 text-muted-foreground hover:text-foreground"
//                     >
//                       <path d="M18 6 6 18"></path>
//                       <path d="m6 6 12 12"></path>
//                     </svg>
//                   </button>
//                 </div>
//               ))}
//               <input
//                 id="multi-select-input"
//                 placeholder="Select frameworks you like..."
//                 className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground ml-1"
//                 value={searchTerm}
//                 onChange={handleSearch}
//                 onClick={(e) => e.stopPropagation()}
//                 autoComplete="off"
//                 spellCheck="false"
//               />
//               <button
//                 type="button"
//                 className="absolute right-0 h-6 w-6 p-0"
//                 onClick={toggleDropdown}
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   className="lucide lucide-chevron-down"
//                 >
//                   <path d="M6 9l6 6 6-6"></path>
//                 </svg>
//               </button>
//             </div>
//           </div>
//           <div
//             className={`absolute top-full left-0 right-0 mt-2 w-full bg-white border border-input rounded-md shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${
//               dropdownOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
//             }`}
//           >
//             <div className="flex items-center p-3">
//               <button
//                 className="text-sm text-primary underline"
//                 onClick={handleSelectAll}
//               >
//                 {options.length === selectedOptions.length ? 'Deselect All' : 'Select All'}
//               </button>
//             </div>
//             <select
//               multiple
//               value={selectedOptions}
//               onChange={handleChange}
//               className="w-full h-40 p-2 border-none outline-none overflow-auto"
//             >
//               {filteredOptions.length > 0 ? (
//                 filteredOptions.map((option, index) => (
//                   <option key={index} value={option.value}>
//                     {option.label}
//                   </option>
//                 ))
//               ) : (
//                 <option disabled>No options available</option>
//               )}
//             </select>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RolesSelected;

// update...

// import React, { useState } from 'react';

// const MultiSelectDropdown = ({ label, options = [], onSelect, maxSelection = null }) => {
//   const [selectedOptions, setSelectedOptions] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleChange = (event) => {
//     const value = event.target.value;
//     let updatedSelection = [...selectedOptions];

//     if (selectedOptions.includes(value)) {
//       updatedSelection = updatedSelection.filter(item => item !== value);
//     } else {
//       if (!maxSelection || updatedSelection.length < maxSelection) {
//         updatedSelection.push(value);
//       }
//     }

//     setSelectedOptions(updatedSelection);
//     onSelect(updatedSelection); // Pass the selected options to the parent component
//   };

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const handleSelectAll = () => {
//     if (options.length === selectedOptions.length) {
//       setSelectedOptions([]);
//       onSelect([]);
//     } else {
//       const allOptions = options.map(option => option.value);
//       setSelectedOptions(allOptions);
//       onSelect(allOptions);
//     }
//   };

//   const filteredOptions = options.filter(option =>
//     option.label.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="multi-select-dropdown">
//       <label>{label}</label>
//       <input
//         type="text"
//         placeholder="Search..."
//         value={searchTerm}
//         onChange={handleSearch}
//       />
//       <button onClick={handleSelectAll}>
//         {options.length === selectedOptions.length ? 'Deselect All' : 'Select All'}
//       </button>
//       <select multiple value={selectedOptions} onChange={handleChange}>
//         {filteredOptions.length > 0 ? (
//           filteredOptions.map((option, index) => (
//             <option key={index} value={option.value}>
//               {option.label}
//             </option>
//           ))
//         ) : (
//           <option disabled>No options available</option>
//         )}
//       </select>
//     </div>
//   );
// };

// export default MultiSelectDropdown;

// update ....
// // MultiSelectDropdown.js
// import React, { useState } from 'react';

// const RolesSelected = ({ label, options, onSelect }) => {
//   const [selectedOptions, setSelectedOptions] = useState([]);

//   const handleChange = (event) => {
//     const value = event.target.value;
//     let updatedSelection = [...selectedOptions];

//     if (selectedOptions.includes(value)) {
//       updatedSelection = updatedSelection.filter(item => item !== value);
//     } else {
//       updatedSelection.push(value);
//     }

//     setSelectedOptions(updatedSelection);
//     onSelect(updatedSelection); // Pass the selected options to the parent component
//   };

//   return (
//     <div className="multi-select-dropdown">
//       <label>{label}</label>
//       <select multiple value={selectedOptions} onChange={handleChange}>
//       {options && options.length > 0 ? (
//           options.map((option, index) => (
//             <option key={index} value={option.value}>
//               {option.label}
//             </option>
//           ))
//         ) : (
//           <option disabled>No options available</option>
//         )}
//       </select>
//     </div>
//   );
// };

// export default RolesSelected;

// update...................

// import React, { useState, useRef, useEffect } from 'react';
// import './MultiSelectDropdown.css';

// const RolesSelected = ({
//     options,
//     maxSelection = Infinity,
//     placeholder = "Select items...",
//     onSelectionChange,
//     loading = false,
//     disabled = false,
//     styles = {},
// }) => {
//     const [selectedItems, setSelectedItems] = useState([]);
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//     const [inputValue, setInputValue] = useState('');
//     const dropdownRef = useRef(null);

//     const handleSelect = (option) => {
//         // Debugging: Log the current selection
//         console.log('Attempting to select option:', option);

//         if (selectedItems.length < maxSelection && !selectedItems.some(item => item.id === option.id)) {
//             const newSelection = [...selectedItems, option];
//             setSelectedItems(newSelection);
//             onSelectionChange(newSelection);

//             // Debugging: Log the updated selection
//             console.log('Updated selectedItems:', newSelection);
//         }

//         setInputValue(''); // Clear input after selection
//         setIsDropdownOpen(true); // Keep dropdown open after selection
//     };

//     const removeSelectedItem = (item) => {
//         const newSelection = selectedItems.filter(selected => selected.id !== item.id);
//         setSelectedItems(newSelection);
//         onSelectionChange(newSelection);
//     };

//     const clearAll = () => {
//         setSelectedItems([]);
//         onSelectionChange([]);
//     };

//     const toggleDropdown = () => {
//         setIsDropdownOpen(!isDropdownOpen);
//     };

//     const handleInputChange = (e) => {
//         setInputValue(e.target.value);
//         setIsDropdownOpen(true); // Ensure dropdown opens when typing
//     };

//     const handleKeyDown = (e) => {
//         if (e.key === 'Enter' && inputValue) {
//             const filteredOptions = options.filter(option => option.name.toLowerCase().includes(inputValue.toLowerCase()));
//             if (filteredOptions.length > 0) {
//                 handleSelect(filteredOptions[0]);
//             }
//         }
//     };

//     const handleClickOutside = (event) => {
//         if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//             setIsDropdownOpen(false);
//         }
//     };

//     useEffect(() => {
//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);

//     return (
//         <div
//             className="multi-select-dropdown-container"
//             style={styles.container}
//             ref={dropdownRef}
//         >
//             <div className="selected-items-container" onClick={toggleDropdown} style={styles.selectedItemsContainer}>
//                 {selectedItems.map((item, index) => (
//                     <div key={index} className="selected-item" style={styles.selectedItem}>
//                         {item.name}
//                         <button
//                             className="remove-button"
//                             onClick={(e) => { e.stopPropagation(); removeSelectedItem(item); }}
//                             style={styles.removeButton}
//                         >
//                             x
//                         </button>
//                     </div>
//                 ))}
//                 <input
//                     className="dropdown-input"
//                     type="text"
//                     value={inputValue}
//                     onChange={handleInputChange}
//                     onKeyDown={handleKeyDown}
//                     placeholder={placeholder}
//                     disabled={disabled || loading}
//                     style={styles.input}
//                     onClick={() => setIsDropdownOpen(true)} // Ensure dropdown opens on input click
//                 />
//                 {loading && <div className="loading-indicator" style={styles.loadingIndicator}>Loading...</div>}
//             </div>

//             {isDropdownOpen && (
//                 <div className="dropdown-menu" style={styles.dropdownMenu}>
//                     {options.filter(option =>
//                         option.name.toLowerCase().includes(inputValue.toLowerCase()) &&
//                         !selectedItems.some(item => item.id === option.id)
//                     ).map((option, index) => (
//                         <div
//                             key={index}
//                             className="dropdown-item"
//                             onClick={() => handleSelect(option)}
//                             style={styles.dropdownItem}
//                         >
//                             {option.name}
//                         </div>
//                     ))}
//                 </div>
//             )}

//             {selectedItems.length > 0 && (
//                 <button
//                     className="clear-all-button"
//                     onClick={clearAll}
//                     style={styles.clearAllButton}
//                 >
//                     Clear All
//                 </button>
//             )}
//         </div>
//     );
// };

// export default RolesSelected;

// update .....

// import React, { useState, useRef, useEffect } from 'react';
// import './MultiSelectDropdown.css';

// const RolesSelected = ({
//     options,
//     maxSelection = Infinity,
//     placeholder = "Select items...",
//     onSelectionChange,
//     loading = false,
//     disabled = false,
//     styles = {},
// }) => {
//     const [selectedItems, setSelectedItems] = useState([]);
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//     const [inputValue, setInputValue] = useState('');
//     const dropdownRef = useRef(null);

//     const handleSelect = (option) => {
//         if (selectedItems.length < maxSelection && !selectedItems.some(item => item.id === option.id)) {
//             const newSelection = [...selectedItems, option];
//             setSelectedItems(newSelection);
//             onSelectionChange(newSelection);
//             setInputValue('');
//         }
//     };

//     const removeSelectedItem = (item) => {
//         const newSelection = selectedItems.filter(selected => selected.id !== item.id);
//         setSelectedItems(newSelection);
//         onSelectionChange(newSelection);
//     };

//     const clearAll = () => {
//         setSelectedItems([]);
//         onSelectionChange([]);
//     };

//     const toggleDropdown = () => {
//         setIsDropdownOpen(!isDropdownOpen);
//     };

//     const handleInputChange = (e) => {
//         setInputValue(e.target.value);
//     };

//     const handleKeyDown = (e) => {
//         if (e.key === 'Enter' && inputValue) {
//             const filteredOptions = options.filter(option => option.name.toLowerCase().includes(inputValue.toLowerCase()));
//             if (filteredOptions.length > 0) {
//                 handleSelect(filteredOptions[0]);
//             }
//         }
//     };

//     const handleClickOutside = (event) => {
//         if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//             setIsDropdownOpen(false);
//         }
//     };

//     useEffect(() => {
//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);

//     return (
//         <div
//             className="multi-select-dropdown-container"
//             style={styles.container}
//             ref={dropdownRef}
//             onMouseLeave={() => setIsDropdownOpen(false)}
//         >
//             <div className="selected-items-container" onClick={toggleDropdown} style={styles.selectedItemsContainer}>
//                 {selectedItems.map((item, index) => (
//                     <div key={index} className="selected-item" style={styles.selectedItem}>
//                         {item.name}
//                         <button
//                             className="remove-button"
//                             onClick={(e) => { e.stopPropagation(); removeSelectedItem(item); }}
//                             style={styles.removeButton}
//                         >
//                             x
//                         </button>
//                     </div>
//                 ))}
//                 <input
//                     className="dropdown-input"
//                     type="text"
//                     value={inputValue}
//                     onChange={handleInputChange}
//                     onKeyDown={handleKeyDown}
//                     placeholder={placeholder}
//                     disabled={disabled || loading}
//                     style={styles.input}
//                 />
//                 {loading && <div className="loading-indicator" style={styles.loadingIndicator}>Loading...</div>}
//             </div>

//             {isDropdownOpen && (
//                 <div className="dropdown-menu" style={styles.dropdownMenu}>
//                     {options.filter(option =>
//                         option.name.toLowerCase().includes(inputValue.toLowerCase()) &&
//                         !selectedItems.some(item => item.id === option.id)
//                     ).map((option, index) => (
//                         <div
//                             key={index}
//                             className="dropdown-item"
//                             onClick={() => handleSelect(option)}
//                             style={styles.dropdownItem}
//                         >
//                             {option.name}
//                         </div>
//                     ))}
//                 </div>
//             )}

//             {selectedItems.length > 0 && (
//                 <button
//                     className="clear-all-button"
//                     onClick={clearAll}
//                     style={styles.clearAllButton}
//                 >
//                     Clear All
//                 </button>
//             )}
//         </div>
//     );
// };

// export default RolesSelected;


// 9th update......
// import React, { useState, useRef, useEffect } from 'react';
// import './MultiSelectDropdown.css';
// import './rolesselected.css';
// const RolesSelected = ({
//     options,
//     maxSelection = Infinity,
//     placeholder = "Select items...",
//     onSelectionChange,
//     loading = false,
//     disabled = false,
//     styles = {},
// }) => {
//     const [selectedItems, setSelectedItems] = useState([]);
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//     const [inputValue, setInputValue] = useState('');
//     const dropdownRef = useRef(null);

//     // Handle selection of an option
//     const handleSelect = (option) => {
//         if (selectedItems.length < maxSelection && !selectedItems.some(item => item.id === option.id)) {
//             const newSelection = [...selectedItems, option];
//             setSelectedItems(newSelection);
//             onSelectionChange(newSelection);
//             setInputValue(''); // Reset input value after selection
//             setIsDropdownOpen(true); // Keep dropdown open after selection
//         }
//     };

//     // Remove a selected item
//     const removeSelectedItem = (item) => {
//         const newSelection = selectedItems.filter(selected => selected.id !== item.id);
//         setSelectedItems(newSelection);
//         onSelectionChange(newSelection);
//     };

//     // Clear all selected items
//     const clearAll = () => {
//         setSelectedItems([]);
//         onSelectionChange([]);
//     };

//     // Toggle dropdown visibility
//     const toggleDropdown = () => {
//         setIsDropdownOpen(!isDropdownOpen);
//     };

//     // Handle input changes
//     const handleInputChange = (e) => {
//         const value = e.target.value;
//         setInputValue(value);
//         setIsDropdownOpen(true); // Open the dropdown when the user starts typing
//     };

//     // Handle keyboard navigation and selection via Enter key
//     const handleKeyDown = (e) => {
//         if (e.key === 'Enter' && inputValue) {
//             const filteredOptions = options.filter(option => option.name.toLowerCase().includes(inputValue.toLowerCase()));
//             if (filteredOptions.length > 0) {
//                 handleSelect(filteredOptions[0]);
//             }
//         }
//     };

//     // Handle clicks outside the component to close the dropdown
//     const handleClickOutside = (event) => {
//         if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//             setIsDropdownOpen(false);
//         }
//     };

//     // Add event listeners for outside clicks
//     useEffect(() => {
//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);

//     return (
//         <div
//             className="multi-select-dropdown-container"
//             style={styles.container}
//             ref={dropdownRef}
//         >
//             <div className="selected-items-container" onClick={toggleDropdown} style={styles.selectedItemsContainer}>
//                 {selectedItems.map((item, index) => (
//                     <div key={index} className="selected-item" style={styles.selectedItem}>
//                         {item.name}
//                         <button
//                             className="remove-button"
//                             onClick={(e) => { e.stopPropagation(); removeSelectedItem(item); }}
//                             style={styles.removeButton}
//                         >
//                             x
//                         </button>
//                     </div>
//                 ))}
//                 <input
//                     className="dropdown-input"
//                     type="text"
//                     value={inputValue}
//                     onChange={handleInputChange}
//                     onKeyDown={handleKeyDown}
//                     placeholder={placeholder}
//                     disabled={disabled || loading}
//                     style={styles.input}
//                 />
//                 {loading && <div className="loading-indicator" style={styles.loadingIndicator}>Loading...</div>}
//             </div>

//             {isDropdownOpen && (
//                 <div className="dropdown-menu" style={styles.dropdownMenu}>
//                     {options.filter(option =>
//                         option.name.toLowerCase().includes(inputValue.toLowerCase()) &&
//                         !selectedItems.some(item => item.id === option.id)
//                     ).map((option, index) => (
//                         <div
//                             key={index}
//                             className="dropdown-item"
//                             onClick={() => handleSelect(option)}
//                             style={styles.dropdownItem}
//                         >
//                             {option.name}
//                         </div>
//                     ))}
//                 </div>
//             )}

//             {selectedItems.length > 0 && (
//                 <button
//                     className="clear-all-button"
//                     onClick={clearAll}
//                     style={styles.clearAllButton}
//                 >
//                     Clear All
//                 </button>
//             )}
//         </div>
//     );
// };

// export default RolesSelected;

// 8th update...


// import React, { useState, useRef, useEffect } from 'react';
// import './MultiSelectDropdown.css';
// import './rolesselected.css';
// const RolesSelected = ({
//     options,
//     maxSelection = Infinity,
//     placeholder = "Select items...",
//     onSelectionChange,
//     loading = false,
//     disabled = false,
//     styles = {},
// }) => {
//     const [selectedItems, setSelectedItems] = useState([]);
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//     const [inputValue, setInputValue] = useState('');
//     const dropdownRef = useRef(null);

//     // Handle selection of an option
//     const handleSelect = (option) => {
//         if (selectedItems.length < maxSelection && !selectedItems.some(item => item.id === option.id)) {
//             const newSelection = [...selectedItems, option];
//             setSelectedItems(newSelection);
//             onSelectionChange(newSelection);
//             setInputValue('');
//         }
//     };

//     // Remove a selected item
//     const removeSelectedItem = (item) => {
//         const newSelection = selectedItems.filter(selected => selected.id !== item.id);
//         setSelectedItems(newSelection);
//         onSelectionChange(newSelection);
//     };

//     // Clear all selected items
//     const clearAll = () => {
//         setSelectedItems([]);
//         onSelectionChange([]);
//     };

//     // Toggle dropdown visibility
//     const toggleDropdown = () => {
//         setIsDropdownOpen(!isDropdownOpen);
//     };

//     // Handle input changes
//     const handleInputChange = (e) => {
//         const value = e.target.value;
//         setInputValue(value);
//         setIsDropdownOpen(true); // Open the dropdown when the user starts typing
//     };

//     // Handle keyboard navigation and selection via Enter key
//     const handleKeyDown = (e) => {
//         if (e.key === 'Enter' && inputValue) {
//             const filteredOptions = options.filter(option => option.name.toLowerCase().includes(inputValue.toLowerCase()));
//             if (filteredOptions.length > 0) {
//                 handleSelect(filteredOptions[0]);
//             }
//         }
//     };

//     // Handle clicks outside the component to close the dropdown
//     const handleClickOutside = (event) => {
//         if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//             setIsDropdownOpen(false);
//         }
//     };

//     // Handle mouse leaving the dropdown area to close it
//     const handleMouseLeave = () => {
//         setIsDropdownOpen(false);
//     };

//     // Add event listeners for outside clicks and mouse leave
//     useEffect(() => {
//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);

//     return (
//         <div
//             className="multi-select-dropdown-container"
//             style={styles.container}
//             ref={dropdownRef}
//             onMouseLeave={handleMouseLeave}
//         >
//             <div className="selected-items-container" onClick={toggleDropdown} style={styles.selectedItemsContainer}>
//                 {selectedItems.map((item, index) => (
//                     <div key={index} className="selected-item" style={styles.selectedItem}>
//                         {item.name}
//                         <button
//                             className="remove-button"
//                             onClick={(e) => { e.stopPropagation(); removeSelectedItem(item); }}
//                             style={styles.removeButton}
//                         >
//                             x
//                         </button>
//                     </div>
//                 ))}
//                 <input
//                     className="dropdown-input"
//                     type="text"
//                     value={inputValue}
//                     onChange={handleInputChange}
//                     onKeyDown={handleKeyDown}
//                     placeholder={placeholder}
//                     disabled={disabled || loading}
//                     style={styles.input}
//                 />
//                 {loading && <div className="loading-indicator" style={styles.loadingIndicator}>Loading...</div>}
//             </div>

//             {isDropdownOpen && (
//                 <div className="dropdown-menu" style={styles.dropdownMenu}>
//                     {options.filter(option =>
//                         option.name.toLowerCase().includes(inputValue.toLowerCase()) &&
//                         !selectedItems.some(item => item.id === option.id)
//                     ).map((option, index) => (
//                         <div
//                             key={index}
//                             className="dropdown-item"
//                             onClick={() => handleSelect(option)}
//                             style={styles.dropdownItem}
//                         >
//                             {option.name}
//                         </div>
//                     ))}
//                 </div>
//             )}

//             {selectedItems.length > 0 && (
//                 <button
//                     className="clear-all-button"
//                     onClick={clearAll}
//                     style={styles.clearAllButton}
//                 >
//                     Clear All
//                 </button>
//             )}
//         </div>
//     );
// };

// export default RolesSelected;


// upate 7..


// import React, { useState, useRef, useEffect } from 'react';
// import './MultiSelectDropdown.css';
// import './rolesselected.css'; 
// const RolesSelected = ({ 
//     options, 
//     maxSelection = Infinity, 
//     placeholder = "Select items...", 
//     onSelectionChange, 
//     loading = false,
//     disabled = false,
//     styles = {},
// }) => {
//     const [selectedItems, setSelectedItems] = useState([]);
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//     const [inputValue, setInputValue] = useState('');
//     const dropdownRef = useRef(null);

//     // Function to handle selection of an option
//     const handleSelect = (option) => {
//         if (selectedItems.length < maxSelection && !selectedItems.some(item => item.id === option.id)) {
//             const newSelection = [...selectedItems, option];
//             setSelectedItems(newSelection);
//             onSelectionChange(newSelection);
//             setInputValue('');
//         }
//     };

//     // Function to remove a selected item
//     const removeSelectedItem = (item) => {
//         const newSelection = selectedItems.filter(selected => selected.id !== item.id);
//         setSelectedItems(newSelection);
//         onSelectionChange(newSelection);
//     };

//     // Function to clear all selected items
//     const clearAll = () => {
//         setSelectedItems([]);
//         onSelectionChange([]);
//     };

//     // Function to toggle dropdown visibility
//     const toggleDropdown = () => {
//         setIsDropdownOpen(!isDropdownOpen);
//     };

//     // Handle input changes
//     const handleInputChange = (e) => {
//         const value = e.target.value;
//         setInputValue(value);
//     };

//     // Handle keyboard navigation and selection via Enter key
//     const handleKeyDown = (e) => {
//         if (e.key === 'Enter' && inputValue) {
//             const filteredOptions = options.filter(option => option.name.toLowerCase().includes(inputValue.toLowerCase()));
//             if (filteredOptions.length > 0) {
//                 handleSelect(filteredOptions[0]);
//             }
//         }
//     };

//     // Handle clicks outside the component to close the dropdown
//     const handleClickOutside = (event) => {
//         if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//             setIsDropdownOpen(false);
//         }
//     };

//     // Handle mouse leaving the dropdown area to close it
//     const handleMouseLeave = () => {
//         setIsDropdownOpen(false);
//     };

//     // Add event listeners for outside clicks and mouse leave
//     useEffect(() => {
//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);

//     return (
//         <div 
//             className="multi-select-dropdown-container" 
//             style={styles.container} 
//             ref={dropdownRef}
//             onMouseLeave={handleMouseLeave}
//         >
//             <div className="selected-items-container" onClick={toggleDropdown} style={styles.selectedItemsContainer}>
//                 {selectedItems.map((item, index) => (
//                     <div key={index} className="selected-item" style={styles.selectedItem}>
//                         {item.name}
//                         <button 
//                             className="remove-button" 
//                             onClick={(e) => {e.stopPropagation(); removeSelectedItem(item);}}
//                             style={styles.removeButton}
//                         >
//                             x
//                         </button>
//                     </div>
//                 ))}
//                 <input 
//                     className="dropdown-input" 
//                     type="text" 
//                     value={inputValue} 
//                     onChange={handleInputChange} 
//                     onKeyDown={handleKeyDown} 
//                     placeholder={placeholder}
//                     disabled={disabled || loading}
//                     style={styles.input}
//                 />
//                 {loading && <div className="loading-indicator" style={styles.loadingIndicator}>Loading...</div>}
//             </div>

//             {isDropdownOpen && (
//                 <div className="dropdown-menu" style={styles.dropdownMenu}>
//                     {options.filter(option => 
//                         option.name.toLowerCase().includes(inputValue.toLowerCase()) &&
//                         !selectedItems.some(item => item.id === option.id)
//                     ).map((option, index) => (
//                         <div 
//                             key={index} 
//                             className="dropdown-item" 
//                             onClick={() => handleSelect(option)}
//                             style={styles.dropdownItem}
//                         >
//                             {option.name}
//                         </div>
//                     ))}
//                 </div>
//             )}

//             {selectedItems.length > 0 && (
//                 <button 
//                     className="clear-all-button" 
//                     onClick={clearAll}
//                     style={styles.clearAllButton}
//                 >
//                     Clear All
//                 </button>
//             )}
//         </div>
//     );
// };

// export default RolesSelected;

// update 6th..............

// import React, { useState } from 'react';
// import './MultiSelectDropdown.css';
// import './rolesselected.css'; 
// const MultiSelectDropdown = ({ 
//     options, 
//     maxSelection = Infinity, 
//     placeholder = "Select items...", 
//     onSelectionChange, 
//     loading = false,
//     disabled = false,
//     styles = {},
// }) => {
//     const [selectedItems, setSelectedItems] = useState([]);
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//     const [inputValue, setInputValue] = useState('');

//     const handleSelect = (option) => {
//         if (selectedItems.length < maxSelection) {
//             const newSelection = [...selectedItems, option];
//             setSelectedItems(newSelection);
//             onSelectionChange(newSelection); // Notify parent component
//             setInputValue('');
//         }
//     };

//     const removeSelectedItem = (item) => {
//         const newSelection = selectedItems.filter(selected => selected.id !== item.id);
//         setSelectedItems(newSelection);
//         onSelectionChange(newSelection); // Notify parent component
//     };

//     const clearAll = () => {
//         setSelectedItems([]);
//         onSelectionChange([]); // Notify parent component
//     };

//     const toggleDropdown = () => {
//         setIsDropdownOpen(!isDropdownOpen);
//     };

//     const handleInputChange = (e) => {
//         const value = e.target.value;
//         setInputValue(value);
//     };

//     const handleKeyDown = (e) => {
//         if (e.key === 'Enter' && inputValue) {
//             const filteredOptions = options.filter(option => option.name.toLowerCase().includes(inputValue.toLowerCase()));
//             if (filteredOptions.length > 0) {
//                 handleSelect(filteredOptions[0]);
//             }
//         }
//     };

//     return (
//         <div className="multi-select-dropdown-container" style={styles.container}>
//             <div className="selected-items-container" onClick={toggleDropdown} style={styles.selectedItemsContainer}>
//                 {selectedItems.map((item, index) => (
//                     <div key={index} className="selected-item" style={styles.selectedItem}>
//                         {item.name}
//                         <button 
//                             className="remove-button" 
//                             onClick={(e) => {e.stopPropagation(); removeSelectedItem(item);}}
//                             style={styles.removeButton}
//                         >
//                             x
//                         </button>
//                     </div>
//                 ))}
//                 <input 
//                     className="dropdown-input" 
//                     type="text" 
//                     value={inputValue} 
//                     onChange={handleInputChange} 
//                     onKeyDown={handleKeyDown} 
//                     placeholder={placeholder}
//                     disabled={disabled || loading}
//                     style={styles.input}
//                 />
//                 {loading && <div className="loading-indicator" style={styles.loadingIndicator}>Loading...</div>}
//             </div>

//             {isDropdownOpen && (
//                 <div className="dropdown-menu" style={styles.dropdownMenu}>
//                     {options.filter(option => 
//                         option.name.toLowerCase().includes(inputValue.toLowerCase()) &&
//                         !selectedItems.some(item => item.id === option.id)
//                     ).map((option, index) => (
//                         <div 
//                             key={index} 
//                             className="dropdown-item" 
//                             onClick={() => handleSelect(option)}
//                             style={styles.dropdownItem}
//                         >
//                             {option.name}
//                         </div>
//                     ))}
//                 </div>
//             )}

//             {selectedItems.length > 0 && (
//                 <button 
//                     className="clear-all-button" 
//                     onClick={clearAll}
//                     style={styles.clearAllButton}
//                 >
//                     Clear All
//                 </button>
//             )}
//         </div>
//     );
// };

// export default MultiSelectDropdown;


// UPDATE 5th .........
// import React, { useState } from 'react';
// import './MultiSelectDropdown.css';
// import './rolesselected.css'; 
// const RolesSelected = ({ options, maxSelection = Infinity, placeholder = "Select items...", onSubmit }) => {
//     const [selectedItems, setSelectedItems] = useState([]);
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//     const [inputValue, setInputValue] = useState('');

//     const handleSelect = (option) => {
//         if (selectedItems.length < maxSelection) {
//             setSelectedItems([...selectedItems, option]);
//             setInputValue('');
//         }
//     };

//     const removeSelectedItem = (item) => {
//         setSelectedItems(selectedItems.filter(selected => selected.id !== item.id));
//     };

//     const toggleDropdown = () => {
//         setIsDropdownOpen(!isDropdownOpen);
//     };

//     const handleInputChange = (e) => {
//         const value = e.target.value;
//         setInputValue(value);
//     };

//     const handleSubmit = () => {
//         const selectedIds = selectedItems.map(item => item.id);
//         onSubmit(selectedIds); // Send selected IDs to parent component
//     };

//     return (
//         <div className="multi-select-dropdown-container">
//             <div className="selected-items-container" onClick={toggleDropdown}>
//                 {selectedItems.map((item, index) => (
//                     <div key={index} className="selected-item">
//                         {item.name}
//                         <button 
//                             className="remove-button" 
//                             onClick={(e) => {e.stopPropagation(); removeSelectedItem(item);}}
//                         >
//                             x
//                         </button>
//                     </div>
//                 ))}
//                 <input 
//                     className="dropdown-input" 
//                     type="text" 
//                     value={inputValue} 
//                     onChange={handleInputChange} 
//                     placeholder={placeholder}
//                 />
//             </div>

//             {isDropdownOpen && (
//                 <div className="dropdown-menu">
//                     {options.filter(option => 
//                         option.name.toLowerCase().includes(inputValue.toLowerCase()) &&
//                         !selectedItems.some(item => item.id === option.id)
//                     ).map((option, index) => (
//                         <div 
//                             key={index} 
//                             className="dropdown-item" 
//                             onClick={() => handleSelect(option)}
//                         >
//                             {option.name}
//                         </div>
//                     ))}
//                 </div>
//             )}

//             {selectedItems.length > 0 && (
//                 <button 
//                     className="submit-button" 
//                     onClick={handleSubmit}
//                 >
//                     Submit
//                 </button>
//             )}
//         </div>
//     );
// };

// export default RolesSelected;

// update 4th

// import React, { useState } from 'react';
// import './MultiSelectDropdown.css'; // Updated CSS for enhanced styling
// import './rolesselected.css'; 
// const RolesSelected = ({ options, maxSelection = Infinity, placeholder = "Select items..." }) => {
//     const [selectedItems, setSelectedItems] = useState([]);
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//     const [inputValue, setInputValue] = useState('');
//     const [filteredOptions, setFilteredOptions] = useState(options);

//     const handleSelect = (option) => {
//         if (selectedItems.length < maxSelection) {
//             setSelectedItems([...selectedItems, option]);
//             setInputValue(''); // Clear input after selection
//             setFilteredOptions(filteredOptions.filter(item => item !== option));
//         }
//     };

//     const isSelected = (option) => {
//         return selectedItems.includes(option);
//     };

//     const removeSelectedItem = (item) => {
//         setSelectedItems(selectedItems.filter(selected => selected !== item));
//         setFilteredOptions([...filteredOptions, item]);
//     };

//     const toggleDropdown = () => {
//         setIsDropdownOpen(!isDropdownOpen);
//     };

//     const handleInputChange = (e) => {
//         const value = e.target.value;
//         setInputValue(value);
//         setFilteredOptions(
//             options.filter(option => 
//                 option.toLowerCase().includes(value.toLowerCase()) && !isSelected(option)
//             )
//         );
//     };

//     const handleKeyDown = (e) => {
//         if (e.key === 'ArrowDown' && !isDropdownOpen) {
//             setIsDropdownOpen(true);
//         } else if (e.key === 'Escape' && isDropdownOpen) {
//             setIsDropdownOpen(false);
//         }
//     };

//     const clearAll = () => {
//         setSelectedItems([]);
//         setFilteredOptions(options);
//     };

//     return (
//         <div className="multi-select-dropdown-container" onKeyDown={handleKeyDown}>
//             <div className="selected-items-container" onClick={toggleDropdown}>
//                 {selectedItems.map((item, index) => (
//                     <div key={index} className="selected-item">
//                         {item}
//                         <button className="remove-button" onClick={(e) => {e.stopPropagation(); removeSelectedItem(item);}}>x</button>
//                     </div>
//                 ))}
//                 <input 
//                     className="dropdown-input" 
//                     type="text" 
//                     value={inputValue} 
//                     onChange={handleInputChange} 
//                     placeholder={placeholder} 
//                 />
//             </div>

//             {isDropdownOpen && (
//                 <div className="dropdown-menu">
//                     {filteredOptions.length > 0 ? (
//                         filteredOptions.map((option, index) => (
//                             <div 
//                                 key={index} 
//                                 className="dropdown-item" 
//                                 onClick={() => handleSelect(option)}
//                             >
//                                 {option}
//                             </div>
//                         ))
//                     ) : (
//                         <div className="dropdown-no-options">No options available</div>
//                     )}
//                 </div>
//             )}

//             {selectedItems.length > 0 && (
//                 <button className="clear-all-button" onClick={clearAll}>Clear All</button>
//             )}
//         </div>
//     );
// };

// export default RolesSelected;

// 2nd update.................
// import React, { useState } from 'react';
// // import './MultiSelectDropdown.css'; // Updated CSS for enhanced styling
// import './rolesselected.css'; 

// const RolesSelected = ({ options }) => {
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [inputValue, setInputValue] = useState('');

//   const handleSelect = (option) => {
//     setSelectedItems([...selectedItems, option]);
//     setInputValue(''); // Clear input after selection
//   };

//   const isSelected = (option) => {
//     return selectedItems.includes(option);
//   };

//   const removeSelectedItem = (item) => {
//     setSelectedItems(selectedItems.filter(selected => selected !== item));
//   };

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   const handleInputChange = (e) => {
//     setInputValue(e.target.value);
//   };

//   return (
//     <div className="multi-select-dropdown-container" onClick={toggleDropdown}>
//       <div className="selected-items-container">
//         {selectedItems.map((item, index) => (
//           <div key={index} className="selected-item">
//             {item}
//             <button className="remove-button" onClick={() => removeSelectedItem(item)}>x</button>
//           </div>
//         ))}
//         <input 
//           className="dropdown-input" 
//           type="text" 
//           value={inputValue} 
//           onChange={handleInputChange} 
//           placeholder="Select items..." 
//         />
//       </div>

//       {isDropdownOpen && (
//         <div className="dropdown-menu">
//           {options.filter(option => !isSelected(option)).map((option, index) => (
//             <div 
//               key={index} 
//               className="dropdown-item" 
//               onClick={() => handleSelect(option)}
//             >
//               {option}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default RolesSelected;
// 1st update.....


// import React, { useState } from 'react';
// import './rolesselected.css'; // Import custom CSS for styling

// const RolesSelected= ({ options }) => {
//   const [selectedItems, setSelectedItems] = useState([]);

//   const handleSelect = (option) => {
//     setSelectedItems([...selectedItems, option]);
//   };

//   const isSelected = (option) => {
//     return selectedItems.includes(option);
//   };

//   const removeSelectedItem = (item) => {
//     setSelectedItems(selectedItems.filter(selected => selected !== item));
//   };

//   return (
//     <div className="multi-select-dropdown">
//       <label className="dropdown-label">Select Items</label>
//       <select 
//         className="dropdown" 
//         onChange={(e) => handleSelect(e.target.value)} 
//         value=""
//       >
//         <option value="" disabled>Select an option</option>
//         {options.map((option, index) => (
//           <option 
//             key={index} 
//             value={option} 
//             disabled={isSelected(option)}
//             hidden={isSelected(option)} // Hide option if it's selected
//           >
//             {option}
//           </option>
//         ))}
//       </select>

//       <div className="selected-items">
//         <h4>Selected Items:</h4>
//         {selectedItems.length === 0 ? (
//           <p>No items selected</p>
//         ) : (
//           <ul>
//             {selectedItems.map((item, index) => (
//               <li key={index} className="selected-item">
//                 {item}
//                 <button className="remove-button" onClick={() => removeSelectedItem(item)}>Remove</button>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RolesSelected;
