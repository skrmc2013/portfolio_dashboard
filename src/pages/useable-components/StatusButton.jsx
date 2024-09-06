import React from 'react';

// Reusable button component for toggling visibility and deployment
const StatusButton = ({ status, label, onClick, isEditable, colorActive, colorInactive }) => {
  const buttonStyles = status ? `${colorActive} text-white` : `${colorInactive} text-black`;

  return (
    <button
      className={`${buttonStyles} px-3 py-1 rounded-lg`}
      onClick={onClick}
      disabled={!isEditable}
    >
      {label}
    </button>
  );
};

export default StatusButton;
