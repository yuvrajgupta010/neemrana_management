"use client";

import { useRouter } from "next/navigation";

import classes from "./error.module.css";

import Status from "@/components/UI/Status/Status";

const Error = ({ error, reset }) => {
  const history = useRouter();

  const goToHomeHandler = () => {
    history.push("/");
  };

  return (
    <section className={classes.section}>
      <Status
        error={true}
        message={"Page not Found!"}
        title={"Page not Found!"}
      />
      <button className={classes.button} onClick={goToHomeHandler}>
        Go to Home!
      </button>
    </section>
  );
};

export default Error;
