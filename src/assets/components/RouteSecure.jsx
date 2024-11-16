import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../redux/reducers/userSlices";

const RouteSecure = ({ children }) => {
    const userInfo = useSelector(selectUserInfo);
    const location = useLocation();
   
    return userInfo ? (
        children
    ) : (
        <Navigate to="/login" state={{ from: location.pathname }} replace />
    );
};

export default RouteSecure;