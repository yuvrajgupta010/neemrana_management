import React from "react";

const StatusCtx = React.createContext({
  haveError: false,
  haveStatus: false,
  message: "",
  setStatusMessage: () => {},
  removeStatusMessage: () => {},
  removeStatusMessageInstant: () => {},
});

export default StatusCtx;
