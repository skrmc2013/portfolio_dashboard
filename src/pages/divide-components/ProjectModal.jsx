
import React from 'react';
import { Transition } from '@headlessui/react';

// Switch component for true/false values
const SwitchButton = ({ value }) => {
    return (
        <div
            className={`inline-flex items-center p-1 rounded-full w-14 h-8 cursor-pointer transition-all duration-300 ${value ? 'bg-green-400' : 'bg-gray-400'
                }`}
        >
            <div
                className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${value ? 'translate-x-6' : ''
                    }`}
            />
        </div>
    );
};
const getMilestoneStatusColor = (status) => {
    switch (status) {
        case 'Completed':
            return 'bg-green-100 text-green-800';
        case 'In Progress':
            return 'bg-blue-100 text-blue-800';
        case 'Pending':
            return 'bg-red-100 text-red-800';
        case 'Not Started':
            return 'bg-yellow-100 text-yellow-800';
        case 'On Hold':
            return 'bg-purple-100 text-purple-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

const getStatusTextColor = (status) => {
    switch (status) {
        case 'Completed':
            return 'bg-green-100 text-green-800';
        case 'In Progress':
            return 'text-blue-800';
        case 'Pending':
            return 'text-red-800';
        case 'Not Started':
            return 'text-yellow-800';
        case 'On Hold':
            return 'text-purple-800';
        default:
            return 'text-gray-800';
    }
};

const ProjectModal = ({ isOpen, project, closeModal }) => {
    if (!project) return null;
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    return (
        <Transition show={isOpen} as="div" className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 text-center">
                <Transition.Child
                    as="div"
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4"
                    enterTo="opacity-100 translate-y-0"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-4"
                    className="inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg"
                >
                    {/* Modal Header */}
                    <div className="flex justify-between items-center pb-4 border-b">
                        <h2 className="text-2xl font-semibold text-gray-800">{project.name}</h2>
                        {/* Deployment */}
                        {project.deployed !== undefined && project.deployed !== null && (
                            <div className={`mb-3 ${project.deployed ? "text-green-600 " : "text-red-700"}`}>

                                {project.deployed ? "online" : "offline"}
                            </div>
                        )}
                        <button
                            onClick={closeModal}
                            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                        >
                            &times;
                        </button>
                    </div>

                    {/* Important Info */}
                    <div className="mt-4 space-y-4">
                        {/* Project Banner */}
                        {project.projectBanner?.url && (
                            <div className="w-full h-64 bg-gray-200 overflow-hidden rounded-lg">
                                <img
                                    src={project.projectBanner.url}
                                    alt="Project Banner"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}

                        {/* Description */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">Description</h3>
                            <p className="text-gray-600">{project.description}</p>
                        </div>
                        {/* Features */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">Features</h3>
                            <div className="list-disc list-inside text-sm text-gray-600 overflow-y-auto no-scrollbar">
                                {project.features.map((feature, index) => (
                                    <div key={index} dangerouslySetInnerHTML={{ __html: feature }}></div>
                                ))}
                            </div>
                        </div>

                        {/* Objectives */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">Objectives</h3>
                            <div className="list-disc list-inside text-sm text-gray-600 overflow-y-auto no-scrollbar">
                                {project.objectives.map((objective, index) => (
                                    <div key={index} dangerouslySetInnerHTML={{ __html: objective }}></div>
                                ))}
                            </div>
                        </div>
                        {/* Summary */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700 overflow-y-auto no-scrollbar ">Summary</h3>
                            <p className="text-gray-600">{project.summary}</p>
                        </div>
                        {/* Technologies */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">Technologies</h3>
                            <div className="flex flex-wrap gap-2 text-gray-600">
                                {project.technologies.map((tech, index) => (
                                    <div className='px-2 py-0 mt-1 bg-blue-100 text-black-700 font-medium rounded-full' key={index} dangerouslySetInnerHTML={{ __html: tech }}></div>
                                ))}
                            </div>
                            {/* <div className="list-disc list-inside text-sm text-gray-600">
                                {project.technologies.map((tech, index) => (
                                    <div key={index} dangerouslySetInnerHTML={{ __html: tech }}></div>
                                ))}
                            </div> */}
                        </div>


                        {/* Tags */}
                        {project.tags && project.tags.length > 0 && (
                            <div className="mb-4">
                                <h3 className="text font-semibold text-gray-700">Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2 py-0 mt-1 bg-blue-100 text-black-700 font-medium rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                        {/* Milestones */}
                        {project.milestones && project.milestones.length > 0 && (
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold text-gray-700">Milestones</h3>
                                <ul className="list-none pl-5">
                                    {project.milestones.map((milestone) => (
                                        <li key={milestone._id} className={`p-2 rounded ${getMilestoneStatusColor(milestone.status)}`}>
                                            <p><strong>Name:</strong> {milestone.name}</p>
                                            <p><strong>Description:</strong> {milestone.description}</p>
                                            <p><strong>Deadline:</strong> {formatDate(milestone.deadline)}</p>
                                            <p><strong>Status:</strong> {milestone.status}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* SEO Data */}
                        {project.seo && (
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold text-gray-700">SEO Data</h3>
                                <p><strong>Meta Title:</strong> {project.seo.metaTitle || 'N/A'}</p>
                                <p><strong>Meta Description:</strong> {project.seo.metaDescription || 'N/A'}</p>
                                <p><strong>Keywords:</strong>
                                    {/* {project.seo.keywords?.join(', ') || 'N/A'} */}
                                    {project.seo.keywords && project.seo.keywords.length > 0 && (project.seo.keywords.map(keyword => (
                                        <strong key={keyword}
                                            className="px-2 py-0 mt-1 ml-1 bg-blue-100 text-black-700 font-medium rounded-xl">{keyword}</strong>
                                    )))

                                    }

                                </p>
                            </div>
                        )}

                          {/* Team Members */}
                          {project.teamMembers && project.teamMembers.length > 0 ?(
                                <div className="mb-4">
                                    <h3 className="text-lg font-semibold text-gray-700">Team Members</h3>
                                    {/* <ul className="list-disc pl-5"> */}
                                        {project.teamMembers.map((member) => (

                                            <strong key={member} className="text-gray-600px-2 py-0  px-1 mt-1 ml-1 bg-blue-100 text-black-700 font-medium rounded-full">{member.name}</strong>
                                        ))}
                                    {/* </ul> */}
                                </div>
                            ) : " "}



                    </div>

                    {/* Other Information */}
                    <div className="mt-8 space-y-4">

                        {/* Budget and Progress */}
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 max-[300px]:grid-cols-1 ">
                            {/* Budget */}
                            <div className="h-30 overflow-y-auto no-scrollbar">
                                <h3 className="text-sm font-semibold text-gray-700">Budget</h3>
                                <p className="text-sm text-gray-600">Initial: ${project.budget.initial}</p>
                                <p className="text-sm text-gray-600">Spent: ${project.budget.spent}</p>
                            </div>

                            {/* Progress */}
                            <div className="h-30 overflow-y-auto no-scrollbar ">
                                <h3 className="text-sm font-semibold text-gray-700">Progress</h3>
                                <p className="text-sm text-gray-600">Percentage: {project.progress?.percentage}%</p>
                                <p className={`text-sm ${getStatusTextColor(project.progress?.status)} rounded-lg text-center inline p-1`}> {project.progress?.status}</p>
                            </div>

                            <div className='h-30 overflow-y-auto no-scrollbar'>
                            <h3 className="text-sm font-semibold text-gray-700">Date</h3>
                               
                            <p className="text-sm text-gray-600">Start date: {formatDate(project.startDate)}</p>
                            <p className="text-sm text-gray-600">End date: {formatDate(project.endDate)}</p>
                            </div>
                        </div>

                        {/* Visibility */}
                        <div className="grid grid-cols-3 gap-4 max-[300px]:grid-cols-1">
                            <div className="h-30 overflow-y-auto">
                                <h3 className="text-sm font-semibold text-gray-700">Show on Homepage</h3>
                                <SwitchButton value={project.visibility.showOnHomepage} />
                            </div>
                            <div className="h-30 overflow-y-auto">
                                <h3 className="text-sm font-semibold text-gray-700">Show on Portfolio</h3>
                                <SwitchButton value={project.visibility.showOnPortfolio} />
                            </div>
                            <div className="h-30 overflow-y-auto">
                                <h3 className="text-sm font-semibold text-gray-700">Show on Company Site</h3>
                                <SwitchButton value={project.visibility.showOnCompanySite} />
                            </div>
                        </div>

                        {/* Links */}
                        <div className="grid grid-cols-2 gap-4 max-[300px]:grid-cols-1">
                            {project.githubLink && (
                                <div className="h-30 overflow-y-auto no-scrollbar">
                                    <h3 className="text-sm font-semibold text-gray-700">GitHub Link</h3>
                                    <a
                                        href={project.githubLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                    >
                                        {project.githubLink}
                                    </a>
                                </div>
                            )}
                            {project.projectLink && (
                                <div className="h-32 overflow-y-aut no-scrollbar">
                                    <h3 className="text-sm font-semibold text-gray-700">Project Link</h3>
                                    <a
                                        href={project.projectLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                    >
                                        {project.projectLink}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Modal Footer */}
                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={closeModal}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                        >
                            Close
                        </button>
                    </div>
                </Transition.Child>
            </div>
        </Transition>
    );
};

export default ProjectModal;

// import React from 'react';
// import { Transition } from '@headlessui/react';

// const ProjectModal = ({ isOpen, project, closeModal }) => {
//   if (!project) return null;

//   return (
//     <Transition show={isOpen} as="div" className="fixed inset-0 z-50 overflow-y-auto">
//       <div className="flex items-center justify-center min-h-screen px-4 text-center">
//         <Transition.Child
//           as="div"
//           enter="ease-out duration-300"
//           enterFrom="opacity-0 translate-y-4"
//           enterTo="opacity-100 translate-y-0"
//           leave="ease-in duration-200"
//           leaveFrom="opacity-100 translate-y-0"
//           leaveTo="opacity-0 translate-y-4"
//           className="inline-block w-full max-w-3xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg"
//         >
//           {/* Modal Header */}
//           <div className="flex justify-between items-center pb-4 border-b">
//             <h2 className="text-xl font-semibold text-gray-800">{project.name}</h2>
//             <button
//               onClick={closeModal}
//               className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
//             >
//               &times;
//             </button>
//           </div>

//           {/* Modal Content */}
//           <div className="mt-4">
//             <p className="text-gray-600 mb-4">{project.description}</p>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <h3 className="text-sm font-semibold text-gray-700">Budget</h3>
//                 <p className="text-sm text-gray-600">Initial: ${project.budget.initial}</p>
//                 <p className="text-sm text-gray-600">Spent: ${project.budget.spent}</p>
//               </div>
//               <div>
//                 <h3 className="text-sm font-semibold text-gray-700">Progress</h3>
//                 <p className="text-sm text-gray-600">Percentage: {project.progress.percentage}%</p>
//                 <p className="text-sm text-gray-600">Status: {project.progress.status}</p>
//               </div>
//             </div>

//             <div className="mt-4">
//               <h3 className="text-sm font-semibold text-gray-700">Features</h3>
//               <ul className="list-disc list-inside text-sm text-gray-600">
//                 {project.features.map((feature, index) => (
//                   <li key={index}>{feature}</li>
//                 ))}
//               </ul>
//             </div>

//             <div className="mt-4">
//               <h3 className="text-sm font-semibold text-gray-700">Technologies</h3>
//               <ul className="list-disc list-inside text-sm text-gray-600">
//                 {project.technologies.map((tech, index) => (
//                   <li key={index} dangerouslySetInnerHTML={{ __html: tech }}></li>
//                 ))}
//               </ul>
//             </div>

//             {/* Other details can be added similarly */}
//           </div>

//           {/* Modal Footer */}
//           <div className="mt-6 flex justify-end">
//             <button
//               onClick={closeModal}
//               className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
//             >
//               Close
//             </button>
//           </div>
//         </Transition.Child>
//       </div>
//     </Transition>
//   );
// };

// export default ProjectModal;
