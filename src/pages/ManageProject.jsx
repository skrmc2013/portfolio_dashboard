import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Eye, Pen, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";

import StatusButton from "./useable-components/StatusButton";
import SpeacialDeleteButton from "./sub-components/SpeacialDeleteButton";
import { clearAllProjectErrors, deleteProject, getAllProject, resetProjectSlice } from "@/store/slices/projectSlice";
import ProjectModal from "./divide-components/ProjectModal";
import UpdatePopup from "./divide-components/UpdatePopup";

const ManageProjects = ({ isEditable }) => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const { projects, loading, error, message } = useSelector((state) => state.project);

  const [projectId, setProjectId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState(false);

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const openUpdatePopup = (project) => {
    setSelectedProject(project);
    setIsUpdatePopupOpen(true);
  };

  const closeUpdatePopup = () => {
    setIsUpdatePopupOpen(false);
    setSelectedProject(null);
  };

  const handleReturnToDashboard = () => {
    navigateTo("/");
  };

  const handleProjectDelete = (id) => {
    setProjectId(id);
    dispatch(deleteProject(id));
  };

  useEffect(() => {
    dispatch(getAllProject());

    if (error) {
      toast.error(error);
      dispatch(clearAllProjectErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetProjectSlice());
      dispatch(getAllProject());
      setProjectId("");
    }
  }, [dispatch, error, message]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Tabs defaultValue="week">
        <TabsContent value="week">
          <Card>
            <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
              <CardTitle>Manage Your Projects</CardTitle>
              <Button className="w-fit" onClick={handleReturnToDashboard}>
                Return to Dashboard
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Banner</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead className="hidden md:table-cell">Technologies</TableHead>
                    <TableHead className="hidden md:table-cell">Deployed</TableHead>
                    <TableHead className="md:table-cell">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects && projects.length > 0 ? (
                    projects.map((element) => (
                      <TableRow className="bg-accent" key={element._id}>
                        <TableCell>
                          <div className="font-medium">
                            <img
                              src={element.projectBanner?.url}
                              alt={element.title}
                              className="w-16 h-16"
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{element.name}</div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {element.technologies?.length > 0 ? (
                            element.technologies.map((tech, index) => (
                              <div key={index}>
                                <span dangerouslySetInnerHTML={{ __html: tech }} />
                              </div>
                            ))
                          ) : (
                            <div>Update record soon</div>
                          )}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <StatusButton
                            status={element.deployed}
                            label={element.deployed ? "Deployed" : "Not Deployed"}
                            colorActive="bg-red-500"
                            colorInactive="bg-gray-300"
                          />
                        </TableCell>
                        <TableCell className="flex flex-row items-center gap-3 h-24">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button
                                  className="border-green-600 border-2 rounded-full h-8 w-8 flex justify-center items-center text-green-600 hover:text-slate-950 hover:bg-green-600"
                                  onClick={() => openModal(element)}
                                >
                                  <Eye className="h-5 w-5" />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent side="bottom">View</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          {/* {isEditable && ( */}
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button
                                    className="border-yellow-400 border-2 rounded-full h-8 w-8 flex justify-center items-center text-yellow-400 hover:text-slate-950 hover:bg-yellow-400"
                                    onClick={() => openUpdatePopup(element)}
                                  >
                                    <Pen className="h-5 w-5" />
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent side="bottom">Edit</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          {/* )} */}
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                {loading && projectId === element._id ? (
                                  <SpeacialDeleteButton />
                                ) : (
                                  <button
                                    className="border-red-600 border-2 rounded-full h-8 w-8 flex justify-center items-center text-red-600 hover:text-slate-50 hover:bg-red-600"
                                    onClick={() => handleProjectDelete(element._id)}
                                  >
                                    <Trash2 className="h-5 w-5" />
                                  </button>
                                )}
                              </TooltipTrigger>
                              <TooltipContent side="bottom">Delete</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell className="text-2xl">You have not added any project.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {isModalOpen && (
        <ProjectModal
          isOpen={isModalOpen}
          project={selectedProject}
          closeModal={closeModal}
        />
      )}

      {isUpdatePopupOpen && (
        <UpdatePopup
          isOpen={isUpdatePopupOpen}
          project={selectedProject}
          closePopup={closeUpdatePopup}
        />
      )}
    </div>
  );
};

export default ManageProjects;



// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { Eye, Pen, Trash2 } from "lucide-react";
// import { toast } from "react-toastify";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Tabs, TabsContent } from "@/components/ui/tabs";

// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@radix-ui/react-tooltip";

// import StatusButton from "./useable-components/StatusButton";
// import SpeacialDeleteButton from "./sub-components/SpeacialDeleteButton";
// import { clearAllProjectErrors, deleteProject, getAllProject, resetProjectSlice } from "@/store/slices/projectSlice";
// import ProjectModal from "./divide-components/ProjectModal";

// const ManageProjects = ({ isEditable }) => {
//   const navigateTo = useNavigate();
//   const dispatch = useDispatch();

//   const { projects, loading, error, message } = useSelector(
//     (state) => state.project
//   );

//   const [projectId, setProjectId] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedProject, setSelectedProject] = useState(null);

//   const openModal = (project) => {
//     setSelectedProject(project);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedProject(null);
//   };

//   const handleReturnToDashboard = () => {
//     navigateTo("/");
//   };

//   const handleProjectDelete = (id) => {
//     setProjectId(id);
//     dispatch(deleteProject(id));
//   };

//   useEffect(() => {
//     dispatch(getAllProject());

//     if (error) {
//       toast.error(error);
//       dispatch(clearAllProjectErrors());
//     }
//     if (message) {
//       toast.success(message);
//       dispatch(resetProjectSlice());
//       dispatch(getAllProject());
//       setProjectId("");
//     }
//   }, [dispatch, error, message]);

//   return (
//     <div className="flex min-h-screen w-full flex-col bg-muted/40">
//       <Tabs defaultValue="week">
//         <TabsContent value="week">
//           <Card>
//             <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
//               <CardTitle>Manage Your Projects</CardTitle>
//               <Button className="w-fit" onClick={handleReturnToDashboard}>
//                 Return to Dashboard
//               </Button>
//             </CardHeader>
//             <CardContent>
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Banner</TableHead>
//                     <TableHead>Title</TableHead>
//                     <TableHead className="hidden md:table-cell">Technologies</TableHead>
//                     <TableHead className="hidden md:table-cell">Deployed</TableHead>
//                     <TableHead className="md:table-cell">Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {projects && projects.length > 0 ? (
//                     projects.map((element) => (
//                       <TableRow className="bg-accent" key={element._id}>
//                         <TableCell>
//                           <div className="font-medium">
//                             <img
//                               src={element.projectBanner?.url}
//                               alt={element.title}
//                               className="w-16 h-16"
//                             />
//                           </div>
//                         </TableCell>
//                         <TableCell>
//                           <div className="font-medium">{element.name}</div>
//                         </TableCell>
//                         <TableCell className="hidden md:table-cell">
//                           {element.technologies?.length > 0 ? (
//                             element.technologies.map((tech, index) => (
//                               <div key={index}>
//                                 <span dangerouslySetInnerHTML={{ __html: tech }} />
//                               </div>
//                             ))
//                           ) : (
//                             <div>Update record soon</div>
//                           )}
//                         </TableCell>
//                         <TableCell className="hidden md:table-cell">
//                           <StatusButton
//                             status={element.deployed}
//                             label={element.deployed ? "Deployed" : "Not Deployed"}
//                             colorActive="bg-red-500"
//                             colorInactive="bg-gray-300"
//                           />
//                         </TableCell>
//                         <TableCell className="flex flex-row items-center gap-3 h-24">
//                           <TooltipProvider>
//                             <Tooltip>
//                               <TooltipTrigger asChild>
//                                 <button
//                                   className="border-green-600 border-2 rounded-full h-8 w-8 flex justify-center items-center text-green-600 hover:text-slate-950 hover:bg-green-600"
//                                   onClick={() => openModal(element)}
//                                 >
//                                   <Eye className="h-5 w-5" />
//                                 </button>
//                               </TooltipTrigger>
//                               <TooltipContent side="bottom">View</TooltipContent>
//                             </Tooltip>
//                           </TooltipProvider>
//                           <TooltipProvider>
//                             <Tooltip>
//                               <TooltipTrigger asChild>
                               
//                                   <button className="border-yellow-400 border-2 rounded-full h-8 w-8 flex justify-center items-center text-yellow-400 hover:text-slate-950 hover:bg-yellow-400">
//                                     <Pen className="h-5 w-5" />
//                                   </button>
                                
//                               </TooltipTrigger>
//                               <TooltipContent side="bottom">Edit</TooltipContent>
//                             </Tooltip>
//                           </TooltipProvider>
//                           <TooltipProvider>
//                             <Tooltip>
//                               <TooltipTrigger asChild>
//                                 {loading && projectId === element._id ? (
//                                   <SpeacialDeleteButton />
//                                 ) : (
//                                   <button
//                                     className="border-red-600 border-2 rounded-full h-8 w-8 flex justify-center items-center text-red-600 hover:text-slate-50 hover:bg-red-600"
//                                     onClick={() => handleProjectDelete(element._id)}
//                                   >
//                                     <Trash2 className="h-5 w-5" />
//                                   </button>
//                                 )}
//                               </TooltipTrigger>
//                               <TooltipContent side="bottom">Delete</TooltipContent>
//                             </Tooltip>
//                           </TooltipProvider>
//                         </TableCell>
//                       </TableRow>
//                     ))
//                   ) : (
//                     <TableRow>
//                       <TableCell className="text-2xl">You have not added any project.</TableCell>
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>

//       {isModalOpen && (
//         <ProjectModal
//           isOpen={isModalOpen}
//           project={selectedProject}
//           closeModal={closeModal}
//         />
//       )}
//     </div>
//   );
// };

// export default ManageProjects;


// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Tabs, TabsContent } from "@/components/ui/tabs";
// import {
//   clearAllProjectErrors,
//   deleteProject,
//   getAllProject,
//   resetProjectSlice,
// } from "@/store/slices/projectSlice";

// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@radix-ui/react-tooltip";
// import { Eye, Pen, Trash2 } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import StatusButton from "./useable-components/StatusButton";
// import SpeacialDeleteButton from "./sub-components/SpeacialDeleteButton";

// const ManageProjects = ({ isEditable }) => {
//   const navigateTo = useNavigate();
//   const handleReturnToDashboard = () => {
//     navigateTo("/");
//   };
//   const { projects, loading, error, message } = useSelector(
//     (state) => state.project
//   );

//   const [projectId, setProjectId] = useState("");

//   const dispatch = useDispatch();

//   const handleProjectDelete = (id) => {
//     setProjectId(id); // Set the projectId for visual feedback
//     dispatch(deleteProject(id)); // Directly dispatch with the passed id
//   };

//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//       dispatch(clearAllProjectErrors());
//     }
//     if (message) {
//       toast.success(message);
//       dispatch(resetProjectSlice());
//       dispatch(getAllProject());
//       setProjectId(""); // Reset projectId after the delete operation
//     }
//   }, [dispatch, error, loading, message]);

//   return (
//     <>
//       <div className="flex min-h-screen w-full flex-col bg-muted/40">
//         <Tabs defaultValue="week">
//           <TabsContent value="week">
//             <Card>
//               <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
//                 <CardTitle>Manage Your Projects</CardTitle>
//                 <Button className="w-fit" onClick={handleReturnToDashboard}>
//                   Return to Dashboard
//                 </Button>
//               </CardHeader>
//               <CardContent>
//                 <Table>
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead>Banner</TableHead>
//                       <TableHead>Title</TableHead>
//                       <TableHead className="hidden md:table-cell">
//                         Technologies
//                       </TableHead>
//                       <TableHead className="hidden md:table-cell">
//                         Deployed
//                       </TableHead>
//                       <TableHead className="md:table-cell">Actions</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {projects && projects.length > 0 ? (
//                       projects.map((element) => (
//                         <TableRow className="bg-accent" key={element._id}>
//                           <TableCell>
//                             <div className="font-medium">
//                               <img
//                                 src={
//                                   element.projectBanner &&
//                                   element.projectBanner.url
//                                 }
//                                 alt={element.title}
//                                 className="w-16 h-16"
//                               />
//                             </div>
//                           </TableCell>
//                           <TableCell>
//                             <div className="font-medium">{element.name}</div>
//                           </TableCell>
//                           <TableCell className="hidden md:table-cell">
//                             {element.technologies &&
//                             element.technologies.length > 0 ? (
//                               element.technologies.map((tech, index) => (
//                                 <div key={index}>
//                                   <span
//                                     dangerouslySetInnerHTML={{ __html: tech }}
//                                   />
//                                 </div>
//                               ))
//                             ) : (
//                               <div>Update record soon</div>
//                             )}
//                           </TableCell>
//                           <TableCell className="hidden md:table-cell">
//                             <StatusButton
//                               status={element.deployed}
//                               label={
//                                 element.deployed ? "Deployed" : "Not Deployed"
//                               }
//                               colorActive="bg-red-500"
//                               colorInactive="bg-gray-300"
//                             />
//                           </TableCell>
//                           <TableCell className="flex flex-row items-center gap-3 h-24">
//                             <TooltipProvider>
//                               <Tooltip>
//                                 <TooltipTrigger asChild>
//                                   <Link to={`/view/project/${element._id}`}>
//                                   {/* <Link to={`/projects/${element._id}`}> */}
//                                     <button
//                                       className="border-green-600 border-2 rounded-full h-8 w-8 flex 
//                                       justify-center items-center text-green-600  hover:text-slate-950 
//                                       hover:bg-green-600"
//                                     >
//                                       <Eye className="h-5 w-5" />
//                                     </button>
//                                   </Link>
//                                 </TooltipTrigger>
//                                 <TooltipContent side="bottom">View</TooltipContent>
//                               </Tooltip>
//                             </TooltipProvider>
//                             <TooltipProvider>
//                               <Tooltip>
//                                 <TooltipTrigger asChild>
//                                   <Link to={`/update/project/${element._id}`}>
//                                     <button className="border-yellow-400 border-2 rounded-full h-8 w-8 flex justify-center items-center text-yellow-400  hover:text-slate-950 hover:bg-yellow-400">
//                                       <Pen className="h-5 w-5" />
//                                     </button>
//                                   </Link>
//                                 </TooltipTrigger>
//                                 <TooltipContent side="bottom">Edit</TooltipContent>
//                               </Tooltip>
//                             </TooltipProvider>
//                             <TooltipProvider>
//                               <Tooltip>
//                                 <TooltipTrigger asChild>
//                                   {loading && projectId === element._id ? (
//                                     <SpeacialDeleteButton />
//                                   ) : (
//                                     <button
//                                       className="border-red-600 border-2 rounded-full h-8 w-8 flex justify-center items-center text-red-600  hover:text-slate-50 hover:bg-red-600"
//                                       onClick={() =>
//                                         handleProjectDelete(element._id)
//                                       }
//                                     >
//                                       <Trash2 className="h-5 w-5" />
//                                     </button>
//                                   )}
//                                 </TooltipTrigger>
//                                 <TooltipContent side="bottom">Delete</TooltipContent>
//                               </Tooltip>
//                             </TooltipProvider>
//                           </TableCell>
//                         </TableRow>
//                       ))
//                     ) : (
//                       <TableRow>
//                         <TableCell className="text-2xl">
//                           You have not added any project.
//                         </TableCell>
//                       </TableRow>
//                     )}
//                   </TableBody>
//                 </Table>
//               </CardContent>
//             </Card>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </>
//   );
// };

// export default ManageProjects;
