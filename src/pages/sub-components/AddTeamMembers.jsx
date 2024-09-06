import React, { useEffect, useState } from 'react'
import ReusableFormSection from '../useable-components/ResuableFormSection'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input';
import { useDispatch, useSelector } from 'react-redux';
import { addTeamMember, clearAllTeamMemberErrors, getAllTeamMember } from '@/store/slices/teamMemberSlice';
import SpecialLoadingButton from './SpecialLoadingButton';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import MultiSelectDropDownComponent from '../useable-components/MultiSelectDropDownComponent';
import MultiSelect from '../useable-components/MultiSelect';
import RolesSelected from '../useable-components/RolesSelected';
import DisplaySettingsForm from '../useable-components/DisplaySettingsForm';
import SeoForm from '../useable-components/SeoForm';
import FileUpload from '../useable-components/FileUpload';
import { Image } from 'lucide-react';
import AddKeyword from '../useable-components/AddKeyword';

const AddTeamMembers = () => {
  const { loading, error, message } = useSelector(state => state.teammember);
  const { projects } = useSelector(state => state.project);
  const dispatch = useDispatch();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [skills, setSkills] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [bio, setBio] = useState("");
  const [joinedAt, setJoinedAt] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [isActive, setIsActive] = useState(true);

  const [svgPreview, setSvgPreview] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [seo, setSeo] = useState([]);
  const [displaySettings, setDisplaySettings] = useState([]);
  const [settings, setSettings] = useState({
    homepage: {
      showName: true,
      showRoles: true,
      showEmail: false,
      showPhone: false,
      showSkills: false,
      showProfilePicture: true,
      showBio: false,
    },
    portfolio: {
      showName: true,
      showRoles: true,
      showEmail: false,
      showPhone: false,
      showSkills: true,
      showProfilePicture: true,
      showBio: true,
    },
    companyWebsite: {
      showName: true,
      showRoles: true,
      showEmail: false,
      showPhone: false,
      showSkills: false,
      showProfilePicture: false,
      showBio: true,
    },
    status: {
      isActive: true,
    }
  });

  const handleSave = (newSettings) => {
    setSettings(newSettings);
    // Save the settings to your backend or local storage here
    console.log('Saved settings:', newSettings);
    setDisplaySettings(newSettings);
    //  console.log("active status is :", settings.status.isActive);
    const activeStatus = settings.status.isActive;
    setIsActive(activeStatus);
    console.log("active status :", activeStatus);
   
     console.log("isActive" , isActive);


  };

  const handleSeoFormSubmit = (data) => {
    console.log('SEO Data submitted:', data);
    setSeo(data);
    console.log("metaTitle:", data.metaTitle);
    setMetaTitle(data.metaTitle);
    console.log("metaDescription:", data.metaDescription);
    setMetaDescription(data.metaDescription);
    console.log("keywords:", data.keywords);
    setKeywords(data.keywords);
  };


  const handleSelectedItemsChange = (items) => {
    setSkills(items);
    // console.log('Updated skills:', skills);
    console.log('Updated Keywords:', items);
  };
  const handleProjectSelect = (selectedValues) => {
    setSelectedProjects(selectedValues);
    // Call API or function to save projects to DB
    console.log('Selected Projects:', selectedValues);
  };
  const projectOptions = projects.map(project => ({
    label: project.name,
    value: project._id
  }));

  const handleRoleSelect = (selectedValues) => {
    setSelectedRoles(selectedValues);
    // Call API or function to save roles to DB
    console.log('Selected Roles:', selectedValues);
  };
  const roleOptions = [
    { label: 'Developer', value: 'Developer' },
    { label: 'Designer', value: 'Designer' },
    { label: 'Project Manager', value: 'Project Manager' },
    { label: 'QA Tester', value: 'QA Tester' },
    { label: 'Analyst', value: 'Analyst' },
    { label: 'Technical Writer', value: 'Technical Writer' },
    { label: 'Content Writer', value: 'Content Writer' },
    { label: 'Editor', value: 'Editor' },
    { label: 'Copywriter', value: 'Copywriter' },
    { label: 'Teacher', value: 'Teacher' },
    { label: 'Instructor', value: 'Instructor' },
    { label: 'Tutor', value: 'Tutor' },
    { label: 'Curriculum Developer', value: 'Curriculum Developer' },
    { label: 'Researcher', value: 'Researcher' },
    { label: 'Engineer', value: 'Engineer' },
    { label: 'Mechanical Engineer', value: 'Mechanical Engineer' },
    { label: 'Electrical Engineer', value: 'Electrical Engineer' },
    { label: 'Civil Engineer', value: 'Civil Engineer' },
    { label: 'Software Engineer', value: 'Software Engineer' },
    { label: 'DevOps Engineer', value: 'DevOps Engineer' },
    { label: 'Data Scientist', value: 'Data Scientist' },
    { label: 'Data Analyst', value: 'Data Analyst' },
    { label: 'SEO Specialist', value: 'SEO Specialist' },
    { label: 'Marketing Specialist', value: 'Marketing Specialist' },
    { label: 'Product Manager', value: 'Product Manager' },
    { label: 'UI/UX Designer', value: 'UI/UX Designer' },
    { label: 'Graphic Designer', value: 'Graphic Designer' },
    { label: 'Consultant', value: 'Consultant' },
    { label: 'Trainer', value: 'Trainer' },
    { label: 'Support Engineer', value: 'Support Engineer' },
    { label: 'Network Engineer', value: 'Network Engineer' },
    { label: 'System Administrator', value: 'System Administrator' },
    { label: 'Database Administrator', value: 'Database Administrator' },
    { label: 'Security Specialist', value: 'Security Specialist' },
    { label: 'AI/ML Specialist', value: 'AI/ML Specialist' },
    { label: 'Blockchain Developer', value: 'Blockchain Developer' },
    { label: 'API Developer', value: 'API Developer' },
    { label: 'Mobile App Developer', value: 'Mobile App Developer' },
    { label: 'Backend Developer', value: 'Backend Developer' },
    { label: 'Frontend Developer', value: 'Frontend Developer' },
    { label: 'Full Stack Developer', value: 'Full Stack Developer' },
    { label: 'Web 3 Developer', value: 'Web 3 Developer' },
    { label: 'Frontend Engineer', value: 'Frontend Engineer' },
    { label: 'Backend Engineer', value: 'Backend Engineer' },
    { label: 'Full Stack Engineer', value: 'Full Stack Engineer' },
    { label: 'React Developer', value: 'React Developer' },
    { label: 'React Native Developer', value: 'React Native Developer' },
    { label: 'Flutter Developer', value: 'Flutter Developer' },
    { label: 'MERN Stack Developer', value: 'MERN Stack Developer' },
    { label: 'MEAN Stack Developer', value: 'MEAN Stack Developer' },
    { label: 'PERN Stack Developer', value: 'PERN Stack Developer' },
    { label: 'Business Analyst', value: 'Business Analyst' },
    { label: 'Operations Manager', value: 'Operations Manager' },
    { label: 'Sales Manager', value: 'Sales Manager' },
    { label: 'Customer Service', value: 'Customer Service' },
    { label: 'Human Resources', value: 'Human Resources' },
    { label: 'Finance Manager', value: 'Finance Manager' },
    { label: 'Legal Advisor', value: 'Legal Advisor' },
    { label: 'Other', value: 'Other' }
  ];





  // const handleProjectChange = (newSelection) => {
  //   setSelectedProjects(newSelection);
  // };
  // const handleRoleChange = (newSelection) => {
  //   setSelectedRoles(newSelection);
  // };

  const handleProjectSelection = (selected) => {
    setSelectedProjects(selected);
    console.log("Selected projectes", selected);
  };

  const handleRoleSelection = (selected) => {
    setSelectedRoles(selected);
    console.log("Selected roles", selected);
  };

  const handleRolesChange = (selectedRoles) => {
    setSelectedRoles(selectedRoles);
  };

  const handleProjectsChange = (selectedProjects) => {
    setSelectedProjects(selectedProjects);
  };

  const handleFileUpload = (files) => {
    // Store or process the files as needed
    if (files.length > 0) {
      setProfilePicture(files[0]); // Store the entire file object
      console.log('Files uploaded:', files);
    } else {
      console.error('No file uploaded.');
    }
  };

  const handleSaveImg = (file) => {
    console.log('File saved with watermark:', file);
    // Handle the file after it has been saved with a watermark
  };

  const handleSvg = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProfilePicture(file);
      console.log("profile pic data: ", profilePicture);
      // setType(file.type);
      setSvgPreview(reader.result);
    };
  }

  const handleAddTeamMember = () => {
    const formData = new FormData();
    // formData.append("name", fullName);
    // formData.append("email", email);
    // formData.append("phone", phone);
    // formData.append("bio", bio);
    // formData.append("joinedAt", joinedAt);
    // formData.append("profilePicture", profilePicture);
    // formData.append("skills", JSON.stringify(skills));
    // formData.append("roles", JSON.stringify(selectedRoles)); // Send selected roles
   formData.append("projects", selectedProjects); // Send selected projects
    // formData.append("displaySettings", JSON.stringify(settings));
    // formData.append("metaTitle", metaTitle);
    // formData.append("metaDescription", metaDescription);
    // formData.append("isActive", isActive);
    // formData.append("keywords", JSON.stringify(keywords));
    // formData.append("seo", JSON.stringify(seo));
    formData.append('profilePicture', profilePicture); // File
    formData.append('name', fullName);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('bio', bio);
    // formData.append('projects', selectedProjects.join(',')); // Array as a comma-separated string
    formData.append('isActive', isActive);
    formData.append('displaySettings', JSON.stringify(displaySettings)); // Convert object to JSON string
    formData.append('roles', selectedRoles.join(',')); // Array as a comma-separated string
    formData.append('skills', skills.join(',')); // Array as a comma-separated string
    formData.append('seo', JSON.stringify(seo)); // Convert object to JSON string
    //formData.append('seo', seo); // Convert object to JSON string
    
    dispatch(addTeamMember(formData));
    // console.log("form data is for member:", formData);
    // console.log(" after submit button press ALL DAta", JSON.stringify(seo));
    // console.log("displaySettings", JSON.stringify(settings));
    // console.log("projects", JSON.stringify(selectedProjects));
    // console.log("roles", JSON.stringify(selectedRoles));
    // console.log("skills", JSON.stringify(skills));
    // console.log("joinedAt", joinedAt);
    // console.log("isActive", isActive);
    console.log("SEO Data submitted:", seo);
    console.log("Display Settings:", settings);
    console.log("Selected Projects:", selectedProjects);
    // console.log("Selected Projects with JSON stringify:"+ JSON.stringify(selectedProjects));
    // console.log("Selected Projects with JSON parse:"+ JSON.parse(selectedProjects));
    console.log("Selected Roles:", selectedRoles);
    console.log("Skills:", skills);
    console.log("Joined At:", joinedAt);
    console.log("Is Active:", isActive);
    
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllTeamMemberErrors());
    }

    if (message) {
      toast.success(message);
      dispatch(clearAllTeamMemberErrors());
      dispatch(getAllTeamMember());
      console.log("getAllTeamMember data", getAllTeamMember());
    }
  }, [dispatch, error, message]);

  return (
    <>
      <ReusableFormSection title={"Team Member"} description={"Add Team Member"}>
        <div className='grid gap-2'>
          <Label>Full Name</Label>
          <Input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </div>
        <div className='grid gap-2'>
          <Label>Email</Label>
          <Input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className='grid gap-2'>
          <Label>Phone</Label>
          <Input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className='grid gap-2'>
          <Label>Bio</Label>
          <Input type="text" value={bio} onChange={(e) => setBio(e.target.value)} />
        </div>
        <div className='grid gap-2'>
          <Label>Joined at</Label>
          <Input type="date" value={joinedAt} onChange={(e) => setJoinedAt(e.target.value)} />
        </div>
        <div className='grid gap-2'>
          <Label>Skills</Label>
          <AddKeyword onSelectedItemsChange={handleSelectedItemsChange} placeholderData={"Enter Skills you like..."} errorMessage={"Duplicate Skills"} />
        </div>
        <div className='grid gap-2'>
          <Label>Roles</Label>
          <RolesSelected
            //  options={roles.map(role => ({ id: role, name: role }))} 
            // options={roleOptions}
            //  maxSelection={5} 
            //  onSelectionChange={handleRoleSelection}
            //  placeholder="Select roles..."
            //  loading={false}
            label="Select Roles"
            options={roleOptions}
            onSelect={handleRoleSelect}
          />
          {/* <RolesSelected
        label="Roles"
        items={roles}
        selectedItems={selectedRoles}
        onChange={handleRolesChange}
        required={true} // Set to true if this selection is required
      /> */}
        </div>
        <div className='grid gap-2'>
          <Label>Projects</Label>
          <RolesSelected
            label="Select Projects"
            options={projectOptions}
            onSelect={handleProjectSelect}
          // options={projects} 
          // maxSelection={5} 
          // onSelectionChange={handleProjectSelection}
          // placeholder="Select projects..."
          // loading={false} // Or use a state variable to control this
          // styles={{ container: { marginBottom: '20px' } }} // Custom styles example
          />
          {/* <RolesSelected
        label="Projects"
        items={projects}
        selectedItems={selectedProjects}
        onChange={handleProjectsChange}
      /> */}

        </div>

        <div className='grid grid-2'>
          <DisplaySettingsForm settings={settings} onSave={handleSave} />
        </div>
        <div className='grid grid-2'>
          <SeoForm
            onSubmit={handleSeoFormSubmit}
            // defaultData={formData}
            isDisabled={false} // Set to true to disable form fields
            useLibraryStyling={false} // Set to true if using library styling
          />
        </div>

        <div className='grid grid-2'>
          <div className="col-span-full">
            <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
              Member Profile picture
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
          {/* <FileUpload
          allowMultiple = {true}
        viewOnly={false}
        watermarkText="SKRMC"
        onSave={handleSaveImg}
        onFileUpload={handleFileUpload} 
        
      /> */}
        </div>
        <div className='mt-5 flex flex-col gap-3'>
          <div className='w-full sm:col-span-4'>
            {loading ? (<SpecialLoadingButton />) : (
              <Button className="w-full" onClick={handleAddTeamMember}>
                Add Member
              </Button>
            )}
          </div>
        </div>
      </ReusableFormSection >
    </>
  )
}

export default AddTeamMembers;
