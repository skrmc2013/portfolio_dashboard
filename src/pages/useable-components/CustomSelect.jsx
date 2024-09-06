import React, { useState, useRef, useEffect } from 'react';
import './customselect.css'
const CustomSelect = ({ options, multiSelect = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    if (multiSelect) {
      setSelectedOptions(prev => 
        prev.includes(option)
          ? prev.filter(o => o !== option)
          : [...prev, option]
      );
    } else {
      setSelectedOptions([option]);
      setIsOpen(false);
    }
  };

  return (
    <div ref={dropdownRef} className="dropdown">
      <button onClick={toggleDropdown}>
        {selectedOptions.length > 0 ? selectedOptions.join(', ') : 'Select options'}
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map(option => (
            <li 
              key={option} 
              onClick={() => handleSelect(option)} 
              className={selectedOptions.includes(option) ? 'selected' : ''}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;


// import React, { useState, useEffect, useRef } from 'react';
// import './customselect.css';
// const CustomSelect = ({ 
//   isMulti = false, 
//   options = [], 
//   value = [], 
//   onChange, 
//   fetchOptions 
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectOptions, setSelectOptions] = useState([]);
//   const selectRef = useRef(null);

//   useEffect(() => {
//     if (fetchOptions) {
//       // Options fetch karna (API ya Database se)
//       fetchOptions().then(fetchedOptions => {
//         setSelectOptions(fetchedOptions);
//       });
//     } else {
//       // Static options ko set karna
//       setSelectOptions(options);
//     }
//   }, [options, fetchOptions]);

//   const toggleDropdown = () => setIsOpen(!isOpen);

//   const handleSelect = (selectedOption) => {
//     let newValue;
//     if (isMulti) {
//       if (value.includes(selectedOption)) {
//         // Option ko remove karna agar wo already selected hai
//         newValue = value.filter(item => item !== selectedOption);
//       } else {
//         // Option ko add karna
//         newValue = [...value, selectedOption];
//       }
//     } else {
//       newValue = selectedOption;
//       setIsOpen(false); // Single select mein dropdown ko close karna
//     }
//     onChange(newValue);
//   };

//   // Dropdown ko close karna jab user bahar click kare
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (selectRef.current && !selectRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [selectRef]);

//   return (
//     <div className="custom-select" ref={selectRef}>
//       <div className="select-box" onClick={toggleDropdown}>
//         {isMulti ? 
//           (value.length > 0 ? value.join(', ') : 'Select options') : 
//           (value || 'Select option')
//         }
//         <span className="arrow">{isOpen ? '▲' : '▼'}</span>
//       </div>
//       {isOpen && (
//         <ul className="options-list">
//           {selectOptions.map((option, index) => (
//             <li 
//               key={index} 
//               className={`option ${value.includes(option) ? 'selected' : ''}`} 
//               onClick={() => handleSelect(option)}
//             >
//               {option}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default CustomSelect;
