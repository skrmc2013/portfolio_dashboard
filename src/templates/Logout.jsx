import { Button } from '@/components/ui/button';
import { logout } from '@/store/slices/userSlice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Logout = () => {
    const dispatch = useDispatch();
  const { message, error, logoutMessage } = useSelector((state) => state.user);
  const navigateTo = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
      navigateTo('/');
    } else if (logoutMessage) {
      toast.warning(logoutMessage);
      dispatch(clearAllUserErrors());
    } else if (message) {
      toast.success(message);
      dispatch(clearAllUserErrors());
    }
  }, [message, dispatch, error, logoutMessage]);
  return (
   <>
   <Button onClick={handleLogout}>Log Out</Button>
   </>
  )
}

export default Logout