import React, { useState } from 'react';

const MultiSelectComponent = ({ onSelectedItemsChange, placeholderData, errorMessage }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  // Function to handle adding items to the list
  const handleAddItems = (input) => {
    if (!input.trim()) return; // Ignore empty inputs

    // Split the input value by commas, trim whitespace, and filter out empty strings
    const itemsToAdd = input.split(',').map(item => item.trim()).filter(item => item !== '');

    let hasError = false;

    // Check for duplicates and non-empty values
    const updatedItems = [...selectedItems];
    itemsToAdd.forEach(item => {
      if (item && updatedItems.includes(item)) {
        hasError = true;
      } else if (item) {
        updatedItems.push(item);
      }
    });

    if (hasError) {
      setError(errorMessage || 'Duplicate items are not allowed.');
    } else {
      setError('');
      setSelectedItems(updatedItems);
      onSelectedItemsChange(updatedItems);
    }
    setInputValue(''); // Clear the input value
  };

  // Function to handle removing an item from the list
  const handleRemoveItem = (item) => {
    const updatedItems = selectedItems.filter((selectedItem) => selectedItem !== item);
    setSelectedItems(updatedItems);
    onSelectedItemsChange(updatedItems); // Trigger the callback with updated items
  };

  // Function to handle key down events in the input field
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault(); // Prevent default form submission behavior
      handleAddItems(inputValue);
    }
  };

  return (
    <div className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md border-2 border-gray-200 p-3 dark:border-gray-600">
      <div className="flex items-center justify-center py-10">
        <div className="w-full px-10">
          <div className="flex w-full flex-col rounded-md text-popover-foreground h-auto overflow-visible bg-transparent">
            <label
              htmlFor="frameworks"
              style={{
                position: 'absolute',
                width: '1px',
                height: '1px',
                padding: 0,
                margin: '-1px',
                overflow: 'hidden',
                clip: 'rect(0, 0, 0, 0)',
                whiteSpace: 'nowrap',
                borderWidth: 0,
              }}
            >
              {placeholderData}
            </label>
            <div className="min-h-10 rounded-md border border-input text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 px-3 py-2 cursor-text">
              <div className="relative flex flex-wrap gap-1">
                {selectedItems.map((item) => (
                  <div
                    key={item}
                    className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80"
                  >
                    {item}
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item)}
                      className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
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
                  placeholder={placeholderData}
                  className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground ml-1"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown} // Use handleKeyDown here
                  type="text"
                />
              </div>
              {error && (
                <p className="text-red-500 text-xs mt-2">{error}</p> // Display error message
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiSelectComponent;


// import React, { useState } from 'react';

// const MultiSelectComponent = ({ onSelectedItemsChange , placeholderData }) => {
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [inputValue, setInputValue] = useState('');

//   // Function to handle adding items to the list
//   const handleAddItems = (input) => {
//     // Split the input value by commas, trim whitespace, and filter out empty strings
//     const itemsToAdd = input.split(',').map(item => item.trim()).filter(item => item !== '');

//     // Check for duplicates and non-empty values
//     const updatedItems = [...selectedItems];
//     itemsToAdd.forEach(item => {
//       if (!updatedItems.includes(item)) {
//         updatedItems.push(item);
//       }
//     });

//     setSelectedItems(updatedItems);
//     onSelectedItemsChange(updatedItems); // Pass updated items to parent component
//   };

//   // Function to handle removing an item from the list
//   const handleRemoveItem = (item) => {
//     const updatedItems = selectedItems.filter((selectedItem) => selectedItem !== item);
//     setSelectedItems(updatedItems);
//     onSelectedItemsChange(updatedItems); // Pass updated items to parent component
//   };

//   // Function to handle key down events in the input field
//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter' || e.key === ',') {
//       e.preventDefault(); // Prevent default form submission behavior
//       handleAddItems(inputValue);
//       setInputValue(''); // Clear the input field after adding items
//     }
//   };

//   return (
//     <div className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md border-2 border-gray-200 p-3 dark:border-gray-600">
//       <div className="flex items-center justify-center py-10">
//         <div className="w-full px-10">
//           <div className="flex w-full flex-col rounded-md text-popover-foreground h-auto overflow-visible bg-transparent">
//             <label
//               htmlFor="frameworks"
//               style={{
//                 position: 'absolute',
//                 width: '1px',
//                 height: '1px',
//                 padding: 0,
//                 margin: '-1px',
//                 overflow: 'hidden',
//                 clip: 'rect(0, 0, 0, 0)',
//                 whiteSpace: 'nowrap',
//                 borderWidth: 0,
//               }}
//             >
//               {placeholderData}
//             </label>
//             <div className="min-h-10 rounded-md border border-input text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 px-3 py-2 cursor-text">
//               <div className="relative flex flex-wrap gap-1">
//                 {selectedItems.map((item) => (
//                   <div
//                     key={item}
//                     className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80"
//                   >
//                     {item}
//                     <button
//                       type="button"
//                       onClick={() => handleRemoveItem(item)}
//                       className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="24"
//                         height="24"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         className="lucide lucide-x h-3 w-3 text-muted-foreground hover:text-foreground"
//                       >
//                         <path d="M18 6 6 18"></path>
//                         <path d="m6 6 12 12"></path>
//                       </svg>
//                     </button>
//                   </div>
//                 ))}
//                 <input
//                   placeholder={placeholderData}
//                   className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground ml-1"
//                   value={inputValue}
//                   onChange={(e) => setInputValue(e.target.value)}
//                   onKeyDown={handleKeyDown} // Use handleKeyDown here
//                   type="text"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MultiSelectComponent;

// import React, { useState } from 'react';

// const MultiSelectComponent = ({ onSelectedItemsChange }) => {
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [inputValue, setInputValue] = useState('');

//   const handleAddItem = (item) => {
//     if (!selectedItems.includes(item) && item.trim() !== '') {
//       const updatedItems = [...selectedItems, item];
//       setSelectedItems(updatedItems);
//       onSelectedItemsChange(updatedItems); // Trigger the callback with updated items
//     }
//     setInputValue('');
//   };

//   const handleRemoveItem = (item) => {
//     const updatedItems = selectedItems.filter((selectedItem) => selectedItem !== item);
//     setSelectedItems(updatedItems);
//     onSelectedItemsChange(updatedItems); // Trigger the callback with updated items
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter') {
//       e.preventDefault(); // Prevent default form submission behavior
//       handleAddItem(inputValue);
//     }
//   };

//   return (
//     <div className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md border-2 border-gray-200 p-3 dark:border-gray-600">
//       <div className="flex items-center justify-center py-10">
//         <div className="w-full px-10">
//           <div className="flex w-full flex-col rounded-md text-popover-foreground h-auto overflow-visible bg-transparent">
//             <label
//               htmlFor="frameworks"
//               style={{
//                 position: 'absolute',
//                 width: '1px',
//                 height: '1px',
//                 padding: 0,
//                 margin: '-1px',
//                 overflow: 'hidden',
//                 clip: 'rect(0, 0, 0, 0)',
//                 whiteSpace: 'nowrap',
//                 borderWidth: 0,
//               }}
//             >
//               Select frameworks you like...
//             </label>
//             <div className="min-h-10 rounded-md border border-input text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 px-3 py-2 cursor-text">
//               <div className="relative flex flex-wrap gap-1">
//                 {selectedItems.map((item) => (
//                   <div
//                     key={item}
//                     className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80"
//                   >
//                     {item}
//                     <button
//                       type="button"
//                       onClick={() => handleRemoveItem(item)}
//                       className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="24"
//                         height="24"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         className="lucide lucide-x h-3 w-3 text-muted-foreground hover:text-foreground"
//                       >
//                         <path d="M18 6 6 18"></path>
//                         <path d="m6 6 12 12"></path>
//                       </svg>
//                     </button>
//                   </div>
//                 ))}
//                 <input
//                   placeholder="Select frameworks you like..."
//                   className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground ml-1"
//                   value={inputValue}
//                   onChange={(e) => setInputValue(e.target.value)}
//                   onKeyDown={handleKeyDown} // Use handleKeyDown here
//                   type="text"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MultiSelectComponent;

// import React, { useState } from 'react';

// const MultiSelectComponent = ({ onSelectedItemsChange }) => {
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [inputValue, setInputValue] = useState('');

//   const handleAddItem = (item) => {
//     if (!selectedItems.includes(item) && item.trim() !== '') {
//       const updatedItems = [...selectedItems, item];
//       setSelectedItems(updatedItems);
//       onSelectedItemsChange(updatedItems); // Trigger the callback with updated items
//     }
//     setInputValue('');
//   };

//   const handleRemoveItem = (item) => {
//     const updatedItems = selectedItems.filter((selectedItem) => selectedItem !== item);
//     setSelectedItems(updatedItems);
//     onSelectedItemsChange(updatedItems); // Trigger the callback with updated items
//   };

//   return (
//     <div className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md border-2 border-gray-200 p-3 dark:border-gray-600">
//       <div className="flex items-center justify-center py-10">
//         <div className="w-full px-10">
//           <div className="flex w-full flex-col rounded-md text-popover-foreground h-auto overflow-visible bg-transparent">
//             <label
//               htmlFor="frameworks"
//               style={{
//                 position: 'absolute',
//                 width: '1px',
//                 height: '1px',
//                 padding: 0,
//                 margin: '-1px',
//                 overflow: 'hidden',
//                 clip: 'rect(0, 0, 0, 0)',
//                 whiteSpace: 'nowrap',
//                 borderWidth: 0,
//               }}
//             >
//               Select frameworks you like...
//             </label>
//             <div className="min-h-10 rounded-md border border-input text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 px-3 py-2 cursor-text">
//               <div className="relative flex flex-wrap gap-1">
//                 {selectedItems.map((item) => (
//                   <div
//                     key={item}
//                     className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80"
//                   >
//                     {item}
//                     <button
//                       type="button"
//                       onClick={() => handleRemoveItem(item)}
//                       className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="24"
//                         height="24"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         className="lucide lucide-x h-3 w-3 text-muted-foreground hover:text-foreground"
//                       >
//                         <path d="M18 6 6 18"></path>
//                         <path d="m6 6 12 12"></path>
//                       </svg>
//                     </button>
//                   </div>
//                 ))}
//                 <input
//                   placeholder="Select frameworks you like..."
//                   className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground ml-1"
//                   value={inputValue}
//                   onChange={(e) => setInputValue(e.target.value)}
//                   onKeyDown={(e) => {
//                     if (e.key === 'Enter') {
//                       handleAddItem(inputValue);
//                     }
//                   }}
//                   type="text"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MultiSelectComponent;

// import React, { useState } from 'react';

// const MultiSelectComponent = ({ onSelectedItemsChange }) => {
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [inputValue, setInputValue] = useState('');

//   const handleAddItem = (item) => {
//     if (!selectedItems.includes(item) && item.trim() !== '') {
//       const updatedItems = [...selectedItems, item];
//       setSelectedItems(updatedItems);
//       onSelectedItemsChange(updatedItems); // Pass updated items to parent
//     }
//     setInputValue('');
//   };

//   const handleRemoveItem = (item) => {
//     const updatedItems = selectedItems.filter((selectedItem) => selectedItem !== item);
//     setSelectedItems(updatedItems);
//     onSelectedItemsChange(updatedItems); // Pass updated items to parent
//   };

//   return (
//     <div className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md border-2 border-gray-200 p-3 dark:border-gray-600">
//       <div className="flex items-center justify-center py-10">
//         <div className="w-full px-10">
//           <div className="flex w-full flex-col rounded-md text-popover-foreground h-auto overflow-visible bg-transparent">
//             <div className="min-h-10 rounded-md border border-input text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 px-3 py-2 cursor-text">
//               <div className="relative flex flex-wrap gap-1">
//                 {selectedItems.map((item) => (
//                   <div
//                     key={item}
//                     className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80"
//                   >
//                     {item}
//                     <button
//                       type="button"
//                       onClick={() => handleRemoveItem(item)}
//                       className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="24"
//                         height="24"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         className="lucide lucide-x h-3 w-3 text-muted-foreground hover:text-foreground"
//                       >
//                         <path d="M18 6 6 18"></path>
//                         <path d="m6 6 12 12"></path>
//                       </svg>
//                     </button>
//                   </div>
//                 ))}
//                 <input
//                   placeholder="Select frameworks you like..."
//                   className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground ml-1"
//                   value={inputValue}
//                   onChange={(e) => setInputValue(e.target.value)}
//                   onKeyDown={(e) => {
//                     if (e.key === 'Enter') {
//                       handleAddItem(inputValue);
//                     }
//                   }}
//                   type="text"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MultiSelectComponent;

// import React, { useState } from 'react';

// const MultiSelectComponent = ({ onSelectedItemsChange }) => {
//   const [selectedItems, setSelectedItems] = useState([]);

//   const handleSelect = (item) => {
//     const updatedItems = [...selectedItems, item];
//     setSelectedItems(updatedItems);
//     onSelectedItemsChange(updatedItems);  // Pass selected items to parent component
//   };

//   const handleRemove = (item) => {
//     const updatedItems = selectedItems.filter((i) => i !== item);
//     setSelectedItems(updatedItems);
//     onSelectedItemsChange(updatedItems);  // Pass updated items to parent component
//   };

//   return (
//     <div>
//       <div className="multi-select-container">
//         {['Next.js', 'Remix', 'Vite'].map((item) => (
//           <div key={item} className="multi-select-item">
//             <span>{item}</span>
//             <button type="button" onClick={() => handleSelect(item)}>Select</button>
//           </div>
//         ))}
//       </div>

//       <div className="selected-items">
//         <h3>Selected Items:</h3>
//         {selectedItems.map((item, index) => (
//           <div key={index} className="selected-item">
//             <span>{item}</span>
//             <button type="button" onClick={() => handleRemove(item)}>Remove</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MultiSelectComponent;


// import React, { useState } from 'react';

// const MultiSelectComponent = () => {
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [inputValue, setInputValue] = useState('');

//   const handleAddItem = (item) => {
//     if (!selectedItems.includes(item) && item.trim() !== '') {
//       setSelectedItems([...selectedItems, item]);
//     }
//     setInputValue('');
//   };

//   const handleRemoveItem = (item) => {
//     setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));
//   };

//   return (
//     <div className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md border-2 border-gray-200 p-3 dark:border-gray-600">
//       <div className="flex items-center justify-center py-10">
//         <div className="w-full px-10">
//           <div className="flex w-full flex-col rounded-md text-popover-foreground h-auto overflow-visible bg-transparent">
//             <label
//               htmlFor="frameworks"
//               style={{
//                 position: 'absolute',
//                 width: '1px',
//                 height: '1px',
//                 padding: 0,
//                 margin: '-1px',
//                 overflow: 'hidden',
//                 clip: 'rect(0, 0, 0, 0)',
//                 whiteSpace: 'nowrap',
//                 borderWidth: 0,
//               }}
//             >
//               Select frameworks you like...
//             </label>
//             <div className="min-h-10 rounded-md border border-input text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 px-3 py-2 cursor-text">
//               <div className="relative flex flex-wrap gap-1">
//                 {selectedItems.map((item) => (
//                   <div
//                     key={item}
//                     className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80"
//                   >
//                     {item}
//                     <button
//                       type="button"
//                       onClick={() => handleRemoveItem(item)}
//                       className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="24"
//                         height="24"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         className="lucide lucide-x h-3 w-3 text-muted-foreground hover:text-foreground"
//                       >
//                         <path d="M18 6 6 18"></path>
//                         <path d="m6 6 12 12"></path>
//                       </svg>
//                     </button>
//                   </div>
//                 ))}
//                 <input
//                   placeholder="Select frameworks you like..."
//                   className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground ml-1"
//                   value={inputValue}
//                   onChange={(e) => setInputValue(e.target.value)}
//                   onKeyDown={(e) => {
//                     if (e.key === 'Enter') {
//                       handleAddItem(inputValue);
//                     }
//                   }}
//                   type="text"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MultiSelectComponent;
