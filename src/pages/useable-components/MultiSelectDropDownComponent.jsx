
import React from 'react';
import Select from 'react-select';

const MultiSelectDropDownComponent = ({ options, selectedItems, setSelectedItems, placeholder }) => {
  const handleChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map(option => option.value);
    setSelectedItems(selectedValues);
  };

  return (
    <Select
      isMulti
      options={options.map(option => ({ label: option.label, value: option.value }))}
      value={options.filter(option => selectedItems.includes(option.value))}
      onChange={handleChange}
      placeholder={placeholder}
      className="basic-multi-select"
      classNamePrefix="select"
    />
  );
}

export default MultiSelectDropDownComponent;

// import React, { useState } from 'react';

// const MultiSelectDropdown = ({ options, onSelectedItemsChange, placeholder }) => {
//   const [selectedItems, setSelectedItems] = useState([]);
  
//   const handleSelect = (event) => {
//     const selectedId = event.target.value;
//     const selectedItem = options.find(option => option.id === selectedId);
    
//     if (!selectedItems.some(item => item.id === selectedId)) {
//       const updatedItems = [...selectedItems, selectedItem];
//       setSelectedItems(updatedItems);
//       onSelectedItemsChange(updatedItems.map(item => item.id));
//     }
//   };

//   const handleRemove = (id) => {
//     const updatedItems = selectedItems.filter(item => item.id !== id);
//     setSelectedItems(updatedItems);
//     onSelectedItemsChange(updatedItems.map(item => item.id));
//   };

//   return (
//     <div>
//       <select onChange={handleSelect} className="dropdown">
//         <option value="">{placeholder}</option>
//         {options.map(option => (
//           <option key={option.id} value={option.id}>{option.name}</option>
//         ))}
//       </select>

//       <div className="selected-items">
//         {selectedItems.map(item => (
//           <div key={item.id} className="selected-item">
//             {item.name}
//             <button onClick={() => handleRemove(item.id)}>x</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MultiSelectDropdown;


// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

// const MultiSelectDropDownComponent = ({ predefinedRoles, fetchOptions, placeholderData, onSelect }) => {
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [options, setOptions] = useState([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const [inputValue, setInputValue] = useState('');
  
//   useEffect(() => {
//     const loadOptions = async () => {
//       if (fetchOptions) {
//         const fetchedOptions = await fetchOptions();
//         setOptions(fetchedOptions);
//       } else {
//         setOptions(predefinedRoles);
//       }
//     };
//     loadOptions();
//   }, [fetchOptions, predefinedRoles]);

//   const handleSelect = (item) => {
//     if (!selectedItems.some((selectedItem) => selectedItem.id === item.id)) {
//       setSelectedItems((prev) => [...prev, item]);
//       setInputValue(''); // Clear input after selection
//     }
//   };

//   const handleRemove = (itemId) => {
//     setSelectedItems((prev) => prev.filter((item) => item.id !== itemId));
//   };

//   const toggleDropdown = () => {
//     setIsOpen((prev) => !prev);
//   };

//   const handleOptionClick = (option) => {
//     handleSelect(option);
//   };

//   return (
//     <div className="relative">
//       <div className="flex flex-wrap gap-2 mb-2">
//         {selectedItems.map((item) => (
//           <span key={item.id} className="flex items-center gap-1 p-2 bg-gray-200 rounded">
//             {item.name}
//             <button
//               type="button"
//               onClick={() => handleRemove(item.id)}
//               className="text-red-500"
//             >
//               &times;
//             </button>
//           </span>
//         ))}
//       </div>
//       <div
//         className="cursor-pointer border p-2 rounded-md w-full flex justify-between items-center"
//         onClick={toggleDropdown}
//       >
//         <input
//           type="text"
//           placeholder={placeholderData}
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           className="w-full border-none outline-none"
//           readOnly
//         />
//         <span>{isOpen ? '▲' : '▼'}</span>
//       </div>
//       {isOpen && (
//         <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-md shadow-lg z-10">
//           <div className="max-h-60 overflow-y-auto">
//             {options
//               .filter((option) => !selectedItems.some((item) => item.id === option.id))
//               .map((option) => (
//                 <div
//                   key={option.id}
//                   onClick={() => handleOptionClick(option)}
//                   className="relative cursor-pointer select-none p-2 text-sm hover:bg-gray-200"
//                 >
//                   {option.name}
//                 </div>
//               ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// MultiSelectDropDownComponent.propTypes = {
//   predefinedRoles: PropTypes.arrayOf(PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired
//   })),
//   fetchOptions: PropTypes.func,
//   placeholderData: PropTypes.string,
//   onSelect: PropTypes.func
// };

// export default MultiSelectDropDownComponent;
