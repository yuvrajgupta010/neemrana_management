import React from "react";

const AuthCtx = React.createContext({
  name: "",
  isAdmin: false,
  token: "",
  isLoggedIn: false,
  employeeId: 0,
  makeUserLogIn: () => {},
  makeUserLogOut: () => {},
});

export default AuthCtx;
