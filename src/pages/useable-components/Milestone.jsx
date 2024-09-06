import React, { useState } from "react";

const Milestone = ({ onMilestonesChange }) => {
  const [milestones, setMilestones] = useState([]);

  const handleAddMilestone = () => {
    const newMilestone = {
      name: "",
      description: "",
      deadline: "",
      completed: false,
      status: "Not Started",
      showOnPortfolio: false,
      showOnHomepage: false,
    };
    setMilestones((prevMilestones) => {
      const updatedMilestones = [...prevMilestones, newMilestone];
      onMilestonesChange(updatedMilestones);
      return updatedMilestones;
    });
  };

  const handleUpdateMilestone = (index, key, value) => {
    const updatedMilestones = milestones.map((milestone, i) => {
      if (i === index) {
        const updatedMilestone = { ...milestone, [key]: value };
        if (key === "completed" && value) {
          updatedMilestone.status = "Completed";
        }
        return updatedMilestone;
      }
      return milestone;
    });

    setMilestones(updatedMilestones);
    onMilestonesChange(updatedMilestones);
  };

  const handleDeleteMilestone = (index) => {
    const updatedMilestones = milestones.filter((_, i) => i !== index);
    setMilestones(updatedMilestones);
    onMilestonesChange(updatedMilestones);
  };

  return (
    // <div className="p-4 border rounded bg-white shadow-lg">
    <div className="p-4 border rounded bg-white shadow-lg w-full">
      <h2 className="text-xl font-bold mb-4">Milestones</h2>
      {milestones.map((milestone, index) => (
        <div key={index} className="mb-4 p-4 border rounded-lg shadow-sm bg-gray-50 relative">
          <div className="flex justify-between items-center mb-2">
            <input
              type="text"
              placeholder="Milestone Name"
              value={milestone.name}
              onChange={(e) => handleUpdateMilestone(index, "name", e.target.value)}
              className="mb-2 p-2 border rounded w-full focus:ring focus:ring-blue-200"
            />
            <button
              onClick={() => handleDeleteMilestone(index)}
              className="text-red-500 hover:text-red-700 ml-4"
            >
              Delete
            </button>
          </div>
          <textarea
            placeholder="Description"
            value={milestone.description}
            onChange={(e) => handleUpdateMilestone(index, "description", e.target.value)}
            className="mb-2 p-2 border rounded w-full focus:ring focus:ring-blue-200"
          />
          <input
            type="date"
            value={milestone.deadline}
            onChange={(e) => handleUpdateMilestone(index, "deadline", e.target.value)}
            className="mb-2 p-2 border rounded w-full focus:ring focus:ring-blue-200"
          />
          <select
            value={milestone.status}
            onChange={(e) => handleUpdateMilestone(index, "status", e.target.value)}
            disabled={milestone.completed}
            className="mb-2 p-2 border rounded w-full focus:ring focus:ring-blue-200"
          >
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Delayed">Delayed</option>
            <option value="Completed">Completed</option>
          </select>
          <label className="inline-flex items-center mb-2">
            <input
              type="checkbox"
              checked={milestone.completed}
              onChange={(e) => handleUpdateMilestone(index, "completed", e.target.checked)}
              className="mr-2"
            />
            Completed
          </label>
          <div className="flex mt-2">
            <label className="flex items-center mr-4">
              <input
                type="checkbox"
                checked={milestone.showOnPortfolio}
                onChange={(e) => handleUpdateMilestone(index, "showOnPortfolio", e.target.checked)}
                className="mr-2"
              />
              Show on Portfolio
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={milestone.showOnHomepage}
                onChange={(e) => handleUpdateMilestone(index, "showOnHomepage", e.target.checked)}
                className="mr-2"
              />
              Show on Homepage
            </label>
          </div>
        </div>
      ))}
      <button
        onClick={handleAddMilestone}
        className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Add Milestone
      </button>
    </div>
  );
};

export default Milestone;

