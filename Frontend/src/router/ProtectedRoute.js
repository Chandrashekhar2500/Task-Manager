import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import AppDispatcher from "../redux/dispatchers/appDispatcher";
import { getCookie, setCookie } from "../components/Cookie";

const ProtectedRoute = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const userToken = getCookie("token");
  const isLoggedIn = useSelector(state => state.loginReducer.isLoggedIn);
  isLoggedIn ? setCookie('path', location.pathname) : setCookie('path', '/')

  useEffect(() => {
    const checkUserToken = () => {
      if (!userToken || userToken === undefined) {
        AppDispatcher.updateLoginStatus(false);
        return navigate("/");
      } else {
        AppDispatcher.updateLoginStatus(true);
      }
    };
    checkUserToken();
  }, [userToken]);

  return <>{isLoggedIn ? props.children : navigate("/")}</>;
};

export default ProtectedRoute;

