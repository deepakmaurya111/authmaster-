import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import backArrow from "../assets/icons/backArrow.svg";
import Footer from "../components/Footer";
import UserContext from "../context/UserContext";
import dummyPhoto from "../assets/icons/dummyPhoto.png";
function EditProfile() {
  const { user, updateProfile, btnLoading } = useContext(UserContext);

  const [showFile, setShowFile] = useState(
    user?.photo?.secure_url || dummyPhoto
  );
  const [fileOption, setFileOption] = useState("upload"); // 'upload' or 'link'

  const [selectFile, setSelectFile] = useState("");
  const [fileLink, setFileLink] = useState("");
  const [file, setFile] = useState("");

  const [editUser, setEditUser] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    bio: user?.bio || "",
    password: "",
  });

  const editUserHandler = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };

  const updateHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", editUser.name);
    formData.append("phone", editUser.phone);
    formData.append("bio", editUser.bio);

    if (!user.loginWith && user.loginWith !== "network") {
      formData.append("email", editUser.email);
      formData.append("password", editUser.password);
    }

    if (fileOption === "upload" && showFile !== "") {
      formData.append("file", file);
    } else if (fileOption === "link" && showFile !== "") {
      formData.append("imageUrl", fileLink);
    }

    await updateProfile(formData);
  };

  const handleFileChange = (event) => {
    const myFile = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setFile(myFile);
      setSelectFile(e.target.result);
      setShowFile(e.target.result);
    };

    if (myFile) {
      reader.readAsDataURL(myFile);
    }
  };

  const handleFileOptionChange = (option) => {
    if (option === "link") {
      setShowFile(fileLink);
    } else {
      setShowFile(selectFile);
    }
    setFileOption(option);
  };

  const handleFileLinkChange = (event) => {
    setFileLink(event.target.value);
    setShowFile(event.target.value);
  };

  return (
    <section className='profile px-[3%] -mt-0.5 md:px-[5%] flex-col pb-12 flex justify-center items-center bg-light-light-bg dark:bg-dark-dark-bg'>
      <div className='go-back w-[90%] min-[900px]:w-[55rem] '>
        <Link to='/' className='flex items-center'>
          <img src={backArrow} alt='' />
          <p className='text-xl tracking-[-0.03938rem] text-light-link ml-1'>
            Back
          </p>
        </Link>
      </div>
      <div className='info w-[90%] min-[900px]:w-[55rem] px-8 py-5 mt-5 border border-light-border rounded-lg space-y-5'>
        <div className='title text-black dark:text-dark-dark'>
          <h1 className='text-2xl font-noto tracking-[-0.0525rem]'>
            Change Info
          </h1>
          <p className='text-light-light tracking-[-0.02844rem] text-sm mt-1'>
            Changes will be reflected to every services
          </p>
        </div>

        <div className='image flex space-x-5 items-center'>
          <label htmlFor='file' className='relative overflow-hidden'>
            <img
              src={showFile || dummyPhoto}
              alt='system-or-link'
              className='w-[4.5rem] h-[4.5rem] object-cover shrink-0 rounded-md'
            />
            {fileOption === "upload" && (
              <input
                type='file'
                name='avatar'
                id='file'
                className='opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer'
                onChange={handleFileChange}
              />
            )}
          </label>
          <div>
            <p className='text-light-light tracking-[-0.02844rem] text-sm uppercase font-noto'>
              Change photo
            </p>
            <div className='mt-2 flex flex-wrap'>
              <label className=' mr-2 text-light-dark dark:text-dark-dark'>
                <input
                  type='radio'
                  name='fileOption'
                  value='upload'
                  className='mr-1 hover:cursor-pointer'
                  checked={fileOption === "upload"}
                  onChange={() => handleFileOptionChange("upload")}
                />
                Upload
              </label>
              <label className='text-light-dark dark:text-dark-dark'>
                <input
                  type='radio'
                  name='fileOption'
                  value='link'
                  className='mr-1 hover:cursor-pointer'
                  checked={fileOption === "link"}
                  onChange={() => handleFileOptionChange("link")}
                />
                Link
              </label>
            </div>
            {fileOption === "link" && (
              <input
                type='text'
                placeholder='Enter file link'
                className='mt-2 border border-light-border px-2 rounded-md p-1 w-full bg-inherit focus:outline-none'
                value={fileLink}
                onChange={handleFileLinkChange}
              />
            )}
          </div>
        </div>
        <div className='name flex flex-col max-w-md'>
          <label
            htmlFor='name'
            className='text-light-dark my-1 dark:text-dark-dark'>
            Name
          </label>
          <input
            type='text'
            value={editUser.name}
            name='name'
            onChange={editUserHandler}
            className='border text-light-light bg-inherit focus:outline-none border-light-border p-3 rounded-lg'
            placeholder='Enter your name...'
          />
        </div>
        <div className='bio flex flex-col max-w-md'>
          <label
            htmlFor='bio'
            className='text-light-dark my-1 dark:text-dark-dark'>
            Bio
          </label>
          <textarea
            rows='auto'
            value={editUser.bio}
            name='bio'
            onChange={editUserHandler}
            className='border text-light-light bg-inherit focus:outline-none border-light-border p-3 rounded-lg'
            placeholder='Enter your bio...'></textarea>
        </div>
        <div className='phone flex flex-col max-w-md'>
          <label
            htmlFor='phone'
            className='text-light-dark my-1 dark:text-dark-dark'>
            Phone
          </label>
          <input
            type='text'
            name='phone'
            value={editUser.phone}
            onChange={editUserHandler}
            className='border text-light-light bg-inherit focus:outline-none border-light-border p-3 rounded-lg'
            placeholder='Enter your phone...'
          />
        </div>
        <div className='email flex flex-col max-w-md'>
          <label
            htmlFor='email'
            className='text-light-dark my-1 dark:text-dark-dark'>
            Email
          </label>
          <input
            type='email'
            readOnly={user.loginWith && user.loginWith === "network"}
            name='email'
            value={editUser.email}
            onChange={editUserHandler}
            className={`border text-light-light ${
              user.loginWith &&
              user.loginWith === "network" &&
              "hover:cursor-not-allowed"
            } bg-inherit focus:outline-none border-light-border p-3 rounded-lg`}
            placeholder='Enter your email...'
          />
        </div>
        <div className='password flex flex-col max-w-md'>
          <label
            htmlFor='password'
            className='text-light-dark my-1 dark:text-dark-dark'>
            Password
          </label>
          <input
            type='password'
            readOnly={user.loginWith && user.loginWith === "network"}
            name='password'
            value={editUser?.password || "******"}
            onChange={editUserHandler}
            className={`border ${
              user.loginWith &&
              user.loginWith === "network" &&
              "hover:cursor-not-allowed"
            }  text-light-light bg-inherit focus:outline-none border-light-border p-3 rounded-lg`}
            placeholder='Enter your password...'
          />
        </div>
        <div className='btn'>
          <button
            type='button'
            disabled={btnLoading}
            onClick={(e) => {
              updateHandler(e);
            }}
            className='text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 inline-flex items-center'>
            <svg
              aria-hidden='true'
              role='status'
              className={`inline w-4 h-4 mr-3 text-white animate-spin ${
                btnLoading ? " " : "hidden"
              }`}
              viewBox='0 0 100 101'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                fill='#E5E7EB'
              />
              <path
                d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                fill='currentColor'
              />
            </svg>
            {btnLoading ? "Loading..." : "Save"}
          </button>
        </div>
      </div>
      <div className='footer w-[90%] min-[900px]:w-[55rem] py-3 '>
        <Footer />
      </div>
    </section>
  );
}

export default EditProfile;
