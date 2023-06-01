import { useState } from "react";
import classes from "./LoginForm.module.css";

const Form = (props) => {
  const { formDataHandler, formHeading } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const inputHandler = (setState) => (event) => {
    setState(event.target.value);
  };

  const onResetHandler = (event) => {
    event.preventDefault();
    setEmail("");
    setPassword("");
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();
    formDataHandler({ email: email, password: password });
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      onReset={onResetHandler}
      className={classes.form}
    >
      <h2 className={classes.secondary_heading}>
        <span>{formHeading}</span>
      </h2>
      <label className={classes.label} htmlFor="username">
        Username
      </label>
      <input
        type="text"
        name="username"
        id="username"
        value={email}
        onChange={inputHandler(setEmail)}
        className={classes.input}
        required
      />

      <label className={classes.label} htmlFor="password">
        Password
      </label>
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={inputHandler(setPassword)}
        className={classes.input}
        minLength={6}
        required
      />
      <div className={classes.buttons}>
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      </div>
    </form>
  );
};

export default Form;
