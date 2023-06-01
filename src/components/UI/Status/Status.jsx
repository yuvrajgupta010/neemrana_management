import Head from "next/head";

import classes from "./Status.module.css";

const Status = (props) => {
  const { message, title, error = false } = props;

  return (
    <>
      {title ? (
        <Head>
          <title>{title}</title>
        </Head>
      ) : (
        ""
      )}
      <div
        className={`${classes.status_box} ${
          error ? classes.error : classes.success
        }`}
      >
        <p>{message}</p>
      </div>
    </>
  );
};

export default Status;
