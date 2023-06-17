"use client";

import { useEffect, useState } from "react";
import AuthCtx from "./authCtx";
import { useRouter } from "next/navigation";

const AuthCtxProvider = (props) => {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [employeeId, setEmployeeId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken !== null) {
      fetch("https://neemrana-hotel-api.onrender.com/management/get-data", {
        method: "GET",
        headers: {
          Authorization: storedToken,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Not a valid user !");
          }
          return res.json();
        })
        .then((data) => {
          setName(data.name);
          setIsAdmin(data.isAdmin);
          setEmployeeId(data.employeeId);
          setToken(storedToken);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          localStorage.removeItem("token");
          router.push("/");
          console.error(err.message);
        });
    }
    setFirstRender(false);
  }, []);

  const makeUserLogIn = ({ name, isAdmin, employeeId, token }) => {
    localStorage.setItem("token", token);

    setName(name);
    setIsAdmin(isAdmin);
    setEmployeeId(employeeId);
    setToken(token);
    setIsLoggedIn(true);

    router.push("/");
  };

  const makeUserLogOut = () => {
    localStorage.removeItem("token");

    setName("");
    setIsAdmin(false);
    setEmployeeId(0);
    setToken("");
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <AuthCtx.Provider
      value={{
        name,
        isAdmin,
        employeeId,
        token,
        isLoggedIn,
        makeUserLogIn,
        makeUserLogOut,
      }}
    >
      {firstRender ? "" : props.children}
    </AuthCtx.Provider>
  );
};

export default AuthCtxProvider;
