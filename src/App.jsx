 import { useEffect } from 'react'
import './App.css'
import { ToastContainer,
  //  toast
   } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import ManageSkills from './pages/ManageSkills'
import ManageTimeline from './pages/ManageTimeline'
import ManageProject from './pages/ManageProject'
import ViewProject from './pages/ViewProject'
import UpdateProject from './pages/UpdateProject'
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './store/slices/userSlice';
import { getAllMessages } from './store/slices/messagesSlice';
import { getAllTimeline } from './store/slices/timelineSlice';
import { getAllSkills } from './store/slices/skillSlice';
import { getAllIcons } from './store/slices/iconsSlice';
import { getAllCategory } from './store/slices/categorySlice';
import { getAllTeamMember } from './store/slices/teamMemberSlice';
import { getAllProject, getSingleProject } from './store/slices/projectSlice';
import { getAllAppicons } from './store/slices/appSlice';

// import { getUser } from './store/slices/userSlice';


function App() {
  const dispatch = useDispatch();

  // const { isAuthenticated } = useSelector(state => state.user);

  // useEffect(() => {
    // if (isAuthenticated) {
      
    // }
    // dispatch(getUser());
  // }, []
  // [dispatch, isAuthenticated]
// );

useEffect(()=>{
  dispatch(getUser());
  dispatch(getAllMessages());
  dispatch(getAllTimeline());
  dispatch(getAllSkills());
  dispatch(getAllIcons());
  dispatch(getAllCategory());
  dispatch(getAllTeamMember());
  dispatch(getAllProject());
  dispatch(getAllAppicons());
  dispatch(getSingleProject("66c8fa8551fd08785fa2722b"));
}, []);
  return (
    <>
    <Router>
      <Routes>
        <Route path='/dashboard' element={<Homepage/>}/>
        <Route path='/' element={<Login/>} />
        <Route path='/password/forgot' element={<ForgotPassword/>} />
        <Route path='/password/reset/:token' element={<ResetPassword/>} />
        <Route path='/manage/skills' element={<ManageSkills/>} />
        <Route path='/manage/timeline' element={<ManageTimeline/>}  />
        <Route path='/manage/projects' element={<ManageProject/>}  />
        <Route path='/view/project/:id' element={<ViewProject/>}  />
        <Route path='/update/project/:id' element={<UpdateProject/>} />
        {/* <Route path="/projects/:projectId" element={<ViewProject />} /> */}
      </Routes>
      <ToastContainer position='bottom-right' theme='dark'/>
    </Router>
     
    </>
  )
}

export default App
