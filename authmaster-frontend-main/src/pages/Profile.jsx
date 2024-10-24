import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import dummyPhoto from "../assets/icons/dummyPhoto.png";
function Profile() {
  const { user } = useContext(UserContext);
  const [profilePhoto, setProfilePhoto] = useState(null);

  useEffect(() => {
    setProfilePhoto(user?.photo?.secure_url || dummyPhoto);
  }, [user]);

  return (
    <section className='profile -mt-0.5 sm:px-[3%] md:px-[5%] flex-col flex justify-center items-center bg-light-light-bg dark:bg-dark-dark-bg'>
      <div className='title text-center text-black dark:text-dark-dark'>
        <h1 className='text-2xl md:text-3xl lg:text-4xl font-noto font-normal tracking-[-0.0525rem] sm:tracking-[-0.07875rem]'>
          Personal info
        </h1>
        <p className='font-light text-sm sm:text-lg tracking-[-0.03063rem] sm:tracking-[-0.03938rem]'>
          Basic info, like your name and photo
        </p>
      </div>
      <div className='info sm:w-[90%] min-[900px]:w-[55rem] mt-8 '>
        <div className='profile-edit border border-light-border border-x-0 sm:border-x flex justify-between items-center'>
          <div className='content p-8 '>
            <h2 className=' text-2xl text-black dark:text-dark-dark tracking-[-0.0525rem]'>
              Profile
            </h2>
            <p className='text-light-light text-sm font-medium tracking-[-0.02844rem]'>
              Some info may be visible to other people
            </p>
          </div>
          <Link
            to='/editProfile'
            className='px-4 py-1 mr-5 text-light-light outline-none border border-light-border rounded-lg'>
            Edit
          </Link>
        </div>
        <div className='photo grid grid-cols-3 border border-light-border border-x-0 sm:border-x border-t-0 justify-center items-center py-3 px-8'>
          <div className=' text-light-light tracking-[-0.02844rem] text-sm'>
            Photo
          </div>
          <div className='col-span-2 flex justify-end sm:justify-normal pl-5 text-light-dark dark:text-dark-dark text-lg text-[1rem] font-medium tracking-[-0.035rem] sm:tracking-[-0.03938rem]'>
            <img
              src={profilePhoto}
              alt='profile-photo'
              className='object-cover w-[4.5rem] h-[4.5rem] rounded-md'
            />
          </div>
        </div>
        <div className='name grid grid-cols-3 border border-light-border border-x-0 sm:border-x border-t-0 '>
          <div className='p-8 text-light-light tracking-[-0.02844rem] text-sm'>
            Name
          </div>
          <div className='col-span-2 flex justify-end sm:justify-normal text-light-dark dark:text-dark-dark text-lg text-[1rem] font-medium tracking-[-0.035rem] sm:tracking-[-0.03938rem] phot p-8'>
            {user?.name || "------"}
          </div>
        </div>
        <div className='bio grid grid-cols-3 border border-light-border border-x-0 sm:border-x border-t-0 '>
          <div className='p-8 text-light-light tracking-[-0.02844rem] text-sm'>
            Bio
          </div>

          <div className='col-span-2 flex justify-end sm:justify-normal text-light-dark dark:text-dark-dark text-lg text-[1rem] font-medium tracking-[-0.035rem] sm:tracking-[-0.03938rem] phot p-8'>
            <p className='truncate'>{user?.bio || "------"}</p>
          </div>
        </div>
        <div className='phone grid grid-cols-3 border border-light-border border-x-0 sm:border-x border-t-0 '>
          <div className='p-8 text-light-light tracking-[-0.02844rem] text-sm'>
            Phone
          </div>
          <div className='col-span-2 flex justify-end sm:justify-normal text-light-dark dark:text-dark-dark text-lg text-[1rem] font-medium tracking-[-0.035rem] sm:tracking-[-0.03938rem] phot p-8'>
            <p className='truncate'>{user?.phone || "------"}</p>
          </div>
        </div>
        <div className='email grid grid-cols-3 border border-light-border border-x-0 sm:border-x border-t-0 '>
          <div className='p-8 text-light-light tracking-[-0.02844rem] text-sm'>
            Email
          </div>
          <div className='col-span-2 flex justify-end sm:justify-normal text-light-dark dark:text-dark-dark text-lg text-[1rem] font-medium tracking-[-0.035rem] sm:tracking-[-0.03938rem] phot p-8'>
            <p className='truncate'>{user?.email || "------"}</p>
          </div>
        </div>
        <div className='password grid grid-cols-3 border border-light-border border-x-0 sm:border-x  border-t-0'>
          <div className='p-8 text-light-light tracking-[-0.02844rem] text-sm'>
            Password
          </div>
          <div className='col-span-2 flex justify-end sm:justify-normal text-light-dark dark:text-dark-dark text-lg text-[1rem] font-medium tracking-[-0.035rem] sm:tracking-[-0.03938rem] phot p-8'>
            ************
          </div>
        </div>
        <div className='footer px-8 sm:px-0'>
          <Footer />
        </div>
      </div>
    </section>
  );
}

export default Profile;