// update 3r for styling and delete and update functionality
// import React, { useState } from "react";

// const Milestone = ({ onMilestonesChange }) => {
//   const [milestones, setMilestones] = useState([]);

//   const handleAddMilestone = () => {
//     const newMilestone = {
//       name: "",
//       description: "",
//       deadline: "",
//       completed: false,
//       status: "Not Started",
//       showOnPortfolio: false,
//       showOnHomepage: false,
//     };
//     setMilestones((prevMilestones) => {
//       const updatedMilestones = [...prevMilestones, newMilestone];
//       onMilestonesChange(updatedMilestones); // Send updated milestones to parent
//       return updatedMilestones;
//     });
//   };

//   const handleUpdateMilestone = (index, key, value) => {
//     const updatedMilestones = milestones.map((milestone, i) => {
//       if (i === index) {
//         const updatedMilestone = { ...milestone, [key]: value };
//         if (key === "completed" && value) {
//           updatedMilestone.status = "Completed"; // Automatically update status
//         }
//         return updatedMilestone;
//       }
//       return milestone;
//     });

//     setMilestones(updatedMilestones);
//     onMilestonesChange(updatedMilestones); // Send updated milestones to parent
//   };

//   return (
//     <div className="p-4 border rounded">
//       <h2 className="text-xl font-bold mb-4">Milestones</h2>
//       {milestones.map((milestone, index) => (
//         <div key={index} className="mb-4 p-2 border-b">
//           <input
//             type="text"
//             placeholder="Milestone Name"
//             value={milestone.name}
//             onChange={(e) => handleUpdateMilestone(index, "name", e.target.value)}
//             className="mb-2 p-2 border rounded w-full"
//           />
//           <textarea
//             placeholder="Description"
//             value={milestone.description}
//             onChange={(e) => handleUpdateMilestone(index, "description", e.target.value)}
//             className="mb-2 p-2 border rounded w-full"
//           />
//           <input
//             type="date"
//             value={milestone.deadline}
//             onChange={(e) => handleUpdateMilestone(index, "deadline", e.target.value)}
//             className="mb-2 p-2 border rounded w-full"
//           />
//           <select
//             value={milestone.status}
//             onChange={(e) => handleUpdateMilestone(index, "status", e.target.value)}
//             disabled={milestone.completed}
//             className="mb-2 p-2 border rounded w-full"
//           >
//             <option value="Not Started">Not Started</option>
//             <option value="In Progress">In Progress</option>
//             <option value="Delayed">Delayed</option>
//             <option value="Completed">Completed</option>
//           </select>
//           <label className="inline-flex items-center">
//             <input
//               type="checkbox"
//               checked={milestone.completed}
//               onChange={(e) => handleUpdateMilestone(index, "completed", e.target.checked)}
//               className="mr-2"
//             />
//             Completed
//           </label>
//           <div className="flex mt-2">
//             <label className="flex items-center mr-4">
//               <input
//                 type="checkbox"
//                 checked={milestone.showOnPortfolio}
//                 onChange={(e) => handleUpdateMilestone(index, "showOnPortfolio", e.target.checked)}
//                 className="mr-2"
//               />
//               Show on Portfolio
//             </label>
//             <label className="flex items-center">
//               <input
//                 type="checkbox"
//                 checked={milestone.showOnHomepage}
//                 onChange={(e) => handleUpdateMilestone(index, "showOnHomepage", e.target.checked)}
//                 className="mr-2"
//               />
//               Show on Homepage
//             </label>
//           </div>
//         </div>
//       ))}
//       <button
//         onClick={handleAddMilestone}
//         className="mt-4 bg-blue-500 text-white p-2 rounded"
//       >
//         Add Milestone
//       </button>
//     </div>
//   );
// };

// export default Milestone;

// import React, { useState } from 'react';

