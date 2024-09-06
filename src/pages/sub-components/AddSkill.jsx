import { clearAllIconsErrors } from '@/store/slices/iconsSlice';
import { addSkill } from '@/store/slices/skillSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SpecialLoadingButton from './SpecialLoadingButton';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckIcon, ChevronsUpDown, ChevronsUpDownIcon, Image } from 'lucide-react';
import KeywordInput from '../useable-components/KeywordInput.jsx';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
// import KeywordInput from '../useable-components/keywordInput';
// import {

  // CheckIcon, 
  // ChevronUpDownIcon
// } from '@heroicons/react/20/solid'
import MultiSelectComponent from '../useable-components/MultiSelectComponent';
import AddKeyword from '../useable-components/AddKeyword';

const AddSkill = () => {


  const [name, setName] = useState("");
  const [proficiencyLevel, setProficiencyLevel] = useState("");
  const [experience, setExperience] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [showOnResume, setShowOnResume] = useState("");
  const [showOnWebsite, setShowOnWebsite] = useState("");
  const [showOnPortfolio, setShowOnPortfolio] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [svg, setSvg] = useState("");
  const [svgPreview, setSvgPreview] = useState("");
  const [selected, setSelected] = useState("");
  // const [type, setType] = useState("");

  const [displayLocations, setDisplayLocations] = useState({
    showOnPortfolio: true,
    showOnResume: true,
    showOnWebsite: false,

  });

  const handleSwitchChange = (key, value) => {
    setDisplayLocations(prev => ({ ...prev, [key]: value }));
  };


  const handleSvg = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setSvg(file);
      // setType(file.type);
      setSvgPreview(reader.result);
    };
  }


  const { skills, error, loading, message } = useSelector(state => state.skill);
  const dispatch = useDispatch();
  const { icons } = useSelector(state => state.icon);

  const handleKeywordsChange = (newKeywords) => {
    setKeywords(newKeywords);
    console.log('Updated Keywords:', newKeywords);
  };

  // const handleKeywordsChange = (keywords) => {
  //   console.log('Updated Keywords:', keywords);
  // };

  const handleSelectedItemsChange = (items) => {
    setKeywords(items);
    // console.log('Updated skills:', skills);
    console.log('Updated Keywords:', items);
  };

  const [selectedId, setSelectedId] = useState(icons && icons.length > 0 ? icons[0]._id : null);

  // Find the selected icon object based on the selected ID
  const selectedIcon = icons.find((icon) => icon._id === selectedId);



  const handleAddSkill = (e) => {

    e.preventDefault();
    // console.log("selected icon is :", selected);
    console.log("selected icon is :", selectedId);
    const formData = new FormData();
    formData.append("name", name);
    // formData.append("type", type);
    formData.append("proficiencyLevel", proficiencyLevel);
    formData.append("experience", experience);
    formData.append("category", category);
    formData.append("showOnPortfolio", displayLocations.showOnPortfolio);
    formData.append("showOnResume", displayLocations.showOnResume);
    formData.append("showOnWebsite", displayLocations.showOnWebsite);
    formData.append("description", description);
    formData.append("metaTitle", metaTitle);
    formData.append("metaDescription", metaDescription);
    // formData.append("keywords", keywords);
    formData.append("keywords", JSON.stringify(keywords));
    formData.append("icon", selectedId);
    // formData.append("icon", icon);
    formData.append("svg", svg);

    dispatch(addSkill(formData));

  }
  useEffect(() => {
    if (error) {
      toast.error(error);

    }
    if (message) {
      toast.success(message);
      // setName("");
      // setProficiencyLevel("Proficiency Level");
      // setExperience("");
      // setCategory("Skill Category");
      // setDescription("");
      // setIcon("");
      // setShowOnResume(false);
      // setShowOnWebsite(false);
      // setShowOnPortfolio(false);
      // setMetaTitle("");
      // setMetaDescription("");
      // setKeywords([]);
      // setSvg("");
      // setSvgPreview("");
      // setSelected("");
      dispatch(clearAllIconsErrors());

    }
  }, [error, message, dispatch])
  return (
    <>
      <div className='flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14' >
        <form onSubmit={handleAddSkill} className='w-[100%] px-5 md:w-[650px]'>
          <div className='space-y-12' >
            <div className='border-b border-gray-900/10 pb-12' >
              <h2 className='font-semibold leading-7 text-gray-900 text-3xl text-center' >
                Add New Skill
              </h2>

              <div className='mt-5 flex flex-col gap-3' >
                <div className='w-full sm:col-span-4' >
                  <Label className="block text-sm font-medium leading-6 text-gray-900" >

                    Name
                  </Label>
                  <div className='mt-2'>
                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                      <input type='text' placeholder='Name'
                        value={name} onChange={(e) => setName(e.target.value)}
                        className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className='mt-5 flex flex-col gap-3' >
                <div className='w-full sm:col-span-4' >
                  <Label className="block text-sm font-medium leading-6 text-gray-900" >
                    Description
                  </Label>
                  <div className='mt-2'>
                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                      <input type='text' placeholder='Description'
                        value={description} onChange={(e) => setDescription(e.target.value)}
                        className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='mt-5 flex flex-col gap-3' >
                <div className='w-full sm:col-span-4' >
                  <Label className="block text-sm font-medium leading-6 text-gray-900" >
                    SEO Title
                  </Label>
                  <div className='mt-2'>
                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                      <input type='text' placeholder='Meta Title'
                        value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)}
                        className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className='mt-5 flex flex-col gap-3' >
                <div className='w-full sm:col-span-4' >
                  <Label className="block text-sm font-medium leading-6 text-gray-900" >
                    SEO Description
                  </Label>
                  <div className='mt-2'>
                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                      <input type='text' placeholder='SEO Description'
                        value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)}
                        className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className='mt-5 flex flex-col gap-3'>
                <div className='w-full sm:col-span-4'>
                  <Label className="block text-sm font-medium leading-6 text-gray-900">
                    Keywords
                  </Label>
                  {/* <KeywordInput onKeywordsChange={handleKeywordsChange} placeholderData={"Write Keywords and press enter"}  */}
                  {/* icon={<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="black" stroke-dasharray="16" stroke-dashoffset="16" stroke-linecap="round" stroke-width="2"><path d="M7 7L17 17"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="16;0"/></path><path d="M17 7L7 17"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.4s" dur="0.4s" values="16;0"/></path></g></svg>} */}
                  {/* icon={<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g stroke="#1a1919" stroke-linecap="round" stroke-width="2"><path fill="#ce3b3b" fill-opacity="0" stroke-dasharray="60" stroke-dashoffset="60" d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="60;0" /><animate fill="freeze" attributeName="fill-opacity" begin="0.8s" dur="0.15s" values="0;0.3" /></path><path fill="none" stroke-dasharray="8" stroke-dashoffset="8" d="M12 12L16 16M12 12L8 8M12 12L8 16M12 12L16 8"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="8;0" /></path></g></svg>} 
                   /> */}

                  {/* <MultiSelectComponent  onSelectedItemsChange={handleSelectedItemsChange} placeholderData={"Enter Skills you like..."}/> */}
                  <AddKeyword onSelectedItemsChange={handleSelectedItemsChange} placeholderData={"Enter Skills you like..."} errorMessage={"Duplicate Skills"} />
                </div>
              </div>
              {/* <div className='mt-5 flex flex-col gap-3' >
                <div className='w-full sm:col-span-4' >
                  <Label className="block text-sm font-medium leading-6 text-gray-900" >
                    Keyword inputs
                  </Label>
                  <div className='mt-2'>
                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                      <input type='text' placeholder='Meta Title'
                        value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)}
                        className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                      />
                    </div>

                  </div>
                  <KeywordInput />
                </div>
              </div> */}

              <div className='mt-5 flex flex-col gap-3' >
                <div className='w-full sm:col-span-4' >
                  <Label className="block text-sm font-medium leading-6 text-gray-900" >

                    Experience
                  </Label>
                  <div className='mt-2'>
                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                      <input type='text' placeholder='Experience : 2 years'
                        value={experience} onChange={(e) => setExperience(e.target.value)}
                        className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className='mt-5 flex flex-col gap-3' >
                <div className='w-full sm:col-span-4' >
                  <Select onValueChange={(value) => setProficiencyLevel(value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Proficiency Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel></SelectLabel>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                        <SelectItem value="Expert">Expert</SelectItem>

                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className='mt-5 flex flex-col gap-3' >
                <div className='w-full sm:col-span-4' >
                  <Select onValueChange={(value) => setCategory(value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel></SelectLabel>
                        <SelectItem value="Programming Languages">Programming Languages</SelectItem>
                        <SelectItem value="Frameworks">Frameworks</SelectItem>
                        <SelectItem value="Tools">Tools</SelectItem>
                        <SelectItem value="Databases">Databases</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>

                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* {
                icons && icons.length > 0 ? (
                  // icons.map(element => (
                  <Listbox value={selected} onChange={setSelected}>
                    <Label className="block text-sm font-medium leading-6 text-gray-900">Icons Library</Label>
                    <div className="relative mt-2">
                      <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                        <span className="flex items-center">
                          <img alt="" src={selected.avatar} className="h-5 w-5 flex-shrink-0 rounded-full" />
                          <span className="ml-3 block truncate">{selected.name}</span>
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                          <ChevronsUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                        </span>
                      </ListboxButton>

                      <ListboxOptions
                        transition
                        className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                      >
                        {icons.map((element) => (
                          <ListboxOption
                            key={element._id}
                            value={element._id}
                            className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                          >
                            <div className="flex items-center">
                              <img alt="icon n't found" src={""} className="h-5 w-5 flex-shrink-0 rounded-full" />
                              <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                                {element.name}
                              </span>
                            </div>

                            <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                              <CheckIcon aria-hidden="true" className="h-5 w-5" />
                            </span>
                          </ListboxOption>
                        ))}
                      </ListboxOptions>
                    </div>
                  </Listbox>
                  // ))
                ) : "66bddacae87d7c482f33003e"
              } */}
              <div>
                {icons && icons.length > 0 ? (
                  <Listbox value={selectedId} onChange={setSelectedId}>
                    <Label className="block text-sm font-medium leading-6 text-gray-900">
                      Icons Library
                    </Label>
                    <div className="relative mt-2">
                      <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                        <span className="flex items-center">
                          {selectedIcon && (
                            <>
                              <img
                                alt={selectedIcon.name || 'Icon'}
                                src={selectedIcon.avatar || 'default-image-path.jpg'}
                                className="h-5 w-5 flex-shrink-0 rounded-full"
                              />
                              <span className="ml-3 block truncate">{selectedIcon.name}</span>
                            </>
                          )}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                          <ChevronsUpDown aria-hidden="true" className="h-5 w-5 text-gray-400" />
                        </span>
                      </ListboxButton>

                      <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {icons.map((element) => (
                          <ListboxOption
                            key={element._id}
                            value={element._id}
                            className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900"
                          >
                            <div className="flex items-center">
                              <img
                                alt={element.name || 'Icon'}
                                src={element.avatar || 'default-image-path.jpg'}
                                className="h-5 w-5 flex-shrink-0 rounded-full"
                              />
                              <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                                {element.name}
                              </span>
                            </div>

                            {selectedId === element._id && (
                              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
                                <CheckIcon aria-hidden="true" className="h-5 w-5" />
                              </span>
                            )}
                          </ListboxOption>
                        ))}
                      </ListboxOptions>
                    </div>
                  </Listbox>
                ) : ("66bddacae87d7c482f33003e"
                  // <p>No icons available.</p>
                )}
              </div>
              <div className='mt-5 flex flex-col gap-3' >
                <div className='w-full sm:col-span-4' >
                  <Card>
                    <CardHeader>
                      <CardTitle>Display Locations</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                      {Object.keys(displayLocations).map((location) => (
                        <div className="flex items-center space-x-4" key={location}>
                          <Label>{location.charAt(0).toUpperCase() + location.slice(1)}</Label>
                          <Switch
                            checked={displayLocations[location]}
                            onCheckedChange={(value) => handleSwitchChange(location, value)}
                          />
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                  Skill SVG
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    {svgPreview ? (<img src={svgPreview && svgPreview} className='className="mx-auto h-12 w-12 text-gray-300' viewBox="0 0 24 24" alt='Skill SVG' />) : (<Image className='className="mx-auto h-12 w-12 text-gray-300' aria-hidden="true" />)
                    }
                    {/* <PhotoIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" /> */}
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input id="file-upload" onChange={handleSvg} name="file-upload" type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 2MB</p>
                  </div>
                </div>
              </div>

              <div className='mt-5 flex flex-col gap-3' >
                <div className='w-full sm:col-span-4' >

                  {
                    loading ? (<SpecialLoadingButton />) : (<Button className="w-full"  >
                      Add Skill
                    </Button>)
                  }
                </div>
              </div>





            </div>
          </div>
        </form>
      </div>




    </>
  )
}

export default AddSkill