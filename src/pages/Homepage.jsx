import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
// import { clearAllUserErrors, logout } from '@/store/slices/userSlice';
import { AppWindow, Database, DatabaseBackupIcon, Disc2Icon, DivideCircleIcon, FolderGit, History, Home, LayoutGrid, ListCheck, Lock, LogOut, MessageCircle, MessageSquareMore, Package, Package2, PanelLeft, ReceiptEuroIcon, Settings, Settings2Icon, SettingsIcon, ShieldCheck, Siren, SquareUserRound, User, UserRoundCog } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { clearAllUserErrors, logout } from '@/store/slices/userSlice';
import Dashboard from './sub-components/Dashboard';
import AddProject from './sub-components/AddProject';
import AddSkill from './sub-components/AddSkill';
import AddTools from './sub-components/AddTools';
import AddTimeline from './sub-components/AddTimeline';
import Messages from './sub-components/Messages';
import Account from './sub-components/Account';
import ManageIcons from './sub-components/ManageRecords';
import { DialogTitle } from '@radix-ui/react-dialog';
import AppIconForm from './sub-components/AppIconsForm';

const Homepage = () => {


  const [active, setActive] = useState("Dashboard");
  const { isAuthenticated, error, message, user } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    //  dispatch(logout()).then(() => {
    //navigate('/'); // Ensure navigation after logout
    // });
    dispatch(logout());
    toast.success(message);
  };
  console.log("User Data is :", user);
  // const userData = user.avatar;
  // console.log("url is: ", userData);
  // const imgUrl = userData.url;
  // console.log("image url is : ", imgUrl);

  // useEffect(() => {
  //   console.log("Current authentication status:", isAuthenticated);
  //   if (error) {
  //     toast.error(error);
  //     dispatch(clearAllUserErrors());
  //   }
  //   if (message) {
  //     toast.success(message);
  //     console.log("Current user is ", user);
  //   }
  //   if (!isAuthenticated) {
  //     console.log("authentication status:", isAuthenticated);
  //     toast.error("User not authenticated or logged out already");
  //     // navigate("/login");
  //   }
  // }, [isAuthenticated, error, message, dispatch, user]);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return (

    <div className='flex min-h-screen w-full flex-col bg-muted/40'>
      <aside className='fixed inset-y-0 left-0 hidden w-14 flex-col border-r bg-background sm:flex z-50'>
        <nav className='flex flex-col items-center gap-4 px-2 py-4'>
          <Link className='group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base'>
            <Package className='h-4 w-4 transition-all group-hover:scale-110' />
            <span className='sr-only'>Dashboard</span>
          </Link>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-9 w-9 items-center rounded-lg ${active === 'Dashboard' ? "text-accent-foreground  bg-accent" : "text-muted-foreground"} transition-colors hover:text-foreground md:h-8 md:w-8`}
                  onClick={() => setActive("Dashboard")}
                >
                  <Home className='w-5 h-5' />
                  <span className='sr-only'>Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-9 w-9 items-center rounded-lg ${active === 'Add Project' ? "text-accent-foreground  bg-accent" : "text-muted-foreground"} transition-colors hover:text-foreground md:h-8 md:w-8`}
                  onClick={() => setActive("Add Project")}
                >
                  <FolderGit className='w-5 h-5' />
                  <span className='sr-only'>Add Project</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Add Project</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-9 w-9 items-center rounded-lg ${active === 'Add app' ? "text-accent-foreground  bg-accent" : "text-muted-foreground"} transition-colors hover:text-foreground md:h-8 md:w-8`}
                  onClick={() => setActive("Add app")}
                >
                  <Settings2Icon className='w-5 h-5' />
                  <span className='sr-only'>Add App</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Add App</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-9 w-9 items-center rounded-lg ${active === 'Add Skill' ? "text-accent-foreground  bg-accent" : "text-muted-foreground"} transition-colors hover:text-foreground md:h-8 md:w-8`}
                  onClick={() => setActive("Add Skill")}
                >
                  <LayoutGrid className='w-5 h-5' />
                  <span className='sr-only'>Add Skill</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Add Skill</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-9 w-9 items-center rounded-lg ${active === 'Add Tools' ? "text-accent-foreground  bg-accent" : "text-muted-foreground"} transition-colors hover:text-foreground md:h-8 md:w-8`}
                  onClick={() => setActive("Add Tools")}
                >
                  <ShieldCheck className='w-5 h-5' />
                  <span className='sr-only'>Add Tools</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Add Tools</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-9 w-9 items-center rounded-lg ${active === 'Add Timeline' ? "text-accent-foreground  bg-accent" : "text-muted-foreground"} transition-colors hover:text-foreground md:h-8 md:w-8`}
                  onClick={() => setActive("Add Timeline")}
                >
                  <History className='w-5 h-5' />
                  <span className='sr-only'>Add Timeline</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Add Timeline</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-9 w-9 items-center rounded-lg ${active === 'Messages' ? "text-accent-foreground  bg-accent" : "text-muted-foreground"} transition-colors hover:text-foreground md:h-8 md:w-8`}
                  onClick={() => setActive("Messages")}
                >
                  <MessageSquareMore className='w-5 h-5' />
                  <span className='sr-only'>Messages</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Messages</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-9 w-9 items-center rounded-lg ${active === 'Account' ? "text-accent-foreground  bg-accent" : "text-muted-foreground"} transition-colors hover:text-foreground md:h-8 md:w-8`}
                  onClick={() => setActive("Account")}
                >
                  <SquareUserRound className='w-5 h-5' />
                  <span className='sr-only'>Profile</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Profile</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-9 w-9 items-center rounded-lg ${active === 'Manage Icons' ? "text-accent-foreground  bg-accent" : "text-muted-foreground"} transition-colors hover:text-foreground md:h-8 md:w-8`}
                  onClick={() => setActive("Manage Icons")}
                >
                  <DatabaseBackupIcon className='w-5 h-5' />
                  <span className='sr-only'>Manage Record</span> 
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Manage Record</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-9 w-9 items-center rounded-lg ${active === 'Logout' ? "text-accent-foreground  bg-accent" : "text-muted-foreground"} transition-colors hover:text-foreground md:h-8 md:w-8`}
                  onClick={handleLogout}
                >
                  <Lock className='w-5 h-5' />
                  <span className='sr-only'>Logout</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Logout</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
        <nav className='mt-auto flex-col items-center gap-4 px-2 py-6'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-9 w-9 items-center rounded-lg ${active === 'Logout' ? "text-accent-foreground  bg-accent" : "text-muted-foreground"} transition-colors hover:text-foreground md:h-8 md:w-8`}
                  onClick={handleLogout}
                >
                  <LogOut className='w-5 h-5' />
                  <span className='sr-only'>Logout</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Logout</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>

      <header className='sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 max-[900px]:h-[100px]'>
      <Sheet>
        <SheetTrigger asChild>
          <Button size='icon' variant="outline" className="sm:hidden">
            <PanelLeft className='h-5 w-5' />
            {/* <span className='sr-only'>Toggle Menu</span> */}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <div>
            <DialogTitle as="h2" className="sr-only">Navigation Menu</DialogTitle>
            <nav className='grid gap-6 text-lg font-medium'>
              <Link className='group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base'>
                <Package2 className='h-5 w-5 transition-all group-hover:scale-110' />
                {/* <span className=''>Dashboard</span> */}
              </Link>
              <Link href="#" className={`flex items-center gap-4 px-2.5
               ${active === "Dashboard" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                onClick={() => setActive("Dashboard")}
              >
                <Home className='h-5 w-5' />
                Dashboard
              </Link>

              <Link href="#" className={`flex items-center gap-4 px-2.5
               ${active === "Add Project" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                onClick={() => setActive("Add Project")}
              >
                <FolderGit className='w-5 h-5' />
                Add Project
              </Link>
              <Link href="#" className={`flex items-center gap-4 px-2.5
               ${active === "Add app" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                onClick={() => setActive("Add app")}
              >
                <Settings2Icon className='w-5 h-5' />
                Add App
              </Link>

              <Link href="#" className={`flex items-center gap-4 px-2.5
               ${active === "Add Skill" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                onClick={() => setActive("Add Skill")}
              >
                <LayoutGrid className='h-5 w-5' />
                Add Skills
              </Link>

              <Link href="#" className={`flex items-center gap-4 px-2.5
               ${active === "Add Tool" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                onClick={() => setActive("Add Tool")}
              >
                <ShieldCheck className='h-5 w-5' />
                Add Tool
              </Link>

              <Link href="#" className={`flex items-center gap-4 px-2.5
               ${active === "Add Timeline" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                onClick={() => setActive("Add Timeline")}
              >
                <Home className='h-5 w-5' />
                Add Timeline
              </Link>

              <Link href="#" className={`flex items-center gap-4 px-2.5
               ${active === "Messages" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                onClick={() => setActive("Messages")}
              >
                <MessageSquareMore className='h-5 w-5' />
                Messages
              </Link>

              <Link href="#" className={`flex items-center gap-4 px-2.5
               ${active === "Account" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                onClick={() => setActive("Account")}
              >
                <User className='h-5 w-5' />
                Account
              </Link>

              <Link href="#" className={`flex items-center gap-4 px-2.5
               ${active === "Manage Icons" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                onClick={() => setActive("Manage Icons")}
              >
                <DatabaseBackupIcon className='h-5 w-5' />
                Manage Record
              </Link>

              <Link href="#" className={`flex items-center gap-4 px-2.5
               ${active === "Logout" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                onClick={() => setActive("Logout")}
              >
                <LogOut className='h-5 w-5' />
                Logout
              </Link>
            </nav>
          </div>
        </SheetContent>
      </Sheet>
      <div className='flex items-center gap-4 md:grow-0 sm:ml-16 sm:mt-5'>
        <img src={user && user.avatar && user.avatar.url} alt={user && user.fullName ? user.fullName : "Khateeb's picture"} className='w-20 h-20 rounded-full min-[500px]: hidden ' />

        <h1 className='text-4xl max-[900px]:text-2xl'>Welcome Back, {user.fullName}</h1>
      </div>
    </header>

      {
        (() => {
          switch (active) {
            case "Dashboard":
              return <Dashboard/>
              break;
            case "Add Project":
              return <AddProject />
              break;
            case "Add app":
              return <AppIconForm />
              break;
            case "Add Skill":
              return <AddSkill />
              break;
            case "Add Tools":
              return <AddTools />
              break;
            case "Add Timeline":
              return <AddTimeline />
              break;
            case "Messages":
              return <Messages/>
              break;
            case "Account":
              return <Account/>
              break;
            case "Manage Icons":
              return <ManageIcons/>
              break;
            default:
              return <Dashboard/>
              break;
          }
        }) ()
      }
    </div>
  )
};

export default Homepage;
