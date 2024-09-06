import React, { useState, useRef, useEffect } from 'react';
import './CustomDropdown.css';

const CustomDropdown = ({ options, multiSelect = false, title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

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
    <div ref={dropdownRef} className="relative inline-block w-full">
      <button onClick={toggleDropdown} className="px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
        {selectedOptions.length > 0 ? selectedOptions.join(',  ') : (`${title}`)}
      </button>
      {isOpen && (
        <ul className="absolute px-5 bg-white border border-gray-300 rounded-md shadow-lg mt-1 w-full max-h-60 overflow-auto">
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

export default CustomDropdown;
// import React, { useState, useRef, useEffect } from 'react';
// import './CustomDropdown.css';

// const CustomDropdown = ({ options, multiSelect = false }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedOptions, setSelectedOptions] = useState([]);
//   const dropdownRef = useRef(null);

//   // Close dropdown if clicked outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const toggleDropdown = () => setIsOpen(!isOpen);

//   const handleSelect = (option) => {
//     if (multiSelect) {
//       setSelectedOptions(prev =>
//         prev.includes(option)
//           ? prev.filter(o => o !== option)
//           : [...prev, option]
//       );
//     } else {
//       setSelectedOptions([option]);
//       setIsOpen(false);
//     }
//   };

//   return (
//     <div ref={dropdownRef} className="dropdown">
//       <button onClick={toggleDropdown} className="dropdown-button">
//         {selectedOptions.length > 0 ? selectedOptions.join(',  ') : 'Select options'}
//       </button>
//       {isOpen && (
//         <ul className="dropdown-menu">
//           {options.map(option => (
//             <li 
//               key={option} 
//               onClick={() => handleSelect(option)} 
//               className={selectedOptions.includes(option) ? 'selected' : ''}
//             >
//               {option}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default CustomDropdown;
