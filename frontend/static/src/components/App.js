import { handleError } from "./../utils.js";

import Header from "./Header";

import { useNavigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";

import { useState } from "react";
import Cookies from "js-cookie";

function App() {
  const navigate = useNavigate();
  const [isAuth, setAuth] = useState(null);
  const [isAdmin, setAdmin] = useState(null);

  const checkAuth = async () => {
    const response = await fetch("/rest-auth/user/");
    if (!response.ok) {
      setAuth(false);
      return;
    }
    const data = await response.json();
    setAuth(true);
    setAdmin(data.is_superuser);
  };

  useEffect(() => {
    setTimeout(checkAuth, 500);
  }, []);

  const handleLogout = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };

    const response = await fetch("/rest-auth/logout/", options).catch(
      handleError
    );

    if (!response.ok) {
      throw new Error("Uh, oh! Something went wrong!");
    }

    setAuth(false);
    Cookies.remove("Authorization");
  };

  if (isAuth === null) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  const headerProps = {
    isAuth,
    isAdmin,
    setAuth,
    handleLogout,
  };

  const contextProps = {
    isAdmin,
    isAuth,
    setAdmin,
    setAuth,
    navigate,
  };

  return (
    <>
      <Header {...headerProps} />
      <Outlet context={{ ...contextProps }} />
    </>
  );
}

export default App;
