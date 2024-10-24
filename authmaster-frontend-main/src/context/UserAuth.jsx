import { useState } from "react";
import axios from "axios";
import UserContext from "./UserContext";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function UserAuth({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);

  const navigate = useNavigate();

  const url = import.meta.env.VITE_REACT_APP_API_KEY;

  // Function to register a new user using local strategy
  const registerLocal = async (userData) => {
    try {
      setBtnLoading(true);
      const { data } = await axios.post(url + "/auth/register", userData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setBtnLoading(false);
      toast.success(data.msg);
      toast.success("Please Login First");
      navigate("/login");
    } catch (error) {
      toast.success(error.response.data.errors);
    }
    setBtnLoading(false);
  };

  // Function to login a user using local strategy
  const loginLocal = async (userData) => {
    try {
      setBtnLoading(true);
      const { data } = await axios.post(url + "/auth/login", userData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      setBtnLoading(false);
      setUser(data.user);
      toast.success(data.msg);
    } catch (error) {
      toast.error(
        error.response.data.error
          ? error.response.data.error
          : error.response.data
      );
    }
    setBtnLoading(false);
  };

  // Function to authenticate with GitHub strategy
  const authenticateGitHub = async () => {
    window.open(url + "/auth/github", "_self");
  };

  // Function to authenticate with GitHub strategy
  const authenticateTwitter = async () => {
    window.open(url + "/auth/twitter", "_self");
  };

  // Function to authenticate with Facebook strategy
  const authenticateFacebook = async () => {
    window.open(url + "/auth/facebook", "_self");
  };

  // Function to authenticate with Google strategy
  const authenticateGoogle = async () => {
    window.open(url + "/auth/google", "_self");
  };

  // Function to get the user's profile
  const getProfile = async () => {
    try {
      setBtnLoading(true);
      setIsLoading(true);
      const { data } = await axios.get(url + "/profile", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setBtnLoading(false);
      setIsLoading(false);
      setUser(data.user);
      toast.success(data.msg);
    } catch (error) {
      setIsLoading(false);
      navigate("/login");
    }
    setBtnLoading(false);
    setIsLoading(false);
  };

  // Function to update the user's profile
  const updateProfile = async (updatedData) => {
    try {
      setBtnLoading(true);
      const response = await axios.patch(url + "/profile", updatedData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      setUser(response.data.user);
      toast(response.data.msg);
    } catch (error) {
      toast(error.response.data.error);
    }
    setBtnLoading(false);
  };

  // Function to update the user's profile
  const logout = async () => {
    try {
      const { data } = await axios.get(url + "/auth/logout", {
        withCredentials: true,
      });
      setUser(null);
      toast.success(data.msg || data.error);
      navigate("/login");
    } catch (error) {
      toast.success(error.response.data.error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        isLoading,
        btnLoading,
        user,
        registerLocal,
        loginLocal,
        authenticateGitHub,
        authenticateTwitter,
        authenticateFacebook,
        authenticateGoogle,
        getProfile,
        updateProfile,
        logout,
      }}>
      {children}
    </UserContext.Provider>
  );
}

UserAuth.propTypes = {
  children: PropTypes.object,
};

export default UserAuth;
