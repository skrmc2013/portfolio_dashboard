import React, { useEffect, useState } from 'react'
import SpecialLoadingButton from './sub-components/SpecialLoadingButton'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearAllForgotPasswordErrors, forgotPassword, resetPassword } from '@/store/slices/forgotResetPasswordSlice'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button'

const ResetPassword = () => {

  const {token} = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const {loading, error, message } = useSelector(
    (state)=>state.forgotPassword
  );
  const {isAuthenticated} = useSelector((state)=>state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleResetPasssword = ()=>{
    dispatch(resetPassword(token, password, confirmPassword));
  };

  useEffect(() => {
    if(error){
      toast.error(error);
      dispatch(clearAllForgotPasswordErrors());

    }
   
    if(message!==null){
      toast.success(message);
      toast.success("You're redirectng to Login page");
      dispatch(clearAllForgotPasswordErrors());
      setTimeout(()=>navigate("/"), 5000);
    }
    if(isAuthenticated){
      toast.success("Your have logged in already. so redirecting to Dashboard");
      navigate("/dashboard");
    }
  }, [dispatch, loading, error, message , isAuthenticated])
  
  
  
  return (

    <>
     <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
      <div className="min-h-[100vh] flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Reset Password</h1>
            <p className="text-balance text-muted-foreground">
              Enter New Password
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">New Password</Label>
              <Input
                // id="email"
                type="email"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="New Password"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Confirm New Password</Label>
              <Input
                // id="email"
                type="email"
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                placeholder="Confirm New Password"
                required
              />
            </div>
           
            
            {
              loading? (
                <SpecialLoadingButton content={"Password is Updating"}/>):(<Button type="submit" className="w-full" onClick={handleResetPasssword} >Reset Password </Button>)
            }
           

           
          </div>
       
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
    </>
  )
}

export default ResetPassword