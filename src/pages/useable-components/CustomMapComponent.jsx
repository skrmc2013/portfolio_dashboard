import React, { useState } from 'react';

const CustomMapComponent = ({ formData, handleChange, handleAddLocation, isFetchingData }) => {
    const [error, setError] = useState('');

    const handleAddLocationWithValidation = () => {
        const newLocationTrimmed = formData.newLocation.trim().toLowerCase();

        if (newLocationTrimmed) {
            if (formData.displayLocations[newLocationTrimmed]) {
                setError('Location already exists!');
                return;
            }
            handleAddLocation(newLocationTrimmed);
            setError('');  // Clear any existing error
        } else {
            setError('Please enter a valid location name.');
        }
    };

    return (
        <div className='mt-5 flex flex-col gap-3'>
            <div className='w-full sm:col-span-4'>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                    Display Locations
                    <span className="ml-1 text-gray-500 text-xs">(Select where the item should be displayed)</span>
                </label>
                <div className='mt-2'>
                    <div className='flex flex-col gap-2'>
                        {Object.keys(formData.displayLocations).map(location => (
                            <div key={location} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name={`displayLocations.${location}`}
                                    checked={formData.displayLocations[location]}
                                    onChange={handleChange}
                                    disabled={isFetchingData}
                                    className="form-checkbox h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                    id={`checkbox-${location}`}
                                />
                                <label htmlFor={`checkbox-${location}`} className="text-sm text-gray-700">
                                    {location.charAt(0).toUpperCase() + location.slice(1)}
                                </label>
                            </div>
                        ))}
                        <div className="mt-3 flex items-center gap-2">
                            <input
                                type="text"
                                name="newLocation"
                                value={formData.newLocation}
                                onChange={handleChange}
                                placeholder="Add new location"
                                disabled={isFetchingData}
                                className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            <button 
                                type="button" 
                                onClick={handleAddLocationWithValidation} 
                                disabled={isFetchingData || !formData.newLocation.trim()}
                                className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 transition ease-in-out duration-150"
                            >
                                Add Location
                            </button>
                        </div>
                        {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomMapComponent;
