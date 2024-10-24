import { ToastContainer } from "react-toastify";
import { Navigate, Route, Routes as Router } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import devIconDark from "./assets/icons/devchallenges.svg";
import devIconLight from "./assets/icons/devchallenges-light.svg";
import dropDown from "./assets/icons/dropDown.svg";
import dropDownLight from "./assets/icons/dropDownLight.svg";
import Sun from "./assets/icons/Sun.svg";
import Moon from "./assets/icons/Moon.svg";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import ErrorPage from "./pages/ErrorPage";
import UserContext from "./context/UserContext";
import Loading from "./components/Loading";
import "react-toastify/dist/ReactToastify.css";

export default function Routes() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [logo, setLogo] = useState(isDarkMode ? devIconLight : devIconDark);

  const [dropDownIcon, setDropDownIcon] = useState(
    isDarkMode ? dropDownLight : dropDown
  );

  const { isLoading, user, getProfile } = useContext(UserContext);

  useEffect(() => {
    setLogo(isDarkMode ? devIconLight : devIconDark);
    setDropDownIcon(isDarkMode ? dropDownLight : dropDown);
  }, [isDarkMode]);

  useEffect(() => {
    // Add event listener to detect system preference changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemPreferenceChange = (event) => {
      setIsDarkMode(event.matches);
    };

    mediaQuery.addEventListener("change", handleSystemPreferenceChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemPreferenceChange);
    };
  }, []);

  const [modeLogo, setModeLogo] = useState(isDarkMode ? Sun : Moon);

  useEffect(() => {
    setModeLogo(isDarkMode ? Sun : Moon);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
  };

  useEffect(() => {
    if (!user) {
      getProfile();
    }
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <ToastContainer position='top-right' autoClose={3000} />
      <Router>
        <Route
          path='/'
          element={
            user ? (
              <>
                {" "}
                <NavBar
                  toggleDarkMode={toggleDarkMode}
                  modeLogo={modeLogo}
                  logo={logo}
                  dropDown={dropDownIcon}
                />{" "}
                <Profile />
              </>
            ) : (
              <Navigate to='/login' />
            )
          }
        />
        <Route
          path='/editProfile'
          element={
            user ? (
              <>
                <NavBar
                  toggleDarkMode={toggleDarkMode}
                  modeLogo={modeLogo}
                  logo={logo}
                  dropDown={dropDown}
                />
                <EditProfile />
              </>
            ) : (
              <Navigate to='/login' />
            )
          }
        />
        <Route
          path='/register'
          element={
            user ? (
              <Navigate to='/' />
            ) : (
              <Register
                toggleDarkMode={toggleDarkMode}
                isDarkMode={isDarkMode}
                modeLogo={modeLogo}
                logo={logo}
              />
            )
          }
        />
        <Route
          path='/login'
          element={
            user ? (
              <Navigate to='/' />
            ) : (
              <Login
                toggleDarkMode={toggleDarkMode}
                isDarkMode={isDarkMode}
                modeLogo={modeLogo}
                logo={logo}
              />
            )
          }
        />
        <Route path='*' element={<ErrorPage />} />
      </Router>
    </>
  );
}
