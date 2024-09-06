import React, { useState } from 'react'
import AddIcons from './AddIcons';
// import getAllIcons from './GetAllIcons';
import UpdateIcons from './UpdateIcons';
import { Link } from 'react-router-dom';
import GetAllIcons from './GetAllIcons';
import GetAllTeamMembers from './GetAllTeamMembers';
import AddTeamMembers from './AddTeamMembers';
import UpdateTeamMember from './UpdateTeamMember';
import GetAllCategories from './GetAllCategories';
import AddCategory from './AddCategory';
import UpdateCategory from './UpdateCategory';

const ManageRecords = () => {
    const [selectedComponent, setSelectedComponent] = useState("Icons");
  return (
    <>
    
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">   </h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav
            className="grid gap-4 text-sm text-muted-foreground "
          // x-chunk="dashboard-04-chunk-0"
          >
            <Link href="#" className={`${selectedComponent === "Icons" ? "font-semibold text-primary bg-green-500 rounded-sm px-2" : ""}`} onClick={()=>setSelectedComponent("Icons")}>
              Manage Icons
            </Link>
            <Link href="#" className={`${selectedComponent === "Add Icons" ? "font-semibold text-primary bg-green-500 rounded-sm px-2" : ""}`}onClick={()=>setSelectedComponent("Add Icons")}>
              Add icons
            </Link>
            <Link href="#" className={`${selectedComponent === "Update Icons" ? "font-semibold text-primary bg-green-500 rounded-sm px-2" : ""}`}onClick={()=>setSelectedComponent("Update Icons")}>
              Update Icons
            </Link>
            <Link href="#" className={`${selectedComponent === "ManageTeamMember" ? "font-semibold text-primary bg-green-500 rounded-sm px-2" : ""}`} onClick={()=>setSelectedComponent("ManageTeamMember")}>
              Manage Team Members
            </Link>
            <Link href="#" className={`${selectedComponent === "Add Team Member" ? "font-semibold text-primary bg-green-500 rounded-sm px-2" : ""}`}onClick={()=>setSelectedComponent("Add Team Member")}>
              Add Team Member
            </Link>
            <Link href="#" className={`${selectedComponent === "Update Team Member" ? "font-semibold text-primary bg-green-500 rounded-sm px-2" : ""}`}onClick={()=>setSelectedComponent("Update Team Member")}>
              Update Team Member
            </Link>
            <Link href="#" className={`${selectedComponent === "Manage Categories" ? "font-semibold text-primary bg-green-500 rounded-sm px-2" : ""}`} onClick={()=>setSelectedComponent("Manage Categories")}>
              Manage Categories
            </Link>
            <Link href="#" className={`${selectedComponent === "Add Category" ? "font-semibold text-primary bg-green-500 rounded-sm px-2" : ""}`}onClick={()=>setSelectedComponent("Add Category")}>
              Add Category
            </Link>
            <Link href="#" className={`${selectedComponent === "Update Category" ? "font-semibold text-primary bg-green-500 rounded-sm px-2" : ""}`}onClick={()=>setSelectedComponent("Update Category")}>
              Update Category
            </Link>
            {/* <Link href="#" className={`${selectedComponent === "Update Password" ? "font-semibold text-primary bg-green-500 rounded-sm px-2" : ""}`} onClick={()=>setSelectedComponent("Update Password")}>
              Update Password
            </Link> */}
      
            {/* <Link href="#">Security</Link>
            <Link href="#">Integrations</Link>
            <Link href="#">Support</Link>
            <Link href="#">Organizations</Link>
            <Link href="#">Advanced</Link> */}
          </nav>

          <div className="grid gap-6">
            {(() => {
              switch(selectedComponent){
                case "Icons" :
                  return <GetAllIcons/> 
                  break;
                case "Add Icons" :
                  return  <AddIcons/>
                  break;
                case "Update Icons" :
                  return <UpdateIcons/>
                  break;
                case "ManageTeamMember" :
                  return <GetAllTeamMembers/>
                  break;
                case "Add Team Member" :
                  return <AddTeamMembers/>
                  break;
                case "Update Team Member" :
                  return <UpdateTeamMember/>
                  break;
                case "Manage Categories" :
                  return <GetAllCategories/>
                  break;
                case "Add Category" :
                  return <AddCategory/>
                  break;
                case "Update Category" :
                  return <UpdateCategory/>
                  break;
                // case "Create Profile" :
                //   return <CreateProfile/>
                //   break;
                default: 
                return <getAllIcons/> 
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

export default ManageRecords