import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// The Protected component is used to guard routes based on the user's authentication status.
const Protected = ({ children, authentication = true }) => {
  const [loading, setLoading] = useState(true);

  const authStatus = useSelector((state) => state.auth.status);

  const navigate = useNavigate();

  useEffect(() => {
    // If the route requires authentication and the user's authentication status does not match, redirect to the login page.
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    }
    // If the route is for unauthenticated users and the user is authenticated, redirect to the homepage.
    else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    // Once the check is complete, set loading to false to stop showing the loading message.
    setLoading(false);
  });

  // Once the check is complete, render the children components, allowing access to the protected content.
  return loading ? <div>Loading...</div> : <>{children}</>;
};

export default Protected;
