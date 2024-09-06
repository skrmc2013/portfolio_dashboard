import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import SpecialLoadingButton from './SpecialLoadingButton';
import { Input } from '@/components/ui/input';
import { useDispatch, useSelector } from 'react-redux';
import { clearAllUserErrors, getUser, resetProfile, updatePassword } from '@/store/slices/userSlice';
import { toast } from 'react-toastify';

const UpdatePassword = () => {

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const { isAuthenticated, error, message, loading, user, isUpdated } = useSelector(state => state.user);

  const dispatch = useDispatch();
  const handleUpdatePassword = () => {
    dispatch(updatePassword(currentPassword, newPassword, confirmNewPassword));
  }


  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch(clearAllUserErrors());

    }
    if(isUpdated){
      dispatch(getUser());
      dispatch(resetProfile());
    }
    if(message){
      toast.success(message);
      dispatch(clearAllUserErrors());
    }


  }, [dispatch, loading, error, isUpdated , message]);

  return (
    <>


      <div className='w-full h-full' >
        <div>
          <div className='grid w-[100%] gap-6 '>
            <div className='grid gap-2' >
              <h1 className='text-3xl font-bold'>Update Password</h1>
              <p className='mb-5'>Update Your Account Password</p>
            </div>
          </div>

          <div className='grid gap-6'>

            <div className='grid gap-2' >
              <Label>Current Password</Label>
              <Input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
              <Link
                to="/password/forgot"
                className="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </Link>
            </div>

            <div className='grid gap-2' >
              <Label>New Password</Label>
              <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </div>

            <div className='grid gap-2' >
              <Label>Confirm New Password</Label>
              <Input text="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
            </div>



            <div className='grid grid-2'>
              {
                !loading ? (<Button onClick={handleUpdatePassword} className="w-full" type="submit" >Update Password</Button>) : (<SpecialLoadingButton content={"Updating Profile... Please Wait"} />)
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdatePassword;