import { clearAllForgotPasswordErrors, forgotPassword } from '@/store/slices/forgotResetPasswordSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import SpecialLoadingButton from './sub-components/SpecialLoadingButton';
// import SpeacialLoadingButton from './sub-components/speacialLoadingButton';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  

  const {loading, error, message} = useSelector(
    (state)=>state.forgotPassword
  );

  const dispatch = useDispatch();
  const {isAuthenticated} = useSelector(
    (state)=>state.user
  );
  const navigate = useNavigate();
  const handleForgotPasssword = ()=>{
    console.log("Forgot Password Triggered");
  console.log("Email:", email);
    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (error) {
        toast.error(error);
        dispatch(clearAllForgotPasswordErrors());
    }
    
    if (message) {
        toast.success(message);
        dispatch(clearAllForgotPasswordErrors());
        setEmail("");
    }
    
    if (isAuthenticated) {
        toast.success("You have logged in already. Redirecting to Dashboard");
        navigate("/dashboard");
    }
}, [dispatch, isAuthenticated, error, message, navigate]);
useEffect(() => {
  console.log("Error:", error);
  console.log("Message:", message);
}, [error, message]);

  return (
    <>
     <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
      <div className="min-h-[100vh] flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Reset Password</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to Reset Your Password
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                // id="email"
                type="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="m@example.com"
                required
              />
            </div>
            <Link
                  to={"/"}
                  className="ml-auto inline-block text-sm underline"
                >
                  Remember your password?
                </Link>

            
            {
              loading? (
                <SpecialLoadingButton content={"Link is generating"}/>):(<Button type="submit" className="w-full" onClick={handleForgotPasssword} >Reset Password </Button>)
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

export default ForgotPassword