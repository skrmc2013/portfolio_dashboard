import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { clearAllUserErrors, login } from "@/store/slices/userSlice";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, isAuthenticated, error, message } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleLogin = () => {
    dispatch(login(email, password));
    toast.success(message);
    // dispatch(login({email, password}));
  };

const handleKeyDown = (e)=>{
  if(e.key === "Enter"){
if(e.target.name=== "email"){
  const itemfocused = document.getElementById("passwordid");
  itemfocused.focus();
} else if(e.target.name==="password"){
  handleLogin();
}
  }
}

  useEffect(() => {
    if (error) {

      toast.error(error);
      dispatch(clearAllUserErrors());

    }
if(message){
  toast.success(message);
}
    if (isAuthenticated) {

      // setTimeout(loading=true,6000);
      setTimeout(()=>navigateTo("/dashboard"),1000);
      // toast.warning("Redirecting to Dashboard");
    }
  }, [dispatch, isAuthenticated, error, loading]);

  return (
    <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
      <div className=" min-h-[100vh] flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email1"
                name = "email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown = {handleKeyDown}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label>Password</Label>
                <Link
                  to="/password/forgot"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
              id="passwordid"
              name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown = {handleKeyDown}
              />
            </div>
            {loading ? (
              <SpecialLoadingButton content={"Loggin In"} />
            ) : (
              <Button
                onClick={() => handleLogin(email, password)}
                className="w-full"
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center bg-muted">
      <DotLottieReact autoplay loop src="https://lottie.host/9d7c359a-0586-419e-a8a2-3af6a4ee44d2/iDuOEdpoiY.json" />
      </div>
    </div>
  );
};

export default Login;