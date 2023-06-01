import { useState } from "react";
import StatusCtx from "./statusCtx";

const StatusCtxProvider = (props) => {
  const [haveStatus, setHaveMessage] = useState(false);
  const [haveError, setHaveError] = useState(false);
  const [message, setMessage] = useState("");

  const removeStatusMessage = () => {
    setTimeout(() => {
      setHaveError(false);
      setHaveMessage(false);
      setMessage("");
    }, 4000);
  };
  const removeStatusMessageInstant = () => {
    setHaveError(false);
    setHaveMessage(false);
    setMessage("");
  };

  const setStatusMessage = (message, haveError = false) => {
    setHaveError(haveError);
    setHaveMessage(true);
    setMessage(message);
    removeStatusMessage();
  };

  return (
    <StatusCtx.Provider
      value={{
        haveStatus,
        haveError,
        message,
        removeStatusMessage,
        removeStatusMessageInstant,
        setStatusMessage,
      }}
    >
      {props.children}
    </StatusCtx.Provider>
  );
};

export default StatusCtxProvider;