// const Milestone = ({ milestones, setMilestones, isEditable }) => {
//   const [newMilestone, setNewMilestone] = useState({
//     name: '',
//     description: '',
//     deadline: '',
//     status: 'Not Started',
//     completed: false,
//     showOnPortfolio: false,
//     showOnHomepage: false,
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewMilestone((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleAddMilestone = () => {
//     setMilestones((prev) => [...prev, newMilestone]);
//     setNewMilestone({
//       name: '',
//       description: '',
//       deadline: '',
//       status: 'Not Started',
//       completed: false,
//       showOnPortfolio: false,
//       showOnHomepage: false,
//     });
//   };

//   const handleToggle = (index, field) => {
//     const updatedMilestones = [...milestones];
//     updatedMilestones[index][field] = !updatedMilestones[index][field];
//     setMilestones(updatedMilestones);
//   };

//   return (
//     <div className="space-y-4">
//       {milestones.map((milestone, index) => (
//         <div
//           key={index}
//           className="border p-4 rounded-lg shadow-sm bg-white flex flex-col space-y-2"
//         >
//           <div className="flex justify-between items-center">
//             <h3 className="text-lg font-semibold">{milestone.name}</h3>
//             <span
//               className={`${
//                 milestone.completed ? 'bg-green-500' : 'bg-yellow-500'
//               } text-white px-3 py-1 rounded-full text-sm`}
//             >
//               {milestone.status}
//             </span>
//           </div>
//           <p className="text-sm text-gray-700">{milestone.description}</p>
//           <p className="text-sm text-gray-500">
//             Deadline: {new Date(milestone.deadline).toLocaleDateString()}
//           </p>
//           <div className="flex space-x-2">
//             <button
//               className={`${
//                 milestone.showOnPortfolio ? 'bg-blue-500' : 'bg-gray-300'
//               } text-white px-3 py-1 rounded-lg`}
//               onClick={() => handleToggle(index, 'showOnPortfolio')}
//               disabled={!isEditable}
//             >
//               Portfolio
//             </button>
//             <button
//               className={`${
//                 milestone.showOnHomepage ? 'bg-blue-500' : 'bg-gray-300'
//               } text-white px-3 py-1 rounded-lg`}
//               onClick={() => handleToggle(index, 'showOnHomepage')}
//               disabled={!isEditable}
//             >
//               Homepage
//             </button>
//             <button
//               className={`${
//                 milestone.completed ? 'bg-green-500' : 'bg-red-500'
//               } text-white px-3 py-1 rounded-lg`}
//               onClick={() => handleToggle(index, 'completed')}
//               disabled={!isEditable}
//             >
//               {milestone.completed ? 'Completed' : 'Incomplete'}
//             </button>
//           </div>
//         </div>
//       ))}

//       {isEditable && (
//         <div className="border p-4 rounded-lg shadow-sm bg-white space-y-4">
//           <input
//             type="text"
//             name="name"
//             placeholder="Milestone Name"
//             value={newMilestone.name}
//             onChange={handleInputChange}
//             className="border px-3 py-2 rounded-lg w-full"
//             required
//           />
//           <textarea
//             name="description"
//             placeholder="Description"
//             value={newMilestone.description}
//             onChange={handleInputChange}
//             className="border px-3 py-2 rounded-lg w-full"
//           ></textarea>
//           <input
//             type="date"
//             name="deadline"
//             value={newMilestone.deadline}
//             onChange={handleInputChange}
//             className="border px-3 py-2 rounded-lg w-full"
//             required
//           />
//           <select
//             name="status"
//             value={newMilestone.status}
//             onChange={handleInputChange}
//             className="border px-3 py-2 rounded-lg w-full"
//           >
//             <option value="Not Started">Not Started</option>
//             <option value="In Progress">In Progress</option>
//             <option value="Completed">Completed</option>
//             <option value="Delayed">Delayed</option>
//           </select>
//           <button
//             type="button"
//             onClick={handleAddMilestone}
//             className="bg-blue-500 text-white px-4 py-2 rounded-lg"
//           >
//             Add Milestone
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Milestone;
