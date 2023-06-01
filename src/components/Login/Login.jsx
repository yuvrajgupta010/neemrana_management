"use client";

import { useContext } from "react";

import classes from "./Login.module.css";

import { loginInputVerification } from "@/util/formVerification";
import LoginForm from "../UI/Form/LoginForm/LoginForm";
import Status from "../UI/Status/Status";

import StatusCtx from "@/ctxStore/statusCtx";
import AuthCtx from "@/ctxStore/authCtx";

const Login = (props) => {
  const { haveError, haveStatus, message, setStatusMessage } =
    useContext(StatusCtx);
  const { makeUserLogIn } = useContext(AuthCtx);
  const { formType } = props;

  const formDataHandler = (data) => {
    const verificationResult = loginInputVerification(data);
    if (verificationResult.error) {
      setStatusMessage(verificationResult.message, true);
      return;
    }

    fetch("http://localhost:4000/management/login", {
      method: "POST",
      body: JSON.stringify({ username: data.email, password: data.password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 401) {
            throw new Error("Please enter correct password !");
          } else if (res.status === 404) {
            throw new Error(
              "User does not exist ! Please check enter right username."
            );
          }
        }
        return res.json();
      })
      .then((data) => {
        makeUserLogIn(data);
      })
      .catch((err) => {
        setStatusMessage(err.message, true);
        console.error(err.message);
      });
  };

  return (
    <section className={classes.section}>
      {haveStatus ? <Status error={haveError} message={message} /> : ""}
      <LoginForm
        formHeading={
          formType === "employee"
            ? "Employee Login"
            : formType === "admin"
            ? "Admin Login"
            : ""
        }
        formDataHandler={formDataHandler}
      />
    </section>
  );
};

export default Login;
