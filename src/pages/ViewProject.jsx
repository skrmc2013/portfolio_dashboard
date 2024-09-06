import { Label } from '@/components/ui/label';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomTextEditor from './useable-components/CustomTextEditor';
import SeoForm from './useable-components/SeoForm';
import Milestone from './useable-components/Milestone';
import AddKeyword from './useable-components/AddKeyword';
import RolesSelected from './useable-components/RolesSelected';
import { Image } from 'lucide-react';
import { toast } from 'react-toastify';
// import SpecialLoadingButton from './SpecialLoadingButton';

import { Button } from '@/components/ui/button';
import { clearAllProjectErrors, getSingleProject, resetSingleProjectSlice } from '@/store/slices/projectSlice';
import SpecialLoadingButton from './sub-components/SpecialLoadingButton';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewProject = () => {
  const dispatch = useDispatch();
  const { project, loading, error, message, singleProject } = useSelector(state => state.project);
  const { teamMembers } = useSelector(state => state.teammember);
const {id} = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [summary, setSummary] = useState("");
  const [objectives, setObjectives] = useState("");
  const [features, setFeatures] = useState("");
  const [seo, setSeo] = useState({});
  const [projectBanner, setProjectBanner] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [tags, setTags] = useState([]);
  const [teamMember, setTeamMember] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [visibility, setVisibility] = useState({
    showOnHomepage: true,
    showOnPortfolio: true,
    showOnCompanySite: true,
  });
  const [deployed, setDeployed] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [githubLink, setGithubLink] = useState("");
  const [projectLink, setProjectLink] = useState("");

  useEffect(() => {
    dispatch(getSingleProject(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (project) {
      setName(project.name);
      setDescription(project.description);
      setSummary(project.summary);
      setObjectives(project.objectives);
      setFeatures(project.features);
      setSeo(project.seo);
      setProjectBanner(project.projectBanner);
      setTechnologies(project.technologies);
      setTags(project.tags);
      setTeamMember(project.teamMembers);
      setMilestones(project.milestones);
      setVisibility(project.visibility);
      setDeployed(project.deployed);
      setStartDate(new Date(project.startDate));
      setEndDate(new Date(project.endDate));
      setGithubLink(project.githubLink);
      setProjectLink(project.projectLink);
    }
  }, [project]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetSingleProjectSlice());
    }
    if (message) {
      toast.success(message);
      // dispatch(clearAllProjectErrors());
    }
  }, [error, message, dispatch]);

  return (
    <div className='flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14'>
      <div className='w-[100%] px-5 md:w-[650px]'>
        <div className='space-y-12'>
          <div className='border-b border-gray-900/10 pb-12'>
            <h2 className='font-semibold leading-7 text-gray-900 text-3xl text-center'>
              View Project
            </h2>

            <div className='mt-5 flex flex-col gap-3'>
              <div className='w-full sm:col-span-4'>
                <Label className="block text-sm font-medium leading-6 text-gray-900">
                  Name
                </Label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300'>
                    <input
                      type='text'
                      placeholder='Name'
                      value={name}
                      readOnly
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400'
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='mt-5 flex flex-col gap-3'>
              <div className='w-full sm:col-span-4'>
                <Label className="block text-sm font-medium leading-6 text-gray-900">
                  Description
                </Label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300'>
                    <input
                      type='text'
                      placeholder='Description'
                      value={description}
                      readOnly
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400'
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='mt-5 flex flex-col gap-3'>
              <div className='w-full sm:col-span-4'>
                <Label className="block text-sm font-medium leading-6 text-gray-900">
                  Summary
                </Label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300'>
                    <input
                      type='text'
                      placeholder='Summary'
                      value={summary}
                      readOnly
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400'
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='mt-5 flex flex-col gap-3'>
              <div className='w-full sm:col-span-4'>
                <Label className="block text-sm font-medium leading-6 text-gray-900">
                  Objectives
                </Label>
                <div className='mt-2'>
                  <CustomTextEditor value={objectives} readOnly />
                </div>
              </div>
            </div>

            <div className='mt-5 flex flex-col gap-3'>
              <div className='w-full sm:col-span-4'>
                <Label className="block text-sm font-medium leading-6 text-gray-900">
                  Features
                </Label>
                <div className='mt-2'>
                  <CustomTextEditor value={features} readOnly />
                </div>
              </div>
            </div>

            <div className='mt-5 flex flex-col gap-3'>
              <div className='w-full sm:col-span-4'>
                <Label className="block text-sm font-medium leading-6 text-gray-900">
                  Technologies
                </Label>
                <div className='mt-2'>
                  <CustomTextEditor value={technologies} readOnly />
                </div>
              </div>
            </div>

            <div className='mt-5 flex flex-col gap-3'>
              <div className='w-full sm:col-span-4'>
                <Label className="block text-sm font-medium leading-6 text-gray-900">
                  Tags
                </Label>
                <div className='mt-2'>
                  <AddKeyword
                    onSelectedItemsChange={setTags}
                    selectedItems={tags}
                    placeholderData={"Enter Tags ..."}
                    errorMessage={"Duplicate Tags"}
                    readOnly
                  />
                </div>
              </div>
            </div>

            <div className='mt-5 flex flex-col gap-3'>
              <div className='w-full sm:col-span-4'>
                <Label className="block text-sm font-medium leading-6 text-gray-900">
                  Milestones
                </Label>
                <div className='mt-2'>
                  <Milestone milestones={milestones} isEditable={false} />
                </div>
              </div>
            </div>

            <div className='mt-5 flex flex-col gap-3'>
              <div className='w-full sm:col-span-4'>
                <Label className="block text-sm font-medium leading-6 text-gray-900">
                  SEO
                </Label>
                <div className='mt-2'>
                  <SeoForm seoData={seo} isDisabled={true} />
                </div>
              </div>
            </div>

            <div className='mt-5 flex flex-col gap-3'>
              <div className='w-full sm:col-span-4'>
                <Label className="block text-sm font-medium leading-6 text-gray-900">
                  Project Banner
                </Label>
                <div className='mt-2'>
                  {projectBanner ? (
                    <img src={projectBanner} alt="Project Banner" className='w-full h-auto object-cover' />
                  ) : (
                    <p>No banner uploaded.</p>
                  )}
                </div>
              </div>
            </div>

            <div className='mt-5 flex flex-col gap-3'>
              <div className='w-full sm:col-span-4'>
                <Label className="block text-sm font-medium leading-6 text-gray-900">
                  Project Links
                </Label>
                <div className='mt-2'>
                  <div className='flex items-center'>
                    <Label className='mr-4'>Github Link:</Label>
                    <a href={githubLink} target='_blank' rel='noopener noreferrer'>{githubLink}</a>
                  </div>
                  <div className='flex items-center mt-2'>
                    <Label className='mr-4'>Project Link:</Label>
                    <a href={projectLink} target='_blank' rel='noopener noreferrer'>{projectLink}</a>
                  </div>
                </div>
              </div>
            </div>

            <div className='mt-5 flex flex-col gap-3'>
              <div className='w-full sm:col-span-4'>
                <Label className="block text-sm font-medium leading-6 text-gray-900">
                  Dates
                </Label>
                <div className='mt-2'>
                  <div className='flex items-center'>
                    <Label className='mr-4'>Start Date:</Label>
                    <span>{startDate.toDateString()}</span>
                  </div>
                  <div className='flex items-center mt-2'>
                    <Label className='mr-4'>End Date:</Label>
                    <span>{endDate.toDateString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className='mt-5 flex flex-col gap-3'>
              <div className='w-full sm:col-span-4'>
                <Label className="block text-sm font-medium leading-6 text-gray-900">
                  Visibility
                </Label>
                <div className='mt-2'>
                  <div className='flex items-center'>
                    <Label className='mr-4'>Show on Homepage:</Label>
                    <span>{visibility.showOnHomepage ? 'Yes' : 'No'}</span>
                  </div>
                  <div className='flex items-center mt-2'>
                    <Label className='mr-4'>Show on Portfolio:</Label>
                    <span>{visibility.showOnPortfolio ? 'Yes' : 'No'}</span>
                  </div>
                  <div className='flex items-center mt-2'>
                    <Label className='mr-4'>Show on Company Site:</Label>
                    <span>{visibility.showOnCompanySite ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className='mt-5 flex flex-col gap-3'>
              <div className='w-full sm:col-span-4'>
                <Label className="block text-sm font-medium leading-6 text-gray-900">
                  Team Members
                </Label>
                <div className='mt-2'>
                  <RolesSelected teamMembers={teamMember} />
                </div>
              </div>
            </div>

            <div className='mt-5 flex flex-col gap-3'>
              <div className='w-full sm:col-span-4'>
                <Label className="block text-sm font-medium leading-6 text-gray-900">
                  Deployed
                </Label>
                <div className='mt-2'>
                  <span>{deployed ? 'Yes' : 'No'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-5 flex justify-center'>
          <Button type="button" className="bg-gray-500 text-white" onClick={() => window.history.back()}>
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewProject;


// import { Label } from '@/components/ui/label';
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Button } from '@/components/ui/button';
// import RolesSelected from './useable-components/RolesSelected';
// import CustomTextEditor from './useable-components/CustomTextEditor';
// import SeoForm from './useable-components/SeoForm';
// import SpecialLoadingButton from './sub-components/SpecialLoadingButton';
// import axios from 'axios';
// import { Switch } from '@headlessui/react'; // Ensure you have this package installed
// import { toast } from 'react-toastify';
// import { useParams } from 'react-router-dom';
// import AddKeyword from './useable-components/AddKeyword';
// import Milestone from './useable-components/Milestone';

// const projectUrl = import.meta.env.VITE_MY_DASHBOARD_PUBLIC_URL;

// const ViewProject = () => {
//   const {id} = useParams();
//   const dispatch = useDispatch();
//   const { projectSingle, error, message, loading } = useSelector(state => state.project);

//   const [data, setData] = useState({
//     name: "",
//     description: "",
//     summary: "",
//     objectives: [],
//     features: [],
//     seo: [],
//     deployed: false,
//     projectBanner: "",
//     technologies: [],
//     tags: [],
//     teamMember: [],
//     milestones: [],
//     progress: {
//       percentage: 0,
//       status: 'Not Started',
//     },
//     budget: {
//       initial: 0,
//       spent: 0,
//     },
//     startDate: new Date(),
//     endDate: new Date(),
//     githubLink: "https://www.github.com/",
//     projectLink: "https://",
//     visibility: {
//       showOnHomepage: true,
//       showOnPortfolio: true,
//       showOnCompanySite: true,
//     }
//   });

//   const [errorMessage, setErrorMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(true);
//   const handleSelectedItemsChange = (items) => {
//     // setTags(items);
//     // console.log('Updated skills:', skills);
//     console.log('Updated Keywords:', items);
//   };
//   // console.log(projectId);
//   console.log(id);
//   // useEffect(() => {
//   //   const getProject = async () => {
//   //     await axios
//   //       .get(`${projectUrl}/api/v1/project/getsingleproject/${projectId}`, {
//   //         withCredentials: true,
//   //       })
//   //       .then((res) => {
//   //         console.log("response from db:", res);
//   //         // setTitle(res.data.project.title);
//   //         // setDescription(res.data.project.description);
//   //         // setStack(res.data.project.stack);
//   //         // setDeployed(res.data.project.deployed);
//   //         // setTechnologies(res.data.project.technologies);
//   //         // setGitRepoLink(res.data.project.gitRepoLink);
//   //         // setProjectLink(res.data.project.projectLink);
//   //         // setProjectBanner(
//   //         //   res.data.project.projectBanner && res.data.project.projectBanner.url
//   //         // );
//   //       })
//   //       .catch((error) => {
//   //         toast.error(error.response.data.message);
          
//   //       });
//   //   };
//   //   getProject();
//   // }, [projectId]);

//   useEffect(() => {
//     const fetchProjectData = async () => {
//       try {
//         const response = await axios.get(`${projectUrl}/api/v1/project/getsingleproject/${id}`, {
//           withCredentials: true,
//         });
//         console.log("response from db:", response);
//         const dbData = response.data.getproject;
//         console.log("dbData", dbData)
//         setData(dbData);
//         // setTags(dbData.tags);
//         setIsLoading(false);
//       } catch (err) {
//         console.error("Error fetching project data:", err.response ? err.response.data.message : err.message);
//         setErrorMessage(err.response ? err.response.data.message : err.message);
//         setIsLoading(false);
//       }
//     };

//     fetchProjectData();
//   }, [id]);

//   if (isLoading) return <p>Loading...</p>;
//   if (errorMessage) return <p>Error: {errorMessage}</p>;

//   return (
//     <div className='flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14'>
//       <div className='w-[100%] px-5 md:w-[650px]'>
//         <div className='space-y-12'>
//           <div className='border-b border-gray-900/10 pb-12'>
//             <h2 className='font-semibold leading-7 text-gray-900 text-3xl text-center'>
//               View Project
//             </h2>

//             <div className='mt-5 flex flex-col gap-3'>
//               <div className='w-full sm:col-span-4'>
//                 <Label className="block text-sm font-medium leading-6 text-gray-900">
//                   Name
//                 </Label>
//                 <div className='mt-2'>
//                   <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300'>
//                     <input
//                       type='text'
//                       value={data.name}
//                       readOnly
//                       className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6'
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className='mt-5 flex flex-col gap-3'>
//               <div className='w-full sm:col-span-4'>
//                 <Label className="block text-sm font-medium leading-6 text-gray-900">
//                   Description
//                 </Label>
//                 <div className='mt-2'>
//                   <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300'>
//                     <input
//                       type='text'
//                       value={data.description}
//                       readOnly
//                       className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6'
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className='mt-5 flex flex-col gap-3'>
//               <div className='w-full sm:col-span-4'>
//                 <Label className="block text-sm font-medium leading-6 text-gray-900">
//                   Summary
//                 </Label>
//                 <div className='mt-2'>
//                   <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300'>
//                     <input
//                       type='text'
//                       value={data.summary}
//                       readOnly
//                       className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6'
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className='mt-5 flex flex-col gap-3'>
//               <div className='w-full sm:col-span-4'>
//                 <Label className="block text-sm font-medium leading-6 text-gray-900">
//                   Objectives
//                 </Label>
//                 <div className='mt-2'>
//                   <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300'>
//                     <CustomTextEditor value={data.objectives} readOnly />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className='mt-5 flex flex-col gap-3'>
//               <div className='w-full sm:col-span-4'>
//                 <Label className="block text-sm font-medium leading-6 text-gray-900">
//                   Features
//                 </Label>
//                 <div className='mt-2'>
//                   <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300'>
//                     <CustomTextEditor value={data.features} readOnly />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className='mt-5 flex flex-col gap-3'>
//               <div className='w-full sm:col-span-4'>
//                 <Label className="block text-sm font-medium leading-6 text-gray-900">
//                   Technologies
//                 </Label>
//                 <div className='mt-2'>
//                   <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300'>
//                     <CustomTextEditor value={data.technologies} readOnly />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className='mt-5 flex flex-col gap-3'>
//               <div className='w-full sm:col-span-4'>
//                 <Label className="block text-sm font-medium leading-6 text-gray-900">
//                   Tags
//                 </Label>
//                 <div className='mt-2'>
//                   <AddKeyword 
                  
//                    onSelectedItemsChange={handleSelectedItemsChange}
//                     readOnly
//                     placeholderData={"Enter Tags ..."} 
//                     errorMessage={"Duplicate Tags"} 
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className='mt-5 flex flex-col gap-3'>
//               <div className='w-full sm:col-span-4'>
//                 <Label className="block text-sm font-medium leading-6 text-gray-900">
//                   Milestones
//                 </Label>
//                 <div className='mt-2'>
//                   <Milestone milestones={data.milestones} isEditable={false} />
//                 </div>
//               </div>
//             </div>

//             <div className='mt-5 flex flex-col gap-3'>
//               <div className='w-full sm:col-span-4'>
//                 <Label className="block text-sm font-medium leading-6 text-gray-900">
//                   SEO
//                 </Label>
//                 <div className='mt-2'>
//                   <SeoForm 
//                     seo={data.seo} 
//                     isDisabled={true} 
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className='mt-5 flex flex-col gap-3'>
//               <div className='w-full sm:col-span-4'>
//                 <Label className="block text-sm font-medium leading-6 text-gray-900">
//                   Project Banner
//                 </Label>
//                 <div className='mt-2'>
//                   <img src={data.projectBanner} alt="Project Banner" className='w-full' />
//                 </div>
//               </div>
//             </div>

//             <div className='mt-5 flex flex-col gap-3'>
//               <div className='w-full sm:col-span-4'>
//                 <Label className="block text-sm font-medium leading-6 text-gray-900">
//                   Deployed
//                 </Label>
//                 <div className='mt-2'>
//                   <Switch
//                     checked={data.deployed}
//                     onChange={() => {}}
//                     className={`${
//                       data.deployed ? 'bg-blue-600' : 'bg-gray-200'
//                     } relative inline-flex h-6 w-11 items-center rounded-full`}
//                   >
//                     <span
//                       className={`${
//                         data.deployed ? 'translate-x-6' : 'translate-x-1'
//                       } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
//                     />
//                   </Switch>
//                 </div>
//               </div>
//             </div>

//             <div className='mt-5 flex flex-col gap-3'>
//               <div className='w-full sm:col-span-4'>
//                 <Label className="block text-sm font-medium leading-6 text-gray-900">
//                   Visibility
//                 </Label>
//                 <div className='mt-2'>
//                   <div className='flex flex-col gap-4'>
//                     <div className='flex items-center'>
//                       <Switch
//                         checked={data.visibility.showOnHomepage}
//                         onChange={() => {}}
//                         className={`${
//                           data.visibility.showOnHomepage ? 'bg-blue-600' : 'bg-gray-200'
//                         } relative inline-flex h-6 w-11 items-center rounded-full`}
//                       >
//                         <span
//                           className={`${
//                             data.visibility.showOnHomepage ? 'translate-x-6' : 'translate-x-1'
//                           } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
//                         />
//                       </Switch>
//                       <Label className='ml-3 text-sm font-medium text-gray-900'>
//                         Show on Homepage
//                       </Label>
//                     </div>

//                     <div className='flex items-center'>
//                       <Switch
//                         checked={data.visibility.showOnPortfolio}
//                         onChange={() => {}}
//                         className={`${
//                           data.visibility.showOnPortfolio ? 'bg-blue-600' : 'bg-gray-200'
//                         } relative inline-flex h-6 w-11 items-center rounded-full`}
//                       >
//                         <span
//                           className={`${
//                             data.visibility.showOnPortfolio ? 'translate-x-6' : 'translate-x-1'
//                           } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
//                         />
//                       </Switch>
//                       <Label className='ml-3 text-sm font-medium text-gray-900'>
//                         Show on Portfolio
//                       </Label>
//                     </div>

//                     <div className='flex items-center'>
//                       <Switch
//                         checked={data.visibility.showOnCompanySite}
//                         onChange={() => {}}
//                         className={`${
//                           data.visibility.showOnCompanySite ? 'bg-blue-600' : 'bg-gray-200'
//                         } relative inline-flex h-6 w-11 items-center rounded-full`}
//                       >
//                         <span
//                           className={`${
//                             data.visibility.showOnCompanySite ? 'translate-x-6' : 'translate-x-1'
//                           } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
//                         />
//                       </Switch>
//                       <Label className='ml-3 text-sm font-medium text-gray-900'>
//                         Show on Company Site
//                       </Label>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className='mt-5 flex justify-end'>
//               <Button
//                 type='button'
//                 onClick={() => {
//                   // Handle any additional logic or navigation here
//                 }}
//                 className='bg-blue-600 text-white hover:bg-blue-700'
//               >
//                 Edit Project
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewProject;
