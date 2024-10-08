import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Profile from './Profile';
import UpdatePassword from './UpdatePassword';
import UpdateProfile from './UpdateProfile';
import CreateProfile from './CreateProfile';

const Account = () => {
  const [selectedComponent, setSelectedComponent] = useState("Profile");
  return (
    <>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav
            className="grid gap-4 text-sm text-muted-foreground "
          // x-chunk="dashboard-04-chunk-0"
          >
            <Link href="#" className={`${selectedComponent === "Profile" ? "font-semibold text-primary bg-green-500 rounded-sm px-2" : ""}`} onClick={()=>setSelectedComponent("Profile")}>
              Profile
            </Link>
            <Link href="#" className={`${selectedComponent === "Update Profile" ? "font-semibold text-primary bg-green-500 rounded-sm px-2" : ""}`}onClick={()=>setSelectedComponent("Update Profile")}>
              Update Profile
            </Link>
            <Link href="#" className={`${selectedComponent === "Create Profile" ? "font-semibold text-primary bg-green-500 rounded-sm px-2" : ""}`}onClick={()=>setSelectedComponent("Create Profile")}>
              Create New Profile
            </Link>
            <Link href="#" className={`${selectedComponent === "Update Password" ? "font-semibold text-primary bg-green-500 rounded-sm px-2" : ""}`} onClick={()=>setSelectedComponent("Update Password")}>
              Update Password
            </Link>
      
            {/* <Link href="#">Security</Link>
            <Link href="#">Integrations</Link>
            <Link href="#">Support</Link>
            <Link href="#">Organizations</Link>
            <Link href="#">Advanced</Link> */}
          </nav>

          <div className="grid gap-6">
            {(() => {
              switch(selectedComponent){
                case "Profile" :
                  return <Profile/> 
                  break;
                case "Update Password" :
                  return  <UpdatePassword/>
                  break;
                case "Update Profile" :
                  return <UpdateProfile/>
                  break;
                case "Create Profile" :
                  return <CreateProfile/>
                  break;
                default: 
                return <Profile/> 
                break;
              }

            })()}

            {/* <Card x-chunk="dashboard-04-chunk-1">
              <CardHeader>
                <CardTitle>Store Name</CardTitle>
                <CardDescription>
                  Used to identify your store in the marketplace.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <Input placeholder="Store Name" />
                </form>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button>Save</Button>
              </CardFooter>
            </Card>
            <Card x-chunk="dashboard-04-chunk-2">
              <CardHeader>
                <CardTitle>Plugins Directory</CardTitle>
                <CardDescription>
                  The directory within your project, in which your plugins are
                  located.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="flex flex-col gap-4">
                  <Input
                    placeholder="Project Name"
                    defaultValue="/content/plugins"
                  />
                  <div className="flex items-center space-x-2">
                    <Checkbox id="include" defaultChecked />
                    <label
                      htmlFor="include"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Allow administrators to change the directory.
                    </label>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button>Save</Button>
              </CardFooter>
            </Card> */}
          </div>
        </div>
      </main>
    </>
  )
}

export default Account