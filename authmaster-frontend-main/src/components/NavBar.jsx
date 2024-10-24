import userIcon from "../assets/icons/user.svg";
import group from "../assets/icons/group.svg";
import logout from "../assets/icons/logout.svg";
import dummyPhoto from "../assets/icons/dummyPhoto.png";

import { useContext, useState } from "react";
import PropTypes from "prop-types";
import UserContext from "../context/UserContext";

export default function NavBar({ toggleDarkMode, modeLogo, logo, dropDown }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { logout: userLogout, user } = useContext(UserContext);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const logoutHandler = () => {
    userLogout();
  };

  return (
    <nav className='px-[5%] flex justify-between py-5 font-noto bg-light-light-bg dark:bg-dark-dark-bg'>
      <img src={logo} alt='logo' />
      <div className='relative flex space-x-2 items-center'>
        <div className='darkMode-icon'>
          <img
            src={modeLogo}
            className='w-6 hover:cursor-pointer flex-shrink-0'
            onClick={toggleDarkMode}
            alt='sun'
          />
        </div>
        <button
          onClick={toggleDropdown}
          className='px-4 py-2 rounded-md focus:outline-none flex space-x-2 items-center'>
          <img
            src={user?.photo?.secure_url || dummyPhoto}
            className='object-cover w-8 h-8 rounded-md'
          />
          <p className='text-light-dark  hidden sm:block dark:text-dark-dark font-bold text-xs'>
            {user?.name || "Name"}
          </p>
          <p className='icon hidden sm:block'>
            <img src={dropDown} className='text-white' alt='' />
          </p>
        </button>

        <div
          className={`${
            isDropdownOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2 pointer-events-none"
          } transition-all duration-300 absolute top-10 right-0 mt-2  bg-white dark:bg-dark-dark-bg border border-gray-300 rounded-md shadow-lg`}>
          {/* Dropdown content */}
          <ul className='p-2 pl-1 w-[max-content] space-y-3 text-light-light dark:text-dark-dark font-medium tracking-[-0.026rem] text-xs'>
            <li className='px-4 py-2 hover:bg-gray-100 transition-all flex space-x-2 items-center hover:cursor-pointer hover:dark:bg-dark-hover rounded-lg'>
              <img src={userIcon} alt='' className='flex-shrink-0' />
              <p className='flex-shrink-0'>{user?.name || "Name"}</p>
            </li>
            <li className='px-4 py-2 hover:bg-gray-100 transition-all flex space-x-2 items-center hover:cursor-pointer hover:dark:bg-dark-hover rounded-lg'>
              <img src={group} alt='' className='flex-shrink-0' />
              <p className='flex-shrink-0'>Group Chat</p>
            </li>
            <li
              onClick={() => {
                logoutHandler();
              }}
              className='px-4 py-2 hover:bg-gray-100 transition-all flex space-x-2 items-center hover:cursor-pointer hover:dark:bg-dark-hover rounded-lg'>
              <img src={logout} alt='' className='flex-shrink-0' />
              <p className='flex-shrink-0'>Logout</p>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

NavBar.propTypes = {
  toggleDarkMode: PropTypes.func,
  modeLogo: PropTypes.string,
  logo: PropTypes.string,
  dropDown: PropTypes.string,
};
