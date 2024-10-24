import Lock from "../assets/icons/Lock.svg";
import Google from "../assets/icons/Google.svg";
import Facebook from "../assets/icons/Facebook.svg";
import Github from "../assets/icons/Github.svg";
import Twitter from "../assets/icons/Twitter.svg";
import PropTypes from "prop-types";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import UserContext from "../context/UserContext";
function Login({ toggleDarkMode, logo, modeLogo }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    loginLocal,
    authenticateGoogle,
    authenticateFacebook,
    authenticateGitHub,
    authenticateTwitter,
    btnLoading,
  } = useContext(UserContext);

  const loginHandler = () => {
    loginLocal({ email, password });
  };

  const loginWithSocialLinks = (str) => {
    if (str === "google") authenticateGoogle();
    else if (str === "github") authenticateGitHub();
    else if (str === "facebook") authenticateFacebook();
    else if (str === "twitter") authenticateTwitter();
  };

  return (
    <div className='flex flex-col justify-center items-center h-[100lvh] bg-light-light-bg dark:bg-dark-dark-bg'>
      <div className='min-[500px]:w-[29rem] w-full px-3 overflow-auto'>
        <div className=' tracking-[-0.0393rem] p-5 min-[500px]:p-8 sm:p-12 space-y-6 border border-border-color rounded-3xl shadow '>
          <div className='flex justify-between'>
            <img src={logo} alt='' />
            <img
              src={modeLogo}
              className='w-6 hover:cursor-pointer'
              onClick={toggleDarkMode}
              alt='sun'
            />
          </div>
          <h4 className='text-lg font-semibold font-noto max-w-xs text-light-dark dark:text-dark-dark'>
            Login
          </h4>
          <div className='inputs'>
            <div className='email relative mb-6'>
              <div className='absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none'>
                <svg
                  className='w-4 h-4 text-gray-500'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 20 16'>
                  <path d='m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z' />
                  <path d='M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z' />
                </svg>
              </div>
              <input
                type='text'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className='bg-gray-50 border border-gray-300 outline-none text-light-light bg-inherit text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5'
                placeholder='Email'
                required
              />
            </div>
            <div className='relative mb-6'>
              <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                <img src={Lock} className='w-6 h-6 ' alt='' />
              </div>
              <input
                type='password'
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className='bg-gray-50 border border-gray-300 text-light-light bg-inherit outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5'
                placeholder='Password'
                required
              />
            </div>
            <button
              type='button'
              disabled={btnLoading}
              onClick={loginHandler}
              className={`relative ${
                btnLoading ? "cursor-not-allowed" : ""
              } bg-light-link text-white w-full py-2 rounded-md font-semibold`}>
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
          <div className='social-login space-y-6'>
            <p className='text-light-light text-center'>
              or continue with these social profile
            </p>
            <div className='social-links flex justify-between'>
              <img
                src={Google}
                className='hover:cursor-pointer'
                onClick={() => {
                  loginWithSocialLinks("google");
                }}
                alt='google'
              />
              <img
                src={Facebook}
                className='hover:cursor-pointer'
                onClick={() => {
                  loginWithSocialLinks("facebook");
                }}
                alt='facebook'
              />
              <img
                src={Twitter}
                className='hover:cursor-pointer'
                onClick={() => {
                  loginWithSocialLinks("twitter");
                }}
                alt='twritter'
              />
              <img
                src={Github}
                className='hover:cursor-pointer'
                onClick={() => {
                  loginWithSocialLinks("github");
                }}
                alt='github'
              />
            </div>
            <p className='already-account text-center text-light-light'>
              Don’t have an account yet?{" "}
              <Link to='/register' className='text-light-link'>
                Register
              </Link>
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

Login.propTypes = {
  toggleDarkMode: PropTypes.func,
  modeLogo: PropTypes.string,
  logo: PropTypes.string,
};

export default Login;
