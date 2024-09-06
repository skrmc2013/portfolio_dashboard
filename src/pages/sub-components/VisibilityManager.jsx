import React, { useState, useEffect } from 'react';

function VisibilityManager({ onVisibilityUpdate }) {
  const [visibilityEntries, setVisibilityEntries] = useState([]);
  const [newVisibility, setNewVisibility] = useState({ name: '', value: false });

  useEffect(() => {
    // Ensure visibilityEntries is always an array before passing to parent
    if (Array.isArray(visibilityEntries)) {
      onVisibilityUpdate(visibilityEntries);
    }
  }, [visibilityEntries, onVisibilityUpdate]);

  const handleDeleteVisibility = (index) => {
    const updatedEntries = visibilityEntries.filter((_, i) => i !== index);
    setVisibilityEntries(updatedEntries);
  };

  const handleUpdateVisibility = (index, newName, newValue) => {
    const updatedEntries = visibilityEntries.map((entry, i) =>
      i === index ? { name: newName, value: newValue } : entry
    );
    setVisibilityEntries(updatedEntries);
  };

  const handleAddVisibility = () => {
    if (newVisibility.name.trim()) {
      const updatedEntries = [...visibilityEntries, { ...newVisibility }];
      setVisibilityEntries(updatedEntries);
      setNewVisibility({ name: '', value: false });
    }
  };

  return (
    <div>
      <h3>Manage Visibility</h3>
      {Array.isArray(visibilityEntries) && visibilityEntries.length > 0 ? (
        visibilityEntries.map((entry, index) => (
          <div key={index}>
            <input
              type="text"
              value={entry.name}
              onChange={(e) => handleUpdateVisibility(index, e.target.value, entry.value)}
            />
            <input
              type="checkbox"
              checked={entry.value}
              onChange={(e) => handleUpdateVisibility(index, entry.name, e.target.checked)}
            />
            <button onClick={() => handleDeleteVisibility(index)}>Delete</button>
          </div>
        ))
      ) : (
        <p>No visibility entries</p>
      )}
      <input
        type="text"
        placeholder="Visibility Name"
        value={newVisibility.name}
        onChange={(e) => setNewVisibility({ ...newVisibility, name: e.target.value })}
      />
      <input
        type="checkbox"
        checked={newVisibility.value}
        onChange={(e) => setNewVisibility({ ...newVisibility, value: e.target.checked })}
      />
      <button onClick={handleAddVisibility}>Add Visibility</button>
    </div>
  );
}

export default VisibilityManager;
