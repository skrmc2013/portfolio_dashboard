
import React, { useState } from 'react';
import './MultiSelectDropdown.css'
const MultiSelectDropdown = ({ options }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleSelect = (option) => {
    setSelectedOptions([...selectedOptions, option]);
    setInputValue('');
  };

  const handleRemove = (option) => {
    setSelectedOptions(selectedOptions.filter(item => item !== option));
  };

  const filteredOptions = options.filter(option => !selectedOptions.includes(option));

  return (
    <div className="multi-select-dropdown">
      <div className="selected-options">
        {selectedOptions.map(option => (
          <span className="tag" key={option}>
            {option} <button onClick={() => handleRemove(option)}>x</button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Select frameworks you like..."
        />
      </div>
      {inputValue && (
        <ul className="dropdown">
          {filteredOptions.map(option => (
            <li key={option} onClick={() => handleSelect(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
