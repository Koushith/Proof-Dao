import React, { useState } from 'react';

const dummyOptions = [
  { id: 1, label: 'Option 1' },
  { id: 2, label: 'Option 2' },
  { id: 3, label: 'Option 3' },
  { id: 4, label: 'Option 4' },
  { id: 5, label: 'Option 5' },
];

export const SelectProofs = ({data}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

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
        {data?.map((option) => (
          <li
            key={option.id}
            className={`p-2 cursor-pointer  p-4 hover:bg-gray-100 ${
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
