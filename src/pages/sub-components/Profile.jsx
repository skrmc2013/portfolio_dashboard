import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
  const { user } = useSelector(state => state.user);

  return (
    <>
      <div className='w-full h-full' >
        <div>
          <div className='grid w-[100%] gap-6 '>
            <div className='grid gap-2' >
              <h1 className='text-3xl font-bold'>Profile</h1>
              <p className='mb-5'>Profile Data</p>
            </div>
          </div>

          <div className='grid gap-6'>
            <div className='flex items-center lg:justify-between lg:items-center flex-col lg:flex-row gap-5 '>
              <div className='grid gap-2 w-full sm:w-72'>
                <Label>Profle Image</Label>
                <img src={user && user.avatar && user.avatar.url} alt={user && user.fullName ? user.fullName : "Khateeb's picture"} className='w-full h-auto rounded-2xl sm:h-72 ' />

              </div>
              <div className='grid gap-2 w-full sm:w-72'>
                <Label>Resume</Label>
                <img src={user && user.resume && user.resume.url} alt="Khateeb's Resume" className='w-full h-auto rounded-2xl sm:h-72 ' />

              </div>
            </div>

            <div className='grid gap-2' >
              <Label>Full Name</Label>
              <Input type="text" defaultValue={user.fullName} disabled />
            </div>
            <div className='grid gap-2' >
              <Label>About me</Label>
              <Input type="text" defaultValue={user.aboutMe} disabled />
            </div>

            <div className='grid gap-2' >
              <Label>Email</Label>
              <Input type="text" defaultValue={user.email} disabled />
            </div>

            <div className='grid gap-2' >
              <Label>Phone Number</Label>
              <Input type="text" defaultValue={user.phone} disabled />
            </div>
            <div className={`${user.portfolioUrl == null || user.portfolioUrl.length == 0 ? "hidden" : "grid gap-2"}`}>
              <Label>Portfolio URL</Label>
              <a href={user.portfolioUrl} className='hover:cursor-pointer hover:rounded-none hover:underline'>
                <Input type="text" defaultValue={user.portfolioUrl} disabled />
              </a>
            </div>

            <div className={`${user.githubURL == null || user.githubURL.length == 0 ? "hidden" : "grid gap-2"}`}>
              <Label>Github URL</Label>
              <a href={user.githubURL} className='hover:cursor-pointer hover:rounded-none hover:underline'>
                <Input type="text" defaultValue={user.githubURL} disabled />
              </a>
            </div>

            <div className={`${user.linkedInURL == null || user.linkedInURL.length == 0 ? "hidden" : "grid gap-2"}`}>
              <Label>LinkedIn URL</Label>
              <a href={user.linkedInURL} className='hover:cursor-pointer hover:rounded-none hover:underline'>
                <Input type="text" defaultValue={user.linkedInURL} disabled />
              </a>
            </div>

            <div className={`${user.facebookURL == null || user.facebookURL.length == 0 ? "hidden" : "grid gap-2"}`}>
              <Label>Facebook URL</Label>
              <a href={user.facebookURL} className='hover:cursor-pointer hover:rounded-none hover:underline'>
                <Input type="text" defaultValue={user.facebookURL} disabled />
              </a>
            </div>

            <div className={`${user.whatsappURL == null || user.whatsappURL.length == 0 ? "hidden" : "grid gap-2"}`}>
              <Label>Whatsapp URL</Label>
              <a href={user.whatsappURL} className='hover:cursor-pointer hover:rounded-none hover:underline'>
                <Input type="text" defaultValue={user.whatsappURL} disabled />
              </a>
            </div>

            <div className={`${user.instagramURL == null || user.instagramURL.length == 0 ? "hidden" : "grid gap-2"}`}>
              <Label>Instagram URL</Label>
              <a href={user.instagramURL} className='hover:cursor-pointer hover:rounded-none hover:underline'>
                <Input type="text" defaultValue={user.instagramURL} disabled />
              </a>
            </div>

            <div className={`${user.telegramURL == null || user.telegramURL.length == 0 ? "hidden" : "grid gap-2"}`}>
              <Label>Telegram URL</Label>
              <a href={user.telegramURL} className='hover:cursor-pointer hover:rounded-none hover:underline'>
                <Input type="text" defaultValue={user.telegramURL} disabled />
              </a>
            </div>

            <div className={`${user.twitterURL == null || user.twitterURL.length == 0 ? "hidden" : "grid gap-2"}`}>
              <Label>Twitter URL</Label>
              <a href={user.twitterURL} className='hover:cursor-pointer hover:rounded-none hover:underline'>
                <Input type="text" defaultValue={user.twitterURL} disabled />
              </a>
            </div>

            <div className={`${user.replitURL == null || user.replitURL.length == 0 ? "hidden" : "grid gap-2"}`}>
              <Label>Replit URL</Label>
              <a href={user.replitURL} className='hover:cursor-pointer hover:rounded-none hover:underline'>
                <Input type="text" defaultValue={user.replitURL} disabled />
              </a>
            </div>

            <div className={`${user.stackoverflowURL == null || user.stackoverflowURL.length == 0 ? "hidden" : "grid gap-2"}`}>
              <Label>Stack Overflow URL</Label>
              <a href={user.stackoverflowURL} className='hover:cursor-pointer hover:rounded-none hover:underline'>
                <Input type="text" defaultValue={user.stackoverflowURL} disabled />
              </a>
            </div>

            

          </div>
        </div>
      </div>

    </>
  )
}

export default Profile