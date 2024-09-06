import { Label } from '@/components/ui/label';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CustomTextEditor from '../useable-components/CustomTextEditor';
import SeoForm from '../useable-components/SeoForm';
import Milestone from '../useable-components/Milestone';
import AddKeyword from '../useable-components/AddKeyword';
import RolesSelected from '../useable-components/RolesSelected';
import { Image } from 'lucide-react';
import { toast } from 'react-toastify';
import SpecialLoadingButton from './SpecialLoadingButton';
import { Button } from '@/components/ui/button';
import { addProject, clearAllProjectErrors, getAllProject } from '@/store/slices/projectSlice';
import StatusButton from '../useable-components/StatusButton';
import FileUpload from '../useable-components/FileUpload';

const AddProject = () => {
  const { loading, error, message } = useSelector(state => state.project);
  const { teamMembers } = useSelector(state => state.teammember);
  const { categories } = useSelector(state => state.category);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [summary, setSummary] = useState("");
  const [objectives, setObjectives] = useState([]);
  const [features, setFeatures] = useState([]);
  // const [metaTitle, setMetaTitle] = useState("");
  // const [metaDescription, setMetaDescription] = useState("");
  // const [keywords, setKeywords] = useState([]);
  const [seo, setSeo] = useState([]);
  // const [showOnHomepage, setShowOnHomepage] = useState(true);
  // const [showOnPortfolio, setShowOnPortfolio] = useState(true);
  // const [showOnCompanySite, setShowOnCompanySite] = useState(true);
  const [deployed, setDeployed] = useState(false);
  // const [bannerType, setBannerType] = useState("");
  // const [bannerPublicId, setBannerPublicId] = useState("");
  // const [bannerUrl, setBannerUrl] = useState("");
  const [projectBanner, setProjectBanner] = useState("");
  const [technologies, setTechnologies] = useState([]);
  // const [progressPercentage, setProgressPercentage] = useState(0);
  // const [progressStatus, setProgressStatus] = useState("Not Started");
  const [tags, setTags] = useState([]);
  const [teamMember, setTeamMember] = useState([]);
  // const [initialBudget, setInitialBudget] = useState(0);
  // const [spentBudget, setSpentBudget] = useState(0);
  // const [startDate, setStartDate] = useState("");
  // const [endDate, setEndDate] = useState("");
  const [milestones, setMilestones] = useState([]);
  const [isEditable, setIsEditable] = useState(true);
  const [svgPreview, setSvgPreview] = useState("");
  const [progress, setProgress] = useState({
    percentage: 0,
    status: 'Not Started',
  });
  const [budget, setBudget] = useState({
    initial: 0,
    spent: 0,
  });

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [githubLink,setGithubLink] = useState("https://www.github.com/");
  const [projectLink,setProjectLink] = useState("https://");
  // const [displaySettings, setDisplaySettings] = useState({
  //   visibility: {
  //     showOnHomepage: true,
  //     showOnPortfolio: true,
  //     showOnCompanySite: true,

  //   },
  //   deployed_Status: {

  //     deployed: false,
  //   },
  // });
  const [visibility, setVisibility] = useState({
    showOnHomepage: true,
    showOnPortfolio: true,
    showOnCompanySite: true,
  });

  // const [deployed, setDeployed] = useState(false);
  const handleMilestonesChange = (updatedMilestones) => { //2nd update part
    setMilestones(updatedMilestones);
  };


  const handleSvg = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProjectBanner(file);
      console.log("Project Banner data: ", projectBanner);
      // setType(file.type);
      setSvgPreview(reader.result);
    };
  }
  const handleSelectedItemsChange = (items) => {
    setTags(items);
    // console.log('Updated skills:', skills);
    console.log('Updated Keywords:', items);
  };


  const memberOptions = teamMembers.map(member => ({
    label: member.name,
    value: member._id
  }));
  const handleMemberSelect = (selectedValues) => {
    setTeamMember(selectedValues);
    // Call API or function to save projects to DB
    console.log('Selected members:', selectedValues);
  };


  const handleProgressChange = (e) => {
    const { name, value } = e.target;
    setProgress((prev) => ({ ...prev, [name]: value }));
  };

  const handleBudgetChange = (e) => {
    const { name, value } = e.target;
    setBudget((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    if (name === 'startDate') {
      setStartDate(new Date(value));
    } else if (name === 'endDate') {
      setEndDate(new Date(value));
    }
  };
  // Toggle function for visibility and deployed statuses
  const handleToggleVisibility = (field) => {
    setVisibility((prevVisibility) => ({
      ...prevVisibility,
      [field]: !prevVisibility[field],
    }));
  };

  const handleToggleDeployed = () => {
    setDeployed((prevDeployed) => !prevDeployed);
  };
  const handleFileUpload = (files) => {
    // Store or process the files as needed
    if (files.length > 0) {
      setProjectBanner(files[0]); // Store the entire file object
      console.log('Files uploaded:', files);
    } else {
      console.error('No file uploaded.');
    }
  };
  const handleSeoFormSubmit = (data) => {
    setSeo(data);
  }
  console.log("objectives are :", objectives);
  console.log("description is :", description);
  console.log("features", features);
  console.log("technologie", technologies);
  console.log("milestones with json.stringify:", JSON.stringify(milestones));
  console.log("Progress:", progress);
  console.log("Budget:", budget);
  console.log("Visibility:", visibility);
  console.log("SEO:", seo);
  console.log("Start Date:", startDate);
  console.log("End Date:", endDate);
  console.log("Initial Budget:", budget.initial);
  console.log("Milestones:", JSON.stringify(milestones));
  const startDateISO = new Date(startDate).toISOString();
const endDateISO = new Date(endDate).toISOString();

  const handleAddProject = (e) => {
    e.preventDefault();

    // Validate progress
    if (progress.percentage < 0 || progress.percentage > 100) {
      alert("Progress percentage must be between 0 and 100");
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("objectives", objectives);
    formData.append("description", description);
    formData.append("summary", summary);
    formData.append("features", features);
    formData.append("seo", JSON.stringify(seo));
    // formData.append("seo", seo);
    formData.append('milestones', JSON.stringify(milestones));
    formData.append("projectBanner", projectBanner);
    formData.append("tags", tags);
    formData.append("technologies", technologies);
    formData.append("teamMembers", teamMember);
    formData.append('progress', JSON.stringify(progress));
    // formData.append('progress', progress);
    formData.append('budget', JSON.stringify(budget));
    // formData.append('budget', budget);
    // formData.append('startDate', startDate.toISOString());
    // formData.append('endDate', endDate.toISOString());
    formData.append('visibility', JSON.stringify(visibility));
    // formData.append('visibility', visibility);
    formData.append('deployed', deployed);
    formData.append('startDate', startDateISO);
formData.append('endDate', endDateISO);
formData.append("githubLink", githubLink);
formData.append("projectLink", projectLink);
    dispatch(addProject(formData));
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
  }
  
  }
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllProjectErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(clearAllProjectErrors());
      dispatch(getAllProject());
    }
  }, [error, message, dispatch]);

  return (
    <>
      <div className='flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14' >
        <div className='w-[100%] px-5 md:w-[650px]'>
          {/* <form onSubmit={handleAddProject} className='w-[100%] px-5 md:w-[650px]'> */}
          <div className='space-y-12' >
            <div className='border-b border-gray-900/10 pb-12' >
              <h2 className='font-semibold leading-7 text-gray-900 text-3xl text-center' >
                Add New Project
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

                    Summary
                  </Label>
                  <div className='mt-2'>
                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                      <input type='text' placeholder='Summary'
                        value={summary} onChange={(e) => setSummary(e.target.value)}
                        className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className='mt-5 flex flex-col gap-3' >
                <div className='w-full sm:col-span-4' >
                  <Label className="block text-sm font-medium leading-6 text-gray-900" >

                    Objectives
                  </Label>
                  <div className='mt-2'>
                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                      <CustomTextEditor value={objectives} onChange={setObjectives} />
                    </div>
                  </div>
                </div>

              </div>
              <div className='mt-5 flex flex-col gap-3' >
                <div className='w-full sm:col-span-4' >
                  <Label className="block text-sm font-medium leading-6 text-gray-900" >

                    Features
                  </Label>
                  <div className='mt-2'>
                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                      <CustomTextEditor value={features} onChange={setFeatures} />
                    </div>
                  </div>
                </div>
              </div>

              

              <div className='mt-5 flex flex-col gap-3' >
                <div className='w-full sm:col-span-4' >
                  <Label className="block text-sm font-medium leading-6 text-gray-900" >
                    Technologies
                  </Label>
                  <div className='mt-2'>
                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                      <CustomTextEditor value={technologies} onChange={setTechnologies} />
                    </div>
                  </div>
                </div>
              </div>

              <div className='mt-5 flex flex-col gap-3' >
                <div className='w-full sm:col-span-4' >
                  <Label className="block text-sm font-medium leading-6 text-gray-900" >
                    Tags
                  </Label>
                  <div className='mt-2'>
                    {/* <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'> */}
                      <AddKeyword onSelectedItemsChange={handleSelectedItemsChange} placeholderData={"Enter Tags ..."} errorMessage={"Duplicate Tags"} />
                    {/* </div> */}
                  </div>
                </div>
              </div>

              <div className='mt-5 flex flex-col gap-3' >
                <div className='w-full sm:col-span-4' >
                  <Label className="block text-sm font-medium leading-6 text-gray-900" >

                    Milestones
                  </Label>
                  <div className='mt-2'>
                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                      {/* <Milestone milestones={milestones} setMilestones={setMilestones} isEditable={isEditable} />  */} {/* 1st update */}
                      <Milestone onMilestonesChange={handleMilestonesChange} />
                    </div>
                  </div>
                </div>
              </div>

              <div className='mt-5 flex flex-col gap-3' >
                <div className='w-full sm:col-span-4' >
                  <Label className="block text-sm font-medium leading-6 text-gray-900" >

                    SEO
                  </Label>
                  <div className='mt-2'>
                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset outline-none'>
                      <SeoForm
                        onSubmit={handleSeoFormSubmit}
                        // defaultData={formData}
                        isDisabled={false} // Set to true to disable form fields
                        useLibraryStyling={false} />
                    </div>
                  </div>
                </div>
              </div>

              <div className='mt-5 flex flex-col gap-3' >
                <div className='w-full sm:col-span-4' >
                  {/* <Label className="block text-sm font-medium leading-6 text-gray-900" >
                Tags
                  </Label> */}
                  <div className='mt-2'>
                    {/* <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'> */}
                      <RolesSelected
                        label="Select Team Members"
                        options={memberOptions}
                        onSelect={handleMemberSelect}
                      />
                    {/* </div> */}
                  </div>
                </div>
              </div>

              <div className='mt-5 flex flex-col gap-3' >
                <div className='w-full sm:col-span-4' >
                  <Label className="block text-sm font-medium leading-6 text-gray-900" >
                Github Link
                  </Label>
                  <div className='mt-2'>
                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                    <input type='text' placeholder='Name'
                        value={githubLink} onChange={(e) => setGithubLink(e.target.value)}
                        className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className='mt-5 flex flex-col gap-3' >
                <div className='w-full sm:col-span-4' >
                  <Label className="block text-sm font-medium leading-6 text-gray-900" >
                Project Link
                  </Label>
                  <div className='mt-2'>
                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                    <input type='text' placeholder='Name'
                        value={projectLink} onChange={(e) => setProjectLink(e.target.value)}
                        className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                      />
                    </div>
                  </div>
                </div>
              </div>


              {/* <div className='mt-5 flex flex-col gap-3' >
                <div className="col-span-full">
                  <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                    Project Banner
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      {svgPreview ? (<img src={svgPreview && svgPreview} className='className="mx-auto h-12 w-12 text-gray-300' viewBox="0 0 24 24" alt='Skill SVG' />) : (<Image className='className="mx-auto h-12 w-12 text-gray-300' aria-hidden="true" />)
                      }
                     
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
              </div> */}
              

              <div className='mt-5 flex flex-col gap-3' >
                <h2>Progress</h2>
                <div className='w-full sm:col-span-4' >
                  <Label className="block text-sm font-medium leading-6 text-gray-900" >
                    Percentage

                  </Label>
                  <div className='mt-2'>
                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset '>
                      <input
                        type="number"
                        name="percentage"
                        value={progress.percentage}
                        min="0"
                        max="100"
                        onChange={handleProgressChange}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div className='w-full sm:col-span-4' >
                  <Label className="block text-sm font-medium leading-6 text-gray-900" >
                    Status

                  </Label>
                  <div className='mt-2'>
                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset '>
                      <select
                        name="status"
                        value={progress.status}
                        onChange={handleProgressChange}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      >
                        <option value="Not Started">Not Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="On Hold">On Hold</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className='mt-5 flex flex-col gap-3' >
                <h2>Budget</h2>
                <div className='w-full sm:col-span-4' >
                  <Label className="block text-sm font-medium leading-6 text-gray-900" >
                    Initial Budget

                  </Label>
                  <div className='mt-2'>
                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset '>
                      <input
                        type="number"
                        name="initial"
                        value={budget.initial}
                        onChange={handleBudgetChange}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div className='w-full sm:col-span-4' >
                  <Label className="block text-sm font-medium leading-6 text-gray-900" >
                    Spent Budget

                  </Label>
                  <div className='mt-2'>
                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset '>
                      <input
                        type="number"
                        name="spent"
                        value={budget.spent}
                        onChange={handleBudgetChange}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='mt-5 flex flex-col gap-3' >
                <h2>Dates</h2>
                <div className='w-full sm:col-span-4' >
                  <Label className="block text-sm font-medium leading-6 text-gray-900" >
                    Start Date

                  </Label>
                  <div className='mt-2'>
                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset '>
                      <input
                        type="date"
                        name="startDate"
                        value={startDate.toISOString().substr(0, 10)}
                        onChange={handleDateChange}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                <div className='w-full sm:col-span-4' >
                  <Label className="block text-sm font-medium leading-6 text-gray-900" >
                    End Date
                  </Label>
                  <div className='mt-2'>
                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset '>
                      <input
                        type="date"
                        name="endDate"
                        value={endDate.toISOString().substr(0, 10)}
                        onChange={handleDateChange}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />

                    </div>
                  </div>
                </div>


              </div>
              <FileUpload onFileUpload={handleFileUpload}/>
              <div className='mt-5 flex flex-col gap-3' >
                <div className='w-full sm:col-span-4' >
                  <div className="p-4 bg-gray-100 shadow-md rounded">
                    <div className="flex space-x-2">
                      <StatusButton
                        status={visibility.showOnHomepage}
                        label="Homepage"
                        onClick={() => handleToggleVisibility('showOnHomepage')}
                        isEditable={isEditable}
                        colorActive="bg-green-500"
                        colorInactive="bg-gray-300"
                      />

                      <StatusButton
                        status={visibility.showOnPortfolio}
                        label="Portfolio"
                        onClick={() => handleToggleVisibility('showOnPortfolio')}
                        isEditable={isEditable}
                        colorActive="bg-blue-500"
                        colorInactive="bg-gray-300"
                      />

                      <StatusButton
                        status={visibility.showOnCompanySite}
                        label="Company Site"
                        onClick={() => handleToggleVisibility('showOnCompanySite')}
                        isEditable={isEditable}
                        colorActive="bg-purple-500"
                        colorInactive="bg-gray-300"
                      />

                      <StatusButton
                        status={deployed}
                        label={deployed ? 'Deployed' : 'Not Deployed'}
                        onClick={handleToggleDeployed}
                        isEditable={isEditable}
                        colorActive="bg-orange-500"
                        colorInactive="bg-gray-300"
                      />

                    </div>

                  </div>
                </div>
              </div>

            </div>

          </div>
          {loading ? (<SpecialLoadingButton />) : (
            <Button className="w-full" onClick={handleAddProject}>
              Add Project
            </Button>
          )}
          {/* </form> */}
        </div>
      </div>


    </>
  )
}

export default AddProject