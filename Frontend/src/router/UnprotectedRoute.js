import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getCookie } from "../components/Cookie";


const UnprotectedRoute = (props) => {
	const navigate = useNavigate();
	const location = useLocation();
	const userToken = getCookie("token");

	useEffect(() => {
		userToken ? navigate(getCookie('path')) : navigate(location.pathname)
	}, [userToken]);

	return <>{props.children}</>;
};

export default UnprotectedRoute;
