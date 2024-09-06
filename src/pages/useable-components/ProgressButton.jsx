import React from 'react';

const ProgressButton = ({ status, percentage = 0, disabled , percentageValue}) => {
  // Determine the button color based on the status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Not Started':
        return 'gray';
      case 'In Progress':
        return 'blue';
      case 'Completed':
        return 'green';
      case 'On Hold':
        return 'orange';
      default:
        return 'gray';
    }
  };

  // Determine the progress bar color based on the percentage
  const getProgressBarColor = (percentage) => {
    if (percentage < 10) return '#FF0000'; // Red for 0-9%
    if (percentage < 20) return '#FF7F00'; // Orange for 10-19%
    if (percentage < 30) return '#FFFF00'; // Yellow for 20-29%
    if (percentage < 40) return '#7FFF00'; // Light Green for 30-39%
    if (percentage < 50) return '#00FF00'; // Green for 40-49%
    if (percentage < 60) return '#00FFFF'; // Cyan for 50-59%
    if (percentage < 70) return '#0000FF'; // Blue for 60-69%
    if (percentage < 80) return '#4B0082'; // Indigo for 70-79%
    if (percentage < 90) return '#8A2BE2'; // Blue Violet for 80-89%
    return '#FF1493'; // Deep Pink for 90-100%
  };

  const buttonStyle = {
    backgroundColor: getStatusColor(status),
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    position: 'relative',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const progressBarStyle = {
    width: `${percentage}%`,
    height: '5px',
    backgroundColor: getProgressBarColor(percentage),
    borderRadius: '2px',
    position: 'absolute',
    bottom: '5px',
    left: '0',
  };

  return (
    <button style={buttonStyle} disabled={disabled}>
      {status} {percentageValue > 0 ? `- ${percentageValue}%` : ''}
      <div style={progressBarStyle}></div>
    </button>
  );
};

export default ProgressButton;


// import React from 'react';

// const ProgressButton = ({ status, percentage, disabled }) => {
//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Not Started':
//         return 'gray';
//       case 'In Progress':
//         return 'blue';
//       case 'Completed':
//         return 'green';
//       case 'On Hold':
//         return 'orange';
//       default:
//         return 'gray';
//     }
//   };

//   const buttonStyle = {
//     backgroundColor: getStatusColor(status),
//     color: 'white',
//     padding: '10px 20px',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: disabled ? 'not-allowed' : 'pointer',
//     opacity: disabled ? 0.6 : 1,
//     position: 'relative',
//     fontSize: '16px',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   };

//   const progressBarStyle = {
//     width: `${!percentage? "0px": `${percentage}`}%`,
//     height: '5px',
//     backgroundColor: 'white',
//     borderRadius: '2px',
//     position: 'absolute',
//     bottom: '5px',
//     left: '0',
//   };

//   return (
//     <button style={buttonStyle} disabled={disabled}>
//       {status} {!percentage? "" : `- ${percentage}%`}
//       <div style={progressBarStyle}></div>
//     </button>
//   );
// };

// export default ProgressButton;
