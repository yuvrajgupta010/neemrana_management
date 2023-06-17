"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

import classes from "./CreateUser.module.css";
import AuthCtx from "@/ctxStore/authCtx";
import StatusCtx from "@/ctxStore/statusCtx";
import Status from "../UI/Status/Status";

const CreateUser = (props) => {
  const { haveError, haveStatus, message, setStatusMessage } =
    useContext(StatusCtx);
  const { token } = useContext(AuthCtx);
  const [accountType, setAccountType] = useState("employee");
  const [name, setName] = useState("");
  const [governmentId, setGovernmentId] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handler = (setState) => (event) => {
    setState(event.target.value);
  };

  const formResetHandler = (event) => {
    event.preventDefault();
    setName("");
    setAccountType("employee");
    setGovernmentId("");
    setAge("");
    setAddress("");
    setUsername("");
    setPassword("");
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const isAdmin = accountType === "admin";

    setStatusMessage("Loading...", false);
    fetch("https://neemrana-hotel-api.onrender.com/management/create-user", {
      method: "POST",
      body: JSON.stringify({
        isAdmin,
        username,
        name,
        governmentId,
        age,
        password,
        address,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => {
        if (!res.ok && res.status === 409) {
          throw new Error("username already exists !");
        }
        return res.json();
      })
      .then((data) => {
        setStatusMessage(data.message, false);
      })
      .catch((err) => {
        setStatusMessage(err.message, true);
        console.error(err.message);
      });
    formResetHandler(event);
  };

  return (
    <section
      className={classes.section}
      onSubmit={formSubmitHandler}
      onReset={formResetHandler}
    >
      <h2 className={classes.secondary_heading}>Create User</h2>
      {haveStatus ? <Status error={haveError} message={message} /> : ""}

      <form className={classes.form}>
        <label className={classes.label} htmlFor="accountType">
          Account type
        </label>
        <select
          onChange={handler(setAccountType)}
          value={accountType}
          className={classes.input}
          name="accountType"
          id="accountType"
        >
          <option value="admin">Admin</option>
          <option value="employee">Employee</option>
        </select>
        <label className={classes.label} htmlFor="name">
          Name
        </label>
        <input
          value={name}
          onChange={handler(setName)}
          className={classes.input}
          type="text"
          name="name"
          id="name"
          required
        />
        <label className={classes.label} htmlFor="governmentId">
          Government Id
        </label>
        <input
          className={classes.input}
          value={governmentId}
          onChange={handler(setGovernmentId)}
          type="text"
          name="governmentId"
          id="governmentId"
          required
        />
        <label className={classes.label} htmlFor="age">
          Age
        </label>
        <input
          value={age}
          onChange={handler(setAge)}
          className={classes.input}
          type="number"
          name="age"
          id="age"
          required
        />
        <label className={classes.label} htmlFor="address">
          Address
        </label>
        <input
          value={address}
          onChange={handler(setAddress)}
          className={classes.input}
          type="text"
          name="address"
          id="address"
        />
        <label className={classes.label} htmlFor="username">
          Username
        </label>
        <input
          value={username}
          onChange={handler(setUsername)}
          className={classes.input}
          type="text"
          name="username"
          id="username"
        />
        <label className={classes.label} htmlFor="password">
          Password
        </label>
        <input
          value={password}
          onChange={handler(setPassword)}
          className={classes.input}
          type="password"
          name="password"
          id="password"
        />
        <div className={classes.buttons}>
          <button type="submit">Confirm</button>
          <button type="reset">Reset</button>
        </div>
      </form>
    </section>
  );
};

export default CreateUser;
