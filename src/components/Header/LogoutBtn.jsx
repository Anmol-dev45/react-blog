import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <button
      className="px-4 py-2 border-2 border-orange-500 bg-transparent rounded-md"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
};

export default LogoutBtn;
