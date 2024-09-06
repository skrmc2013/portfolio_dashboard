import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SpecialLoadingButton from './SpecialLoadingButton';
import { Link } from 'react-router-dom';
import { clearAllUserErrors, createProfile, getUser, resetProfile, } from '@/store/slices/userSlice';
import { toast } from 'react-toastify';

const CreateProfile = () => {

  const { isAuthenticated, loading, isCreated, message, error, user } = useSelector(state => state.user);
  const [fullName, setFullName] = useState(user && user.fullName);
  const [email, setEmail] = useState(user && user.email);
  const [password, setPassword] = useState(user && user.email);
  const [phone, setPhone] = useState(user && user.phone);
  const [aboutMe, setAboutMe] = useState(user && user.aboutMe);
  const [portfolioUrl, setPortfolioUrl] = useState(user && user.portfolioUrl);
  const [githubURL, setGithubURL] = useState(user && user.githubURL);
  const [linkedInURL, setLinkedInURL] = useState(user.linkedInURL === "undefined" || user.linkedInURL == null ? " " : user.linkedInURL);
  const [facebookURL, setFacebookURL] = useState(user.facebookURL === "undefined" || user.facebookURL == null ? " " : user.facebookURL);
  const [whatsappURL, setWhatsappURL] = useState(user.whatsappURL === "undefined" || user.whatsappURL == null ? " " : user.whatsappURL);
  const [instagramURL, setInstagramURL] = useState(user.instagramURL === "undefined" || user.instagramURL == null ? " " : user.instagramURL);
  const [twitterURL, setTwitterURL] = useState(user.twitterURL === "undefined" || user.twitterURL == null ? " " : user.twitterURL);
  const [replitURL, setReplitURL] = useState(user.replitURL === "undefined" || user.replitURL == null ? " " : user.replitURL);
  const [telegramURL, setTelegramURL] = useState(user.telegramURL === "undefined" || user.telegramURL == null ? " " : user.telegramURL);
  const [stackoverflowURL, setStackOverFlowURL] = useState(user.stackoverflowURL === "undefined" || user.stackoverflowURL == null ? " " : user.stackoverflowURL);
  const [avatar, setAvatar] = useState(user && user.avatar && user.avatar.url);
  const [avatarPreview, setAvatarPreview] = useState(user && user.avatar && user.avatar.url);
  const [resume, setResume] = useState(user && user.resume && user.resume.url);
  const [resumePreview, setResumePreview] = useState(user && user.resume && user.resume.url);


  const dispatch = useDispatch();

  const avatarHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setAvatarPreview(reader.result);
      setAvatar(file);
    };
  }
  const resumeHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setResumePreview(reader.result);
      setResume(file);
    };
  }

  const handleUpdateProfileData = ()=> {
const formData = new FormData();
formData.append("fullName", fullName);
formData.append("email",email);
formData.append("password",password);
formData.append("aboutMe",aboutMe);
formData.append("phone", phone);
formData.append("portfolioUrl", portfolioUrl);
formData.append("linkedInURL", linkedInURL);
formData.append("githubURL", githubURL);
formData.append("instagramURL", instagramURL);
formData.append("twitterURL", twitterURL);
formData.append("whatsappURL", whatsappURL);
formData.append("facebookURL", facebookURL);
formData.append("telegramURL", telegramURL);
formData.append("replitURL", replitURL);
formData.append("stackoverflowURL", stackoverflowURL);
formData.append("avatar", avatar);
formData.append("resume", resume);

dispatch(createProfile(formData));
  };

  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch(clearAllUserErrors());

    }
    if(isCreated){
    //   dispatch(getUser());
    //   console.log("User Data is :::", dispatch(getUser()));
    //   dispatch(resetProfile());
    }
    if(message){
      toast.success(message);
    }


  }, [dispatch, loading, error ]);

  return (
    <>

      <div className='w-full h-full' >
        <div>
          <div className='grid w-[100%] gap-6 '>
            <div className='grid gap-2' >
              <h1 className='text-3xl font-bold'>Create Profile</h1>
              <p className='mb-5'>Create New Profile</p>
            </div>
          </div>

          <div className='grid gap-6'>

            <div className='flex items-center lg:justify-between lg:items-center flex-col lg:flex-row gap-5 '>

              <div className='grid gap-2 w-full sm:w-72'>
                <Label>Profle Image</Label>
                <img src={avatarPreview ? avatarPreview : "./avg.png"} alt={user && user.fullName ? user.fullName : "Khateeb's picture"} className='w-full h-auto rounded-2xl sm:h-72 ' />
                <div className='relative'>
                  <input type='file' className='avatar-update-btn' onChange={avatarHandler} />

                </div>
              </div>

              <div className='grid gap-2 w-full sm:w-72'>
                <Label>Resume</Label>
                <Link to={user && user.resume && user.resume.url} target="_blank" >
                  <img src={resumePreview ? resumePreview : "./avg.png"} alt="Khateeb's Resume" className='w-full h-auto rounded-2xl sm:h-72 ' />
                </Link>

                <div className='realtive'>
                  <input type='file' className='avatar-update-btn' onChange={resumeHandler} />

                </div>
              </div>

            </div>

            <div className='grid gap-2' >
              <Label>Full Name</Label>
              <Input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>
            <div className='grid gap-2' >
              <Label>About me</Label>
              <Textarea type="text"value={aboutMe} onChange={(e) => setAboutMe(e.target.value)} />
            </div>

            <div className='grid gap-2' >
              <Label>Email</Label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='grid gap-2' >
              <Label>Password</Label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div className='grid gap-2' >
              <Label>Phone Number</Label>
              <Input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>

            <div className='grid gap-2' >
              <Label>Portfolio URL</Label>
              <Input type="text" value={portfolioUrl} onChange={(e) => setPortfolioUrl(e.target.value)} />
            </div>
            <div className='grid gap-2' >
              <Label>Github URL</Label>
              <Input type="text" value={githubURL} onChange={(e) => setGithubURL(e.target.value)} />
            </div>
            <div className='grid gap-2' >
              <Label>LinkedIn URL</Label>
              <Input type="text" value={linkedInURL} onChange={(e) => setLinkedInURL(e.target.value)} />
            </div>
            <div className='grid gap-2' >
              <Label>Facebook URL</Label>
              <Input type="text" value={facebookURL} onChange={(e) => setFacebookURL(e.target.value)} />
            </div>
            <div className='grid gap-2' >
              <Label>Whatsapp URL</Label>
              <Input type="text" value={whatsappURL} onChange={(e) => setWhatsappURL(e.target.value)} />
            </div>
            <div className='grid gap-2' >
              <Label>Instagram URL</Label>
              <Input type="text" value={instagramURL} onChange={(e) => setInstagramURL(e.target.value)} />
            </div>
            <div className='grid gap-2' >
              <Label>Telegram URL</Label>
              <Input type="text" value={telegramURL} onChange={(e) => setTelegramURL(e.target.value)} />
            </div>
            <div className='grid gap-2' >
              <Label>Twitter URL</Label>
              <Input type="text" value={twitterURL} onChange={(e) => setTwitterURL(e.target.value)} />
            </div>
            <div className='grid gap-2' >
              <Label>Replit URL</Label>
              <Input type="text" value={replitURL} onChange={(e) => setReplitURL(e.target.value)} />
            </div>
            <div className='grid gap-2' >
              <Label>Stack Overflow URL</Label>
              <Input type="text" value={stackoverflowURL} onChange={(e) => setStackOverFlowURL(e.target.value)} />
            </div>



            <div className='grid grid-2'>
{
  !loading? (<Button onClick={handleUpdateProfileData} className="w-full" type="submit" >Create Profile</Button>) : (<SpecialLoadingButton content={"Updating Profile... Please Wait"}/>)
}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateProfile