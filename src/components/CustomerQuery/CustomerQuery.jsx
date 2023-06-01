"use client";

import { useContext, useEffect, useState } from "react";

import classes from "./CustomerQuery.module.css";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";
import AuthCtx from "@/ctxStore/authCtx";
import StatusCtx from "@/ctxStore/statusCtx";
import Status from "../UI/Status/Status";

const CustomerQuery = () => {
  const { haveError, haveStatus, message, setStatusMessage } =
    useContext(StatusCtx);
  const { token, isLoggedIn } = useContext(AuthCtx);
  const [isLoading, setIsLoading] = useState(false);
  const [custQuery, setCustQuery] = useState([]);
  useEffect(() => {
    if (isLoggedIn) {
      setIsLoading(true);
      fetch("http://localhost:4000/management/customer-query", {
        method: "GET",
        headers: {
          Authorization: token,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((querys) => {
          setCustQuery(querys);
        })
        .catch((err) => {
          console.log(err.message);
        })
        .finally(() => setIsLoading(false));
    }
  }, [token, isLoggedIn]);

  const clearQueryHandler = (queryId) => {
    fetch("http://localhost:4000/management/customer-query", {
      method: "DELETE",
      body: JSON.stringify({ queryId: queryId }),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setStatusMessage(data.message, false);
        const newQueryState = custQuery.filter((query) => {
          return query.queryId !== queryId;
        });
        setCustQuery(newQueryState);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <section className={classes.section}>
      <h2 className={classes.secondary_heading}>
        <span>Customer Query</span>
      </h2>
      {haveStatus ? <Status error={haveError} message={message} /> : ""}

      {isLoading ? <LoadingSpinner /> : ""}
      {custQuery.length === 0 ? (
        <h2 className={classes.secondary_heading}>No customer query found !</h2>
      ) : (
        ""
      )}
      {custQuery.length >= 1
        ? custQuery.map((query) => {
            return (
              <div key={query.queryId} className={classes.card}>
                <h3 className={classes.tertiary_heading}>Name</h3>
                <p className={classes.p}>{query.customerName}</p>
                <h3 className={classes.tertiary_heading}>Contact No</h3>
                <p className={classes.p}>{query.contactNo}</p>
                <h3 className={classes.tertiary_heading}>Subject</h3>
                <p className={classes.p}>{query.subject}</p>
                <h3 className={classes.tertiary_heading}>Message</h3>
                <p className={classes.p}>{query.message}</p>
                <h3 className={classes.tertiary_heading}>Date of Query</h3>
                <p className={classes.p}>{query.dateOfQuery}</p>
                <div className={classes.buttons}>
                  <button
                    onClick={clearQueryHandler.bind(null, query.queryId)}
                    type="button"
                  >
                    Query Cleared
                  </button>
                </div>
              </div>
            );
          })
        : ""}
    </section>
  );
};

export default CustomerQuery;
