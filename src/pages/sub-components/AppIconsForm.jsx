// src/components/IconForm.js
import { addAppicon, clearAllAppiconsErrors, getAllAppicons } from '@/store/slices/appSlice';
import React, { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux' // Import your Redux action
import { useDispatch, useSelector } from 'react-redux';
import FileUpload from '../useable-components/FileUpload';
import { toast } from 'react-toastify';
import { Label } from '@/components/ui/label';
import SpecialLoadingButton from './SpecialLoadingButton';
import { Button } from '@/components/ui/button';
import CustomMapComponent from '../useable-components/CustomMapComponent';

const AppIconForm = () => {
  const { loading, error, message } = useSelector(state => state.app);

  const [formData, setFormData] = useState({
    library: 'react-icons',
    title: 'ss',
    svg: '',
    iconType: '',
    faIcon: '',
    faStyleColor: '',
    faStyleSize: '',
    customClassName: '',
    customPath: '',
    displayLocations: {
      homepage: true,
      skillsSection: true,
      portfolio: true,
      services: true,
      tools: true,
    },
    newLocation: ''
  });
  const handleFileUpload = (files) => {
    if (files.length > 0) {
      setFormData(prevData => ({
        ...prevData,
        svg: files[0] // Make sure this is the correct file object.
      }));
      console.log('Files uploaded:', files);
    } else {
      console.error('No file uploaded.');
    }
  };
  const dispatch = useDispatch();
  const [isFetchingData, setIsFetchingData] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith('displayLocations.')) {
      const location = name.split('.')[1];
      setFormData(prevData => ({
        ...prevData,
        displayLocations: {
          ...prevData.displayLocations,
          [location]: checked
        }
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleAddLocation = () => {
    if (formData.newLocation.trim() !== '') {
      setFormData(prevData => ({
        ...prevData,
        displayLocations: {
          ...prevData.displayLocations,
          [formData.newLocation]: true
        },
        newLocation: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    // formDataToSend.append('svgType', formData.svgType);
    // formDataToSend.append('public_id', formData.public_id);
    formDataToSend.append('svg', formData.svg);
    formDataToSend.append('title', formData.title); // Ensure title is appended
    formDataToSend.append('library', formData.library);
    formDataToSend.append('iconType', formData.iconType);
    // formDataToSend.append('fa', JSON.stringify({ icon: formData.faIcon, style{color: formData.faStyleColor, faStyleSize: formData.faStyleSize }));
    // formDataToSend.append('custom', JSON.stringify({ customClassName: formData.customClassName, customPath: formData.customPath }));

    if (formData.library === 'font-awesome') {
      formDataToSend.append('fa', JSON.stringify({
        icon: formData.faIcon,
        style: {
          color: formData.faStyleColor,
          size: formData.faStyleSize
        }
      }));
    } else if (formData.library === 'custom-svg') {
      formDataToSend.append('custom', JSON.stringify({
        className: formData.customClassName,
        path: formData.customPath
      }));
    }

    formDataToSend.append('displayLocations', JSON.stringify(formData.displayLocations));

    console.log('Submitting formData:', Object.fromEntries(formDataToSend.entries()));

    // Dispatch the action to add the appicon
    dispatch(addAppicon(formDataToSend));

  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllAppiconsErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(clearAllAppiconsErrors());
      dispatch(getAllAppicons());
    }
  }, [error, message])

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14' >
        <div className='w-[100%] px-5 md:w-[650px]'>
          {/* <form onSubmit={handleAddProject} className='w-[100%] px-5 md:w-[650px]'> */}
          <div className='space-y-12' >
            <div className='border-b border-gray-900/10 pb-12' >
              <h2 className='font-semibold leading-7 text-gray-900 text-3xl text-center' >
                Add New Tool
              </h2>

              <div className='mt-5 flex flex-col gap-3' >
                <div className='w-full sm:col-span-4' >
                  <Label className="block text-sm font-medium leading-6 text-gray-900" >

                    Name
                  </Label>

                  <div className='mt-2'>
                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                      <input type="text" name="title"
                        placeholder='title'
                        value={formData.title} onChange={handleChange}
                        className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'

                      />
                    </div>
                  </div>

                </div>
              </div>

              <div className='mt-5 flex flex-col gap-3' >
                <div className='w-full sm:col-span-4' >
                  <Label className="block text-sm font-medium leading-6 text-gray-900" >

                    Library
                  </Label>

                  <div className='mt-2'>
                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                      <select name="library" value={formData.library} onChange={handleChange}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      >
                        <option value="react-icons">React Icons</option>
                        <option value="font-awesome">Font Awesome</option>
                        <option value="tailwind">Tailwind</option>
                        <option value="bootstrap">Bootstrap</option>
                        <option value="lottie">Lottie</option>
                        <option value="custom-svg">Custom SVG</option>
                      </select>
                    </div>
                  </div>

                </div>
              </div>

              <div className='mt-5 flex flex-col gap-3' >
                <div className='w-full sm:col-span-4' >
                  <Label className="block text-sm font-medium leading-6 text-gray-900" >

                    Icon Type
                  </Label>

                  <div className='mt-2'>
                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                      <input type="text" name="iconType" value={formData.iconType} onChange={handleChange} />

                    </div>
                  </div>

                </div>
              </div>
              <div className='mt-5 flex flex-col gap-3' >
                <div className='w-full sm:col-span-4' >
                  <Label className="block text-sm font-medium leading-6 text-gray-900" >

                    Font Awesome Icon
                  </Label>

                  <div className='mt-2'>
                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                      <input type="text" name="faIcon" value={formData.faIcon} onChange={handleChange} />

                    </div>
                  </div>

                </div>
              </div>
              <div className='mt-5 flex flex-col gap-3' >
                <div className='w-full sm:col-span-4' >
                  <Label className="block text-sm font-medium leading-6 text-gray-900" >

                    Font Awesome Color
                  </Label>

                  <div className='mt-2'>
                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                      <input type="color" name="faStyleColor"
                        className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                        value={formData.faStyleColor} onChange={handleChange}
                      />

                    </div>
                  </div>

                </div>
              </div>
              <div className='mt-5 flex flex-col gap-3' >
                <div className='w-full sm:col-span-4' >
                  <Label className="block text-sm font-medium leading-6 text-gray-900" >

                    Font Awesome Style Size
                  </Label>

                  <div className='mt-2'>
                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                      <input type="text" name="faStyleSize" value={formData.faStyleSize} onChange={handleChange} />

                    </div>
                  </div>

                </div>
              </div>
              <div className='mt-5 flex flex-col gap-3' >
                <div className='w-full sm:col-span-4' >
                  <Label className="block text-sm font-medium leading-6 text-gray-900" >

                    Custom CLass Name
                  </Label>

                  <div className='mt-2'>
                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                      <input type="text" name="customClassName" value={formData.customClassName} onChange={handleChange} />

                    </div>
                  </div>

                </div>
              </div>
              <div className='mt-5 flex flex-col gap-3' >
                <div className='w-full sm:col-span-4' >
                  <Label className="block text-sm font-medium leading-6 text-gray-900" >

                    Custom Path
                  </Label>

                  <div className='mt-2'>
                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                      <input type="text" name="customPath" value={formData.customPath} onChange={handleChange} />

                    </div>
                  </div>

                </div>
              </div>


              {/* <div className='mt-5 flex flex-col gap-3' >
                <div className='w-full sm:col-span-4' >
                  <Label className="block text-sm font-medium leading-6 text-gray-900" >

                    Display Locations
                  </Label>

                  <div className='mt-2'>
                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                      <div>

                        {Object.keys(formData.displayLocations).map(location => (
                          <div key={location}>
                            <label>{location.charAt(0).toUpperCase() + location.slice(1)}</label>
                            <input
                              type="checkbox"
                              name={`displayLocations.${location}`}
                              checked={formData.displayLocations[location]}
                              onChange={handleChange}
                            />
                          </div>
                        ))}
                        <div>
                          <input
                            type="text"
                            name="newLocation"
                            value={formData.newLocation}
                            onChange={handleChange}
                            placeholder="Add new location"
                          />
                          <button type="button" onClick={handleAddLocation}>Add Location</button>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div> */}
              <CustomMapComponent
                formData={formData}
                handleChange={handleChange}
                handleAddLocation={handleAddLocation}
                isFetchingData={isFetchingData}
              />
              <FileUpload onFileUpload={handleFileUpload} />

              {loading ? (<SpecialLoadingButton />) : (
                <Button className="w-full" type="submit" >
                  Add Tool
                </Button>
              )}

            </div>
          </div>
        </div>
      </div>

      {/* <button type="submit">Submit</button> */}
    </form>
  );
};

export default AppIconForm;
