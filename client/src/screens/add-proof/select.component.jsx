import React, { useState } from 'react';



export const SelectProofs = ({data, selectedOptions, setSelectedOptions}) => {
 
  const toggleOption = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <div className="select-container">
      <ul className="select-list space-y-2">
        {data?.map((option, index) => (
          <li
            key={index}
            className={`cursor-pointer  p-4 hover:bg-gray-100 ${
              selectedOptions.includes(option.label) ? 'bg-gray-100' : ''
            }`}
            onClick={() => toggleOption(option.label)}
            style={{
              borderRadius:'4px',
              background:' rgba(4, 69, 175, 0.1)',
              color:'rgb(4, 69, 175)',
              boxShadow:
                selectedOptions.includes(option.label) || option.label === 'Option 2' // Adjust based on your criteria
                  ? 'rgba(4, 69, 175, 0.8) 0px 0px 0px 2px inset'
                  : 'none',
            }}
          >
           {selectedOptions.includes(option.label) &&  <span className="mr-2">✓</span>}
            {option.label}
          </li>
        ))}
      </ul>
      {/* <div className="selected-options mt-4">
        <strong>Selected Options:</strong>
        <ul className="pl-4">
          {selectedOptions.map((option, index) => (
            <li key={index}>{option}</li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};
